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
    <section className="relative overflow-hidden bg-[#fbf7ef] px-3 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 text-center sm:mb-8">
          <p className="ornate-title text-[#7a1026]">Freshly added</p>
          <h2 className="section-subline mt-3">
            Limited pieces, gone fast
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-7 text-center sm:mt-8">
          <Link href="/shop?sort=newest" className="maroon-cta">
            View arrivals <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
