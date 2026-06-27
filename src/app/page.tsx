import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BrandStory } from "@/components/home/BrandStory";
import { YouTubeCarousel } from "@/components/home/YouTubeCarousel";
import { getLiveProducts } from "@/lib/product-storage";
import { fetchYouTubeVideos } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, videos] = await Promise.all([
    getLiveProducts(),
    fetchYouTubeVideos(),
  ]);
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

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
