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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav className="mb-8 flex items-center gap-1 text-sm text-maroon/60">
          <Link href="/" className="hover:text-maroon">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-maroon">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-maroon">{product.name}</span>
        </nav>

        <div className="mb-20 grid gap-10 md:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductOptions product={product} />
        </div>

        {related.length > 0 && (
          <section>
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gold">Curated pairings</p>
                <h2 className="mt-2 font-serif text-2xl text-maroon">You May Also Like</h2>
              </div>
              <Link href="/shop" className="text-sm font-medium text-maroon hover:text-gold">View all</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
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
