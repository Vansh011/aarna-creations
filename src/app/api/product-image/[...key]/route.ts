export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response("Cloudinary images are served directly.", { status: 404 });
}
