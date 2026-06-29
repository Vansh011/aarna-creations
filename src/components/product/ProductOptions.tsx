"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Info, Ruler, ShoppingBag, Sparkles, X } from "lucide-react";
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
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.26em] text-gold">
          <Sparkles className="h-4 w-4" /> {product.subcategory || product.category}
        </p>
        <h1 className="mb-5 font-serif text-[2.35rem] leading-tight text-[#7a1026] md:text-[3.25rem]">
          {product.name}
        </h1>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="text-2xl font-bold text-maroon md:text-3xl">{formatPrice(product.discountedPrice)}</span>
          {product.mainPrice > product.discountedPrice && (
            <>
              <span className="text-lg text-ink/36 line-through">{formatPrice(product.mainPrice)}</span>
              <span className="bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">{discount}% off</span>
            </>
          )}
        </div>
        <p className="max-w-xl leading-8 text-ink/72">{product.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-gold/25 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-maroon/55">Color</span>
          <p className="mt-1 font-semibold text-maroon">{product.color}</p>
          <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-ink/55">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Single colorway. This item is not repeated in multiple colors.
          </p>
        </div>
        <div className="border border-gold/25 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-maroon/55">Fabric / Material</span>
          <p className="mt-1 font-semibold text-maroon">{product.fabricMaterial}</p>
          <p className="mt-2 text-xs leading-5 text-ink/55">Category: {product.category}</p>
        </div>
      </div>

      <div className="border-y border-gold/20 py-5">
        <p className="font-serif text-xl text-[#7a1026]">Why this piece feels special</p>
        <p className="mt-2 text-sm leading-6 text-ink/62">
          It is curated for fabric, fall, color, and occasion. AARNA focuses on limited boutique finds, not rows of identical designs.
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <Label>Select Size *</Label>
          <button
            type="button"
            onClick={() => setSizeChartOpen(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-maroon hover:text-gold"
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
                "min-w-[50px] border px-4 py-2 text-sm font-semibold transition-colors",
                size === availableSize
                  ? "border-maroon bg-maroon text-white"
                  : "border-maroon/30 bg-white text-maroon hover:border-maroon",
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
          className="border-gold/25 bg-white"
        />
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="default" size="lg" className="flex-1 rounded-none uppercase tracking-[0.14em]" onClick={handleAddToCart}>
          {added ? (
            <>
              <Check className="h-5 w-5" /> Added
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
          className="flex-1 rounded-none uppercase tracking-[0.14em]"
          onClick={() => {
            if (handleAddToCart()) router.push("/cart");
          }}
        >
          Buy Now
        </Button>
      </div>

      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-ivory p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setSizeChartOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-white p-2 text-maroon shadow"
              aria-label="Close size chart"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="pr-10">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Fit guide</p>
              <h2 className="mt-1 font-serif text-3xl text-[#7a1026]">Standard Size Chart</h2>
            </div>
            <div className="relative mt-5 aspect-[4/3] overflow-hidden border border-gold/20 bg-white">
              <Image src="/size-chart.svg" alt="Standard ladies ethnic wear size chart" fill className="object-contain p-3" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
