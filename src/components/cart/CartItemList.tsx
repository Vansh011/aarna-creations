"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartItemList() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="border border-gold/25 bg-white/92 px-6 py-16 text-center shadow-[0_20px_60px_rgba(78,19,37,0.08)]">
        <ShoppingBag className="mx-auto mb-5 h-12 w-12 text-gold" />
        <p className="mb-2 font-serif text-2xl text-[#7a1026]">Your boutique bag is empty</p>
        <p className="mx-auto mb-7 max-w-md text-sm leading-6 text-ink/60">
          Add the pieces you love before they move out of the collection.
        </p>
        <Button variant="gold" className="rounded-none uppercase tracking-[0.16em]" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {items.map((item) => (
          <div
            key={item.cartId}
            className="flex gap-4 border border-gold/20 bg-white p-4 shadow-[0_18px_45px_rgba(78,19,37,0.08)]"
          >
            <Link
              href={"/product/" + item.slug}
              className="relative h-32 w-24 shrink-0 overflow-hidden bg-cream"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={"/product/" + item.slug}
                className="line-clamp-1 font-serif text-xl text-[#7a1026] transition-colors hover:text-gold"
              >
                {item.name}
              </Link>
              <p className="mt-2 text-sm text-ink/58">
                Size: {item.size} | Color: {item.color}
              </p>
              {item.customization && (
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink/50">
                  Note: {item.customization}
                </p>
              )}
              <p className="mt-3 font-semibold text-maroon">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.cartId)}
                className="p-1 text-maroon/42 transition-colors hover:text-red-500"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="flex items-center border border-maroon/20 bg-ivory">
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  className="p-2 transition-colors hover:bg-cream"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  className="p-2 transition-colors hover:bg-cream"
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
        <div className="sticky top-36 border border-gold/25 bg-white p-6 shadow-[0_24px_70px_rgba(78,19,37,0.1)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Order summary</p>
          <h2 className="mt-2 font-serif text-2xl text-[#7a1026]">Your selected pieces</h2>
          <div className="my-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-ink/62">Subtotal</span>
              <span className="font-medium">{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-ink/62">Shipping</span>
              <span className="text-right font-medium text-teal">Confirmed on WhatsApp</span>
            </div>
          </div>
          <div className="gold-divider mb-5" />
          <div className="mb-6 flex justify-between text-lg font-semibold text-maroon">
            <span>Total</span>
            <span>{formatPrice(getTotal())}</span>
          </div>
          <Button variant="gold" size="lg" className="w-full rounded-none uppercase tracking-[0.16em]" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <p className="mt-4 text-center text-xs leading-5 text-ink/50">
            Final availability and payment details are shared personally on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
