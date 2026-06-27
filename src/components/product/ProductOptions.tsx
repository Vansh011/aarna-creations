"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Info, Ruler, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product, Size } from "@/types";

interface ProductOptionsProps {
  product: Product;
}

export function ProductOptions({ product }: ProductOptionsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [size, setSize] = useState<Size | "">("");
  const [customization, setCustomization] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const discount = product.mainPrice > product.discountedPrice
    ? Math.round(((product.mainPrice - product.discountedPrice) / product.mainPrice) * 100)
    : 0;

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
    setTimeout(() => setAdded(false), 2000);
    return true;
  };

  return (
    <div className="space-y-7">
      <div>
        <p className="mb-2 text-sm uppercase tracking-[0.26em] text-gold">
          {product.subcategory || product.category}
        </p>
        <h1 className="mb-4 font-serif text-3xl leading-tight text-maroon md:text-5xl">
          {product.name}
        </h1>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="text-3xl font-semibold text-maroon">{formatPrice(product.discountedPrice)}</span>
          {product.mainPrice > product.discountedPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.mainPrice)}</span>
              <span className="rounded-full bg-emerald/10 px-3 py-1 text-sm font-semibold text-emerald">{discount}% off</span>
            </>
          )}
        </div>
        <p className="max-w-xl leading-relaxed text-maroon/72">{product.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-gold/20 bg-white p-4 shadow-sm">
          <span className="text-xs uppercase tracking-wider text-maroon/55">Color</span>
          <p className="mt-1 font-medium text-maroon">{product.color}</p>
          <p className="mt-2 flex items-start gap-2 text-xs text-maroon/55">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            This piece is available in this single colorway.
          </p>
        </div>
        <div className="rounded-lg border border-gold/20 bg-white p-4 shadow-sm">
          <span className="text-xs uppercase tracking-wider text-maroon/55">Fabric / Material</span>
          <p className="mt-1 font-medium text-maroon">{product.fabricMaterial}</p>
          <p className="mt-2 text-xs text-maroon/55">Category: {product.category}</p>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <Label>Select Size *</Label>
          <button
            type="button"
            onClick={() => setSizeChartOpen(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-maroon hover:text-gold"
          >
            <Ruler className="h-4 w-4" />
            Size chart
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((availableSize) => (
            <button
              key={availableSize}
              onClick={() => { setSize(availableSize); setError(""); }}
              className={[
                "min-w-[48px] rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                size === availableSize
                  ? "border-maroon bg-maroon text-white"
                  : "border-maroon/30 text-maroon hover:border-maroon",
              ].join(" ")}
            >
              {availableSize}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="customization" className="mb-2 block">Customization Notes (optional)</Label>
        <Textarea
          id="customization"
          placeholder="e.g. sleeve length, minor alteration request, delivery note"
          value={customization}
          onChange={(event) => setCustomization(event.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="default" size="lg" className="flex-1" onClick={handleAddToCart}>
          {added ? (
            <>
              <Check className="h-5 w-5" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" /> Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="gold"
          size="lg"
          className="flex-1"
          onClick={() => {
            if (handleAddToCart()) router.push("/cart");
          }}
        >
          Buy Now
        </Button>
      </div>

      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-lg bg-ivory p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setSizeChartOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-white p-2 text-maroon shadow"
              aria-label="Close size chart"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="pr-10">
              <p className="text-sm uppercase tracking-[0.25em] text-gold">Fit guide</p>
              <h2 className="mt-1 font-serif text-2xl text-maroon">Standard Size Chart</h2>
            </div>
            <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-lg border border-gold/20 bg-white">
              <Image src="/size-chart.svg" alt="Standard ladies ethnic wear size chart" fill className="object-contain p-3" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
