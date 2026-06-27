import { NextRequest } from "next/server";
import { getImageStore, isSafeProductImageKey } from "@/lib/product-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ImageRouteProps {
  params: Promise<{ key: string[] }>;
}

function contentTypeForKey(key: string): string {
  if (key.endsWith(".jpg") || key.endsWith(".jpeg")) return "image/jpeg";
  return "image/webp";
}

export async function GET(_request: NextRequest, { params }: ImageRouteProps) {
  const { key: keyParts } = await params;
  const key = keyParts.map(decodeURIComponent).join("/");

  if (!isSafeProductImageKey(key)) {
    return new Response("Not found", { status: 404 });
  }

  const store = await getImageStore();
  if (!store) return new Response("Not found", { status: 404 });

  const image = await store.get(key, { type: "arrayBuffer", consistency: "strong" });
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(image as BodyInit, {
    headers: {
      "Content-Type": contentTypeForKey(key),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
