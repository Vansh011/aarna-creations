import { notFound } from "next/navigation";
import Link from "next/link";
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
    <main className="section">
      <div className="mb-5 text-sm font-bold text-[#735f58]">
        <Link href="/" className="hover:text-[#6f1d2f]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-[#6f1d2f]">Shop</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail">
        <ProductGallery images={product.images} name={product.name} />
        <ProductOptions product={product} />
      </div>

      {related.length > 0 && (
        <section className="pt-12">
          <div className="section-head">
            <span className="eyebrow">More from this edit</span>
            <h2>You may also like.</h2>
            <p>Similar pieces from the same boutique category.</p>
          </div>
          <div className="product-grid-proto">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
