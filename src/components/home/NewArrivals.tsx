import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-maroon mb-3">
            New Arrivals
          </h2>
          <div className="gold-divider w-24 mb-4" />
          <p className="text-maroon/70">Fresh styles just added to our collection</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/shop?sort=newest">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
