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
      className="group block overflow-hidden rounded-md border border-[#e1d0b7] bg-white shadow-[0_10px_24px_rgba(64,23,18,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(64,23,18,0.11)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {discount > 0 && (
            <span className="bg-[#711023] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white shadow">
              {discount}% off
            </span>
          )}
          <span className="bg-[#d8ab35] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#3b1b08] shadow">
            Unique
          </span>
        </div>
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-2 min-h-[2.45rem] text-sm font-bold leading-snug text-[#1c1716] transition-colors group-hover:text-[#7a1026]">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-[#7b716d]">{product.subcategory || product.category}</p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#7a1026] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="mt-2 line-clamp-1 text-xs text-[#7b716d]">{product.color}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-extrabold text-[#6d1022]">{formatPrice(product.discountedPrice)}</span>
          {product.mainPrice > product.discountedPrice && (
            <span className="text-xs text-ink/45 line-through">{formatPrice(product.mainPrice)}</span>
          )}
        </div>
        <div className="mt-3 border-t border-[#eadcc8] pt-3 text-[11px] text-ink/58">
          <span className="line-clamp-1">Sizes: {visibleSizes}{extraSizes}</span>
          <span className="mt-3 flex h-8 w-full items-center justify-center rounded-[2px] bg-[#7a1026] text-[10px] font-extrabold uppercase tracking-[0.14em] text-white transition-colors group-hover:bg-[#5b0a15]">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
