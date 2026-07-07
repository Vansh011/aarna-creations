"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartItemList() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="summary-box py-12 text-center">
        <p className="font-serif text-3xl leading-none text-[#4b1020]">Your shortlist is empty.</p>
        <p className="mx-auto mt-3 max-w-md text-[#735f58]">
          Add a piece you love, then send a clean WhatsApp order for final availability and fitting confirmation.
        </p>
        <Link className="btn-proto btn-primary-proto mx-auto mt-5" href="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.cartId} className="cart-item">
            <Link href={"/product/" + item.slug} className="relative block h-[118px] overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="88px" />
            </Link>
            <div>
              <div className="flex items-start justify-between gap-3">
                <Link href={"/product/" + item.slug}>
                  <h3>{item.name}</h3>
                </Link>
                <button
                  type="button"
                  onClick={() => removeItem(item.cartId)}
                  className="text-[#735f58] hover:text-red-600"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="meta mt-1">
                Size {item.size} · Color {item.color}
                {item.customization ? " · " + item.customization : ""}
              </p>
              <div className="price mt-2">{formatPrice(item.price)}</div>
              <div className="chips mt-3">
                <button
                  type="button"
                  className="chip"
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="chip">{item.quantity}</span>
                <button
                  type="button"
                  className="chip"
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <span className="chip">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="summary-box">
        <div className="summary-line">
          <span>Subtotal</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <div className="summary-line">
          <span>First order discount</span>
          <strong>Mention FIRSTAARNA</strong>
        </div>
        <div className="summary-line">
          <span>Shipping</span>
          <strong>Confirm on WhatsApp</strong>
        </div>
        <div className="summary-line total">
          <span>Estimated total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <Link className="btn-proto btn-primary-proto" href="/checkout">
          Continue to Checkout
        </Link>
        <p className="meta">Final amount, availability, and shipping are confirmed by Abha on WhatsApp.</p>
      </aside>
    </div>
  );
}
