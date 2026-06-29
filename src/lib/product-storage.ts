import crypto from "node:crypto";
import { products as fallbackProducts } from "@/data/products";
import type { Product, ProductCatalog, SoldProductLogEntry } from "@/types";

export const CLOUDINARY_DEFAULT_FOLDER = "aarna-creations";
export const CATALOG_PUBLIC_ID = "catalog/products.json";
export const SOLD_LOG_PUBLIC_ID = "catalog/sold-log.json";

const JSON_CONTENT_TYPE = "application/json";

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
}

interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  version: number;
  resource_type: string;
}

interface UploadedProductImage {
  publicId: string;
  secureUrl: string;
}

function cloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_FOLDER || CLOUDINARY_DEFAULT_FOLDER;

  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret, folder };
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudinaryConfig());
}

function requireCloudinaryConfig(): CloudinaryConfig {
  const config = cloudinaryConfig();
  if (!config) {
    throw new Error("Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Render.");
  }
  return config;
}

function cloudinaryTimestamp(): string {
  return Math.floor(Date.now() / 1000).toString();
}

function signCloudinaryParams(params: Record<string, string>, apiSecret: string): string {
  const serialized = Object.entries(params)
    .filter(([, value]) => value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => key + "=" + value)
    .join("&");

  return crypto.createHash("sha1").update(serialized + apiSecret).digest("hex");
}

function scopedPublicId(config: CloudinaryConfig, publicId: string): string {
  return [config.folder, publicId]
    .filter(Boolean)
    .join("/")
    .replace(/\/+/g, "/");
}

function cloudinaryDeliveryUrl(config: CloudinaryConfig, resourceType: "raw" | "image", publicId: string): string {
  return "https://res.cloudinary.com/" + config.cloudName + "/" + resourceType + "/upload/" + scopedPublicId(config, publicId);
}

async function uploadToCloudinary(
  resourceType: "raw" | "image",
  file: Blob,
  filename: string,
  publicId: string,
): Promise<CloudinaryUploadResponse> {
  const config = requireCloudinaryConfig();
  const timestamp = cloudinaryTimestamp();
  const params: Record<string, string> = {
    invalidate: "true",
    overwrite: "true",
    public_id: scopedPublicId(config, publicId),
    timestamp,
  };
  const signature = signCloudinaryParams(params, config.apiSecret);
  const formData = new FormData();

  formData.append("file", file, filename);
  formData.append("api_key", config.apiKey);
  formData.append("signature", signature);
  Object.entries(params).forEach(([key, value]) => formData.append(key, value));
  const response = await fetch("https://api.cloudinary.com/v1_1/" + config.cloudName + "/" + resourceType + "/upload", {
    method: "POST",
    body: formData,
  });

  const body = await response.json().catch(() => null) as Partial<CloudinaryUploadResponse> & { error?: { message?: string } } | null;
  if (!response.ok || !body?.secure_url || !body.public_id) {
    throw new Error(body?.error?.message || "Cloudinary upload failed");
  }

  return body as CloudinaryUploadResponse;
}

async function destroyCloudinaryResource(resourceType: "raw" | "image", publicId: string): Promise<void> {
  const config = requireCloudinaryConfig();
  const timestamp = cloudinaryTimestamp();
  const params: Record<string, string> = {
    invalidate: "true",
    public_id: publicId,
    timestamp,
  };
  const signature = signCloudinaryParams(params, config.apiSecret);
  const formData = new FormData();

  formData.append("api_key", config.apiKey);
  formData.append("signature", signature);
  Object.entries(params).forEach(([key, value]) => formData.append(key, value));

  await fetch("https://api.cloudinary.com/v1_1/" + config.cloudName + "/" + resourceType + "/destroy", {
    method: "POST",
    body: formData,
  }).catch(() => undefined);
}

function normalizeCatalog(value: unknown): ProductCatalog | null {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    return { products: value as Product[], updatedAt: new Date().toISOString() };
  }

  const catalog = value as Partial<ProductCatalog>;
  if (!Array.isArray(catalog.products)) return null;
  return {
    products: catalog.products,
    updatedAt: catalog.updatedAt ?? new Date().toISOString(),
  };
}

async function readRawJson<T>(publicId: string): Promise<T | null> {
  const config = cloudinaryConfig();
  if (!config) return null;

  try {
    const response = await fetch(cloudinaryDeliveryUrl(config, "raw", publicId) + "?t=" + Date.now(), {
      cache: "no-store",
      headers: { Accept: JSON_CONTENT_TYPE },
    });
    if (!response.ok) return null;
    return await response.json() as T;
  } catch {
    return null;
  }
}

async function writeRawJson(publicId: string, value: unknown): Promise<void> {
  const json = JSON.stringify(value, null, 2);
  const file = new Blob([json], { type: JSON_CONTENT_TYPE });
  const filename = publicId.split("/").pop() || "catalog.json";
  await uploadToCloudinary("raw", file, filename, publicId);
}

export async function readStoredCatalog(): Promise<ProductCatalog | null> {
  const value = await readRawJson<unknown>(CATALOG_PUBLIC_ID);
  return normalizeCatalog(value);
}

export async function getLiveProducts(options: { fallback?: boolean } = {}): Promise<Product[]> {
  const { fallback = true } = options;
  const catalog = await readStoredCatalog();
  if (catalog) return catalog.products;
  return fallback ? fallbackProducts : [];
}

export async function getLiveProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getLiveProducts();
  return products.find((product) => product.slug === slug);
}

export async function writeStoredProducts(products: Product[]): Promise<ProductCatalog> {
  const catalog: ProductCatalog = {
    products,
    updatedAt: new Date().toISOString(),
  };

  await writeRawJson(CATALOG_PUBLIC_ID, catalog);
  return catalog;
}

export async function readSoldLog(): Promise<SoldProductLogEntry[]> {
  const value = await readRawJson<unknown>(SOLD_LOG_PUBLIC_ID);
  return Array.isArray(value) ? value as SoldProductLogEntry[] : [];
}

export async function appendSoldLog(entries: SoldProductLogEntry[]): Promise<void> {
  if (entries.length === 0) return;
  const current = await readSoldLog();
  const next = [...entries, ...current].slice(0, 500);
  await writeRawJson(SOLD_LOG_PUBLIC_ID, next);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function uniqueSlug(name: string, products: Product[]): string {
  const base = slugify(name) || "product";
  const used = new Set(products.map((product) => product.slug));
  if (!used.has(base)) return base;

  let index = 2;
  while (used.has(base + "-" + index)) index += 1;
  return base + "-" + index;
}

export async function uploadProductImage(productId: string, index: number, file: File): Promise<UploadedProductImage> {
  const extension = file.type.includes("jpeg") || file.type.includes("jpg") ? "jpg" : "webp";
  const publicId = "products/" + productId + "/" + (index + 1);
  const blob = new Blob([await file.arrayBuffer()], { type: file.type || "image/webp" });
  const uploaded = await uploadToCloudinary("image", blob, (index + 1) + "." + extension, publicId);

  return {
    publicId: uploaded.public_id,
    secureUrl: uploaded.secure_url,
  };
}

function publicIdFromCloudinaryUrl(url: string): string | null {
  const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match?.[1]) return null;
  return decodeURIComponent(match[1].replace(/\.[a-z0-9]+(?:\?.*)?$/i, ""));
}

export async function deleteProductImagePublicIds(publicIds: string[]): Promise<void> {
  const configured = cloudinaryConfig();
  if (!configured) return;
  await Promise.all(publicIds.map((publicId) => destroyCloudinaryResource("image", publicId)));
}

export async function deleteProductImages(product: Product): Promise<void> {
  const publicIds = product.imagePublicIds?.length
    ? product.imagePublicIds
    : product.images.map(publicIdFromCloudinaryUrl).filter((value): value is string => Boolean(value));

  await deleteProductImagePublicIds(publicIds);
}
