import { NextRequest, NextResponse } from "next/server";
import { categories, sizes } from "@/data/products";
import type { Category, Product, Size, SoldProductLogEntry } from "@/types";
import {
  appendSoldLog,
  deleteProductImagePublicIds,
  deleteProductImages,
  getLiveProducts,
  isCloudinaryConfigured,
  uniqueSlug,
  uploadProductImage,
  writeStoredProducts,
} from "@/lib/product-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const categoryValues = new Set<string>(categories);
const sizeValues = new Set<string>(sizes);

function ownerPin(): string {
  return process.env.OWNER_PIN ?? "xxxx";
}

function isAuthorized(pin: FormDataEntryValue | string | null): boolean {
  return typeof pin === "string" && pin === ownerPin();
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(formData: FormData, key: string): number {
  const value = Number(getString(formData, key));
  return Number.isFinite(value) ? value : 0;
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function jsonUnexpectedError(error: unknown) {
  return jsonError(error instanceof Error ? error.message : "Unexpected server error", 500);
}

function isFile(value: FormDataEntryValue): value is File {
  return typeof value === "object" && "arrayBuffer" in value && "type" in value;
}

export async function GET(request: NextRequest) {
  try {
    const pin = request.headers.get("x-owner-pin") ?? request.nextUrl.searchParams.get("pin");
    if (!isAuthorized(pin)) return jsonError("Invalid owner PIN", 401);

    const products = await getLiveProducts({ fallback: false });
    return NextResponse.json({ products });
  } catch (error) {
    return jsonUnexpectedError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
  const formData = await request.formData();
  if (!isAuthorized(formData.get("pin"))) return jsonError("Invalid owner PIN", 401);

  const name = getString(formData, "name");
  const color = getString(formData, "color");
  const fabricMaterial = getString(formData, "fabricMaterial");
  const category = getString(formData, "category") as Category;
  const subcategory = getString(formData, "subcategory");
  const description = getString(formData, "description");
  const discountedPrice = getNumber(formData, "discountedPrice");
  const mainPrice = getNumber(formData, "mainPrice");
  const selectedSizes = formData
    .getAll("sizes")
    .map((value) => String(value))
    .filter((value): value is Size => sizeValues.has(value));
  const imageFiles = formData.getAll("images").filter(isFile);

  if (!name) return jsonError("Product name is required");
  if (imageFiles.length < 1 || imageFiles.length > 5) {
    return jsonError("Upload between 1 and 5 photos");
  }
  if (discountedPrice <= 0 || mainPrice <= 0) return jsonError("Valid prices are required");
  if (mainPrice < discountedPrice) return jsonError("Main price should be greater than or equal to discounted price");
  if (!color) return jsonError("Color is required");
  if (!fabricMaterial) return jsonError("Fabric / material is required");
  if (!categoryValues.has(category)) return jsonError("Valid category is required");
  if (selectedSizes.length === 0) return jsonError("At least one size is required");
  if (!description) return jsonError("Description is required");

  if (!isCloudinaryConfigured()) {
    return jsonError("Cloudinary is not configured in this runtime", 503);
  }

  const existingProducts = await getLiveProducts({ fallback: false });
  const id = crypto.randomUUID();
  const slug = uniqueSlug(name, existingProducts);
  const uploadedPublicIds: string[] = [];

  try {
    const imageUrls: string[] = [];
    const imagePublicIds: string[] = [];
    for (const [index, file] of imageFiles.entries()) {
      if (!file.type.startsWith("image/")) return jsonError("Only image files can be uploaded");
      if (file.size > 2_500_000) return jsonError("Each compressed photo must be under 2.5 MB");

      const uploaded = await uploadProductImage(id, index, file);
      uploadedPublicIds.push(uploaded.publicId);
      imagePublicIds.push(uploaded.publicId);
      imageUrls.push(uploaded.secureUrl);
    }

    const now = new Date().toISOString();
    const product: Product = {
      id,
      slug,
      name,
      discountedPrice,
      mainPrice,
      images: imageUrls,
      imagePublicIds,
      category,
      subcategory: subcategory || undefined,
      sizes: selectedSizes,
      color,
      fabricMaterial,
      description,
      createdAt: now,
      updatedAt: now,
    };

    await writeStoredProducts([product, ...existingProducts]);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    await deleteProductImagePublicIds(uploadedPublicIds).catch(() => undefined);
    return jsonError(error instanceof Error ? error.message : "Unable to upload product", 500);
  }
  } catch (error) {
    return jsonUnexpectedError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
  const body = await request.json().catch(() => null) as { pin?: string; ids?: string[] } | null;
  if (!body || !isAuthorized(body.pin ?? null)) return jsonError("Invalid owner PIN", 401);
  if (!Array.isArray(body.ids) || body.ids.length === 0) return jsonError("Select at least one item");

  const selectedIds = new Set(body.ids);
  const existingProducts = await getLiveProducts({ fallback: false });
  const removedProducts = existingProducts.filter((product) => selectedIds.has(product.id));
  if (removedProducts.length === 0) return jsonError("No matching products found", 404);

  await Promise.all(removedProducts.map(deleteProductImages));
  const remainingProducts = existingProducts.filter((product) => !selectedIds.has(product.id));
  await writeStoredProducts(remainingProducts);

  const soldAt = new Date().toISOString();
  const soldEntries: SoldProductLogEntry[] = removedProducts.map((product) => ({
    id: product.id,
    name: product.name,
    discountedPrice: product.discountedPrice,
    mainPrice: product.mainPrice,
    category: product.category,
    soldAt,
  }));
  await appendSoldLog(soldEntries);

  return NextResponse.json({ removed: removedProducts.length, products: remainingProducts });
  } catch (error) {
    return jsonUnexpectedError(error);
  }
}
