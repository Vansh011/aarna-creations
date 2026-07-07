import { Hero } from "@/components/home/Hero";
import { BoutiqueService } from "@/components/home/BoutiqueService";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BrandStory } from "@/components/home/BrandStory";
import { getLiveProducts } from "@/lib/product-storage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getLiveProducts();
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <>
      <Hero />
      <BoutiqueService />
      <FeaturedCollections />
      <NewArrivals products={newArrivals} />
      <BrandStory />
    </>
  );
}
