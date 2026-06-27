import { products as fallbackProducts } from "@/data/products";
import type { Product, ProductCatalog, SoldProductLogEntry } from "@/types";

export const PRODUCT_STORE = "aarna-products";
export const IMAGE_STORE = "aarna-images";
export const CATALOG_KEY = "index.json";
export const SOLD_LOG_KEY = "sold-log.json";

interface BlobStore {
  get: (key: string, options?: Record<string, unknown>) => Promise<unknown>;
  set: (key: string, value: unknown, options?: Record<string, unknown>) => Promise<unknown>;
  setJSON?: (key: string, value: unknown, options?: Record<string, unknown>) => Promise<unknown>;
  delete: (key: string) => Promise<unknown>;
}

const strongJsonOptions = { type: "json", consistency: "strong" };

async function loadBlobStore(name: string): Promise<BlobStore | null> {
  try {
    const importer = new Function("specifier", "return import(specifier)") as (
      specifier: string
    ) => Promise<{ getStore: (name: string) => BlobStore }>;
    const { getStore } = await importer("@netlify/blobs");
    return getStore(name);
  } catch {
    return null;
  }
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

export async function readStoredCatalog(): Promise<ProductCatalog | null> {
  const store = await loadBlobStore(PRODUCT_STORE);
  if (!store) return null;

  try {
    const value = await store.get(CATALOG_KEY, strongJsonOptions);
    return normalizeCatalog(value);
  } catch {
    return null;
  }
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
  const store = await loadBlobStore(PRODUCT_STORE);
  if (!store) {
    throw new Error("Netlify Blobs is not available in this runtime.");
  }

  const catalog: ProductCatalog = {
    products,
    updatedAt: new Date().toISOString(),
  };

  if (store.setJSON) {
    await store.setJSON(CATALOG_KEY, catalog, { consistency: "strong" });
  } else {
    await store.set(CATALOG_KEY, JSON.stringify(catalog), { consistency: "strong" });
  }

  return catalog;
}

export async function readSoldLog(): Promise<SoldProductLogEntry[]> {
  const store = await loadBlobStore(PRODUCT_STORE);
  if (!store) return [];

  try {
    const value = await store.get(SOLD_LOG_KEY, strongJsonOptions);
    return Array.isArray(value) ? (value as SoldProductLogEntry[]) : [];
  } catch {
    return [];
  }
}

export async function appendSoldLog(entries: SoldProductLogEntry[]): Promise<void> {
  if (entries.length === 0) return;
  const store = await loadBlobStore(PRODUCT_STORE);
  if (!store) return;

  const current = await readSoldLog();
  const next = [...entries, ...current].slice(0, 500);
  if (store.setJSON) {
    await store.setJSON(SOLD_LOG_KEY, next, { consistency: "strong" });
  } else {
    await store.set(SOLD_LOG_KEY, JSON.stringify(next), { consistency: "strong" });
  }
}

export async function getImageStore(): Promise<BlobStore | null> {
  return loadBlobStore(IMAGE_STORE);
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

export function makeProductImageKey(productId: string, index: number, mimeType: string): string {
  const extension = mimeType.includes("jpeg") || mimeType.includes("jpg") ? "jpg" : "webp";
  return "products/" + productId + "/" + (index + 1) + "." + extension;
}

export function productImageUrl(key: string): string {
  return "/api/product-image/" + key;
}

export function productImageKeyFromUrl(url: string): string | null {
  const marker = "/api/product-image/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export function isSafeProductImageKey(key: string): boolean {
  return /^products\/[a-z0-9-]+\/[1-5]\.(webp|jpg|jpeg)$/i.test(key);
}

export async function deleteProductImages(product: Product): Promise<void> {
  const store = await getImageStore();
  if (!store) return;

  const keys = product.images
    .map(productImageKeyFromUrl)
    .filter((key): key is string => Boolean(key && isSafeProductImageKey(key)));

  await Promise.all(keys.map((key) => store.delete(key).catch(() => undefined)));
}
