import type { YouTubeVideo } from "@/types";
import fallbackVideos from "@/data/youtube-videos.json";

const CHANNEL_HANDLE = "aarnacreations1921";
const CHANNEL_URL = "https://www.youtube.com/@aarnacreations1921";

function decodeXml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function matchFirst(value: string, pattern: string): string | undefined {
  return new RegExp(pattern).exec(value)?.[1];
}

function parseRssXml(xml: string): YouTubeVideo[] {
  const entries = xml.match(new RegExp("<entry>[\s\S]*?<\/entry>", "g")) ?? [];

  return entries
    .slice(0, 12)
    .map((entry) => {
      const id = matchFirst(entry, "<yt:videoId>(.*?)<\/yt:videoId>") ?? "";
      const title = decodeXml(matchFirst(entry, "<title>(.*?)<\/title>") ?? "AARNA CREATIONS Video");
      const publishedAt = matchFirst(entry, "<published>(.*?)<\/published>") ?? new Date().toISOString();
      const thumbnail =
        matchFirst(entry, "<media:thumbnail[^>]+url=\"([^\"]+)\"")?.replace(/&amp;/g, "&") ??
        (id ? "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg" : "/aarna-editorial-hero.png");

      return {
        id,
        title,
        url: id ? "https://www.youtube.com/watch?v=" + id : CHANNEL_URL,
        thumbnail,
        publishedAt,
      };
    })
    .filter((video) => video.id);
}

async function resolveChannelId(): Promise<string | null> {
  const envId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  if (envId) return envId;

  try {
    const response = await fetch(CHANNEL_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 86400 },
    });
    if (!response.ok) return null;
    const html = await response.text();
    const match =
      html.match(/"channelId":"(UC[^"]+)"/) ??
      html.match(/"externalId":"(UC[^"]+)"/) ??
      html.match(/"browseId":"(UC[^"]+)"/) ??
      html.match(/channel_id=(UC[^&"]+)/);

    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

async function fetchRssByUrl(url: string): Promise<YouTubeVideo[]> {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) return [];
  const xml = await response.text();
  return parseRssXml(xml);
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const channelId = await resolveChannelId();
    const rssUrls = [
      channelId ? "https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId : "",
      "https://www.youtube.com/feeds/videos.xml?user=" + CHANNEL_HANDLE,
    ].filter(Boolean);

    for (const url of rssUrls) {
      const videos = await fetchRssByUrl(url);
      if (videos.length > 0) return videos;
    }

    return fallbackVideos as YouTubeVideo[];
  } catch {
    return fallbackVideos as YouTubeVideo[];
  }
}
