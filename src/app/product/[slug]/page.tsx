import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getLiveProductBySlug, getLiveProducts } from "@/lib/product-storage";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductOptions } from "@/components/product/ProductOptions";
import { ProductCard } from "@/components/shop/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getLiveProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name + " | AARNA CREATIONS",
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getLiveProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-ivory">
      <section className="border-b border-gold/20 bg-[#f1dfca] px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-1 text-xs text-maroon/60 sm:text-sm">
            <Link href="/" className="hover:text-maroon">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shop" className="hover:text-maroon">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="line-clamp-1 text-maroon">{product.name}</span>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="mb-12 grid gap-7 md:mb-20 md:grid-cols-2 md:gap-10 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductOptions product={product} />
        </div>

        {related.length > 0 && (
          <section className="border-t border-gold/20 pt-10 sm:pt-14">
            <div className="mb-6 flex flex-col items-start gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="ornate-title text-[#6d1022]">Curated pairings</p>
                <h2 className="mt-3 font-serif text-[1.65rem] text-[#7a1026] sm:mt-5 sm:text-[2.2rem]">You May Also Like</h2>
              </div>
              <Link href="/shop" className="text-sm font-bold uppercase tracking-[0.2em] text-maroon hover:text-gold">View all</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-7">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
