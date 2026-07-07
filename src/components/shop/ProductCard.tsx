import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.mainPrice > product.discountedPrice
    ? Math.round(((product.mainPrice - product.discountedPrice) / product.mainPrice) * 100)
    : 0;
  const visibleSizes = product.sizes.slice(0, 3).join("-");
  const sizeText = product.sizes.length > 3 ? visibleSizes + "+" : visibleSizes;

  return (
    <Link
      href={"/product/" + product.slug}
      className="product-card-proto group"
      data-category={product.category}
      data-name={product.name}
      data-price={product.discountedPrice}
    >
      <div className="product-media">
        <span className="badge">{discount > 0 ? discount + "% off" : "Limited"}</span>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 720px) 50vw, (max-width: 1020px) 33vw, 25vw"
        />
      </div>
      <div className="product-info">
        <h3 className="line-clamp-2">{product.name}</h3>
        <span className="meta line-clamp-1">
          {product.fabricMaterial} · {product.color}
        </span>
        <div className="price">
          {formatPrice(product.discountedPrice)}
          {product.mainPrice > product.discountedPrice && <del>{formatPrice(product.mainPrice)}</del>}
        </div>
        <div className="chips">
          <span className="chip">{sizeText || "Size help"}</span>
          <span className="chip">{product.subcategory || product.category}</span>
        </div>
      </div>
    </Link>
  );
}
