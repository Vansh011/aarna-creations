"use client";

import { useState } from "react";
import Image from "next/image";
import { Ruler, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product, Size } from "@/types";

interface ProductOptionsProps {
  product: Product;
}

export function ProductOptions({ product }: ProductOptionsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [size, setSize] = useState<Size | "">(product.sizes[0] ?? "");
  const [customization, setCustomization] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const handleAddToCart = (): boolean => {
    if (!size) {
      setError("Please select a size");
      return false;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.discountedPrice,
      size,
      color: product.color,
      customization,
    });

    setAdded(true);
    setError("");
    setTimeout(() => setAdded(false), 1800);
    return true;
  };

  return (
    <>
      <div className="detail-copy">
        <span className="eyebrow">New arrival - limited piece</span>
        <h1>{product.name}</h1>
        <div className="price text-[1.35rem]">
          {formatPrice(product.discountedPrice)}
          {product.mainPrice > product.discountedPrice && <del>{formatPrice(product.mainPrice)}</del>}
        </div>
        <p className="meta text-base leading-7">{product.description}</p>

        <div className="chips">
          <span className="chip">Sizes: {product.sizes.join(", ")}</span>
          <span className="chip">Color: {product.color}</span>
          <span className="chip">Custom fitting help</span>
        </div>

        <div className="detail-panel">
          <h3>Fabric and feel</h3>
          <p>{product.fabricMaterial}. The piece is presented with clear fabric, size, color, and price details before checkout.</p>
        </div>

        <div className="detail-panel">
          <h3>Why customers will understand it faster</h3>
          <ul>
            <li>Price, fabric, sizes, and color are visible before checkout.</li>
            <li>Trust text explains that availability and fitting are confirmed personally.</li>
            <li>Cart and checkout keep the final WhatsApp order clean and complete.</li>
          </ul>
        </div>

        <div className="detail-panel">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="mb-0">Choose size</h3>
            <button
              type="button"
              onClick={() => setSizeChartOpen(true)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#6f1d2f]"
            >
              <Ruler className="h-4 w-4" />
              Size chart
            </button>
          </div>
          <div className="chips">
            {product.sizes.map((availableSize) => (
              <button
                key={availableSize}
                type="button"
                onClick={() => { setSize(availableSize); setError(""); }}
                className={size === availableSize ? "chip active" : "chip"}
              >
                {availableSize}
              </button>
            ))}
          </div>
          {error && <p className="mt-3 text-sm font-bold text-red-600">{error}</p>}
        </div>

        <div className="detail-panel">
          <h3>Fit notes</h3>
          <Textarea
            placeholder="Example: height 5'4, need relaxed fit, sleeve length adjustment"
            value={customization}
            onChange={(event) => setCustomization(event.target.value)}
            className="mt-2 border-[var(--line)] bg-[#fffaf1]"
          />
        </div>

        <div className="hero-actions">
          <button type="button" className="btn-proto btn-primary-proto" onClick={handleAddToCart}>
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="sticky-mobile-cta sticky-mobile-cta-single">
        <button type="button" className="btn-proto btn-primary-proto" onClick={handleAddToCart}>
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>

      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl border border-[var(--line)] bg-[#fffaf1] p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setSizeChartOpen(false)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center border border-[var(--line)] bg-white text-[#4b1020]"
              aria-label="Close size chart"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="eyebrow text-[#4b1020]">Fit guide</span>
            <h2 className="mt-3 font-serif text-3xl leading-none text-[#4b1020]">Standard Size Chart</h2>
            <div className="relative mt-5 aspect-[4/3] overflow-hidden border border-[var(--line)] bg-white">
              <Image src="/size-chart.svg" alt="Standard ladies ethnic wear size chart" fill className="object-contain p-3" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
