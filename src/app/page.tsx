import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BrandStory } from "@/components/home/BrandStory";
import { YouTubeCarousel } from "@/components/home/YouTubeCarousel";
import { getNewArrivals } from "@/data/products";
import { fetchYouTubeVideos } from "@/lib/youtube";

export default async function HomePage() {
  const [newArrivals, videos] = await Promise.all([
    Promise.resolve(getNewArrivals()),
    fetchYouTubeVideos(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <NewArrivals products={newArrivals} />
      <BrandStory />
      <YouTubeCarousel videos={videos} />
    </>
  );
}
