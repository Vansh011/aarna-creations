"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Check } from "lucide-react";
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
  const addItem = useCartStore((s) => s.addItem);
  const [size, setSize] = useState<Size | "">("");
  const [color, setColor] = useState("");
  const [customization, setCustomization] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (): boolean => {
    if (!size) {
      setError("Please select a size");
      return false;
    }
    if (!color) {
      setError("Please select a color");
      return false;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size,
      color,
      customization,
    });

    setAdded(true);
    setError("");
    setTimeout(() => setAdded(false), 2000);
    return true;
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-maroon/60 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-maroon mb-3">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-semibold text-maroon">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm text-emerald font-medium">{discount}% off</span>
            </>
          )}
        </div>
        <p className="text-maroon/70 leading-relaxed">{product.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-maroon/60">Fabric</span>
          <p className="font-medium text-maroon">{product.fabric}</p>
        </div>
        <div>
          <span className="text-maroon/60">Occasion</span>
          <p className="font-medium text-maroon">{product.occasion}</p>
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Select Size *</Label>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setError(""); }}
              className={`min-w-[48px] px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                size === s
                  ? "bg-maroon text-white border-maroon"
                  : "border-maroon/30 text-maroon hover:border-maroon"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Select Color *</Label>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); setError(""); }}
              className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                color === c
                  ? "bg-maroon text-white border-maroon"
                  : "border-maroon/30 text-maroon hover:border-maroon"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="customization" className="mb-2 block">
          Customization Notes (optional)
        </Label>
        <Textarea
          id="customization"
          placeholder="e.g. Blouse length 14 inches, sleeve style, etc."
          value={customization}
          onChange={(e) => setCustomization(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
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
          disabled={!product.inStock}
        >
          Buy Now
        </Button>
      </div>

      {!product.inStock && (
        <p className="text-red-600 font-medium">Currently out of stock</p>
      )}
    </div>
  );
}
