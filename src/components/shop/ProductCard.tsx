import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.mainPrice > product.discountedPrice
    ? Math.round(((product.mainPrice - product.discountedPrice) / product.mainPrice) * 100)
    : 0;
  const visibleSizes = product.sizes.slice(0, 4).join(", ");
  const extraSizes = product.sizes.length > 4 ? " +" + (product.sizes.length - 4) : "";

  return (
    <Link
      href={"/product/" + product.slug}
      className="group block overflow-hidden rounded-lg border border-gold/15 bg-white shadow-[0_12px_35px_rgba(90,21,41,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(90,21,41,0.14)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-maroon/80 to-transparent opacity-85" />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-maroon-dark shadow">
            {discount}% OFF
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-maroon shadow transition-colors group-hover:bg-gold">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wider text-maroon/55">{product.subcategory || product.category}</p>
          <p className="line-clamp-1 text-xs text-maroon/50">{product.color}</p>
        </div>
        <h3 className="line-clamp-1 font-serif text-base text-maroon transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-semibold text-maroon">{formatPrice(product.discountedPrice)}</span>
          {product.mainPrice > product.discountedPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.mainPrice)}</span>
          )}
        </div>
        <p className="line-clamp-1 text-xs text-maroon/55">Sizes: {visibleSizes}{extraSizes}</p>
      </div>
    </Link>
  );
}
