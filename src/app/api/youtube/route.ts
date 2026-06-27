import { fetchYouTubeVideos } from "@/lib/youtube";
import { NextResponse } from "next/server";

export async function GET() {
  const videos = await fetchYouTubeVideos();
  return NextResponse.json(videos, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
