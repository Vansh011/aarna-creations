"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartItemList() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-maroon/70 text-lg mb-6">Your cart is empty</p>
        <Button variant="gold" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.cartId}
            className="flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-gold/10"
          >
            <Link
              href={`/product/${item.slug}`}
              className="relative w-24 h-32 shrink-0 rounded-lg overflow-hidden bg-cream"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/product/${item.slug}`}
                className="font-serif text-maroon hover:text-gold transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-sm text-maroon/60 mt-1">
                Size: {item.size} | Color: {item.color}
              </p>
              {item.customization && (
                <p className="text-xs text-maroon/50 mt-1 line-clamp-2">
                  Note: {item.customization}
                </p>
              )}
              <p className="font-semibold text-maroon mt-2">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.cartId)}
                className="text-maroon/40 hover:text-red-500 transition-colors p-1"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 border border-maroon/20 rounded-md">
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  className="p-1.5 hover:bg-cream transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  className="p-1.5 hover:bg-cream transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <p className="text-sm font-semibold text-maroon">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gold/10 sticky top-24">
          <h2 className="font-serif text-xl text-maroon mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-maroon/70">Subtotal</span>
              <span className="font-medium">{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-maroon/70">Shipping</span>
              <span className="text-emerald font-medium">Calculated on WhatsApp</span>
            </div>
          </div>
          <div className="gold-divider mb-4" />
          <div className="flex justify-between text-lg font-semibold text-maroon mb-6">
            <span>Total</span>
            <span>{formatPrice(getTotal())}</span>
          </div>
          <Button variant="gold" size="lg" className="w-full" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <p className="text-xs text-maroon/50 text-center mt-3">
            Payment details will be shared via WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
