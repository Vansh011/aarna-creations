import type { YouTubeVideo } from "@/types";
import fallbackVideos from "@/data/youtube-videos.json";

const CHANNEL_HANDLE = "aarnacreations1921";

function parseRssXml(xml: string): YouTubeVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries.slice(0, 12).map((entry) => {
    const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/);

    const id = idMatch?.[1] ?? "";
    const title = titleMatch?.[1]?.replace(/&amp;/g, "&").replace(/&quot;/g, '"') ?? "Aarna Creations Video";

    return {
      id,
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      publishedAt: publishedMatch?.[1] ?? new Date().toISOString(),
    };
  }).filter((video) => video.id);
}

async function resolveChannelId(): Promise<string | null> {
  const envId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  if (envId) return envId;

  try {
    const response = await fetch(
      `https://www.youtube.com/@${CHANNEL_HANDLE}`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 86400 },
      }
    );
    const html = await response.text();
    const match =
      html.match(/"channelId":"(UC[^"]+)"/) ??
      html.match(/"externalId":"(UC[^"]+)"/) ??
      html.match(/channel_id=(UC[^&"]+)/);

    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const channelId = await resolveChannelId();
    if (!channelId) return fallbackVideos as YouTubeVideo[];

    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return fallbackVideos as YouTubeVideo[];

    const xml = await response.text();
    const videos = parseRssXml(xml);

    return videos.length > 0 ? videos : (fallbackVideos as YouTubeVideo[]);
  } catch {
    return fallbackVideos as YouTubeVideo[];
  }
}
