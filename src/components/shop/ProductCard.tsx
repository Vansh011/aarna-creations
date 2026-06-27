import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gold/10"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-emerald text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-maroon text-white text-xs font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4 space-y-1">
        <p className="text-xs text-maroon/60 uppercase tracking-wider">{product.category}</p>
        <h3 className="font-serif text-maroon text-base group-hover:text-gold transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-maroon">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
