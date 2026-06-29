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
      className="group block overflow-hidden rounded-[3px] border border-[#e1d0b7] bg-white shadow-[0_8px_20px_rgba(64,23,18,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(64,23,18,0.11)] active:scale-[0.99] sm:rounded-md sm:shadow-[0_10px_24px_rgba(64,23,18,0.07)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute left-1.5 top-1.5 flex flex-wrap gap-1 sm:left-2 sm:top-2 sm:gap-1.5">
          {discount > 0 && (
            <span className="bg-[#711023] px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.1em] text-white shadow sm:px-2.5 sm:py-1 sm:text-[9px] sm:tracking-[0.12em]">
              {discount}% off
            </span>
          )}
          <span className="bg-[#d8ab35] px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#3b1b08] shadow sm:px-2.5 sm:py-1 sm:text-[9px] sm:tracking-[0.12em]">
            Unique
          </span>
        </div>
      </div>

      <div className="p-2.5 sm:p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-2 min-h-[2.15rem] text-[12px] font-bold leading-snug text-[#1c1716] transition-colors group-hover:text-[#7a1026] sm:min-h-[2.45rem] sm:text-sm">
              {product.name}
            </h3>
            <p className="mt-1 text-[11px] text-[#7b716d] sm:text-xs">{product.subcategory || product.category}</p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#7a1026] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="mt-1.5 line-clamp-1 text-[11px] text-[#7b716d] sm:mt-2 sm:text-xs">{product.color}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
          <span className="text-[13px] font-extrabold text-[#6d1022] sm:text-sm">{formatPrice(product.discountedPrice)}</span>
          {product.mainPrice > product.discountedPrice && (
            <span className="text-[11px] text-ink/45 line-through sm:text-xs">{formatPrice(product.mainPrice)}</span>
          )}
        </div>
        <div className="mt-2 border-t border-[#eadcc8] pt-2 text-[10px] text-ink/58 sm:mt-3 sm:pt-3 sm:text-[11px]">
          <span className="line-clamp-1">Sizes: {visibleSizes}{extraSizes}</span>
          <span className="mt-2 flex h-8 w-full items-center justify-center rounded-[2px] bg-[#7a1026] text-[9px] font-extrabold uppercase tracking-[0.12em] text-white transition-colors group-hover:bg-[#5b0a15] sm:mt-3 sm:text-[10px] sm:tracking-[0.14em]">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
