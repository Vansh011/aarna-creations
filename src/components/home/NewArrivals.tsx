import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  if (products.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#fbf7ef] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="ornate-title text-[#7a1026]">Freshly added</p>
          <h2 className="section-subline mt-3">
            Limited pieces, gone fast
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/shop?sort=newest" className="maroon-cta">
            View arrivals <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
