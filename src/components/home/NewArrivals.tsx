import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  if (products.length === 0) return null;

  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Just arrived</span>
        <h2>Fresh pieces, handpicked this week.</h2>
        <p>Swipe through the latest pieces, then open the full collection when something feels like you.</p>
      </div>
      <p className="arrival-scroll-hint">Swipe to see more ✨</p>
      <div className="product-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-5 text-center">
        <Link className="btn-proto btn-primary-proto" href="/shop">
          View Full Collection
        </Link>
      </div>
    </section>
  );
}
