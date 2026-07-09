"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp-order";
import { formatPrice } from "@/lib/utils";
import type { CheckoutFormData } from "@/types";

export function CheckoutForm() {
  const { items, getTotal } = useCartStore();
  const [form, setForm] = useState<CheckoutFormData>({
    name: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const total = getTotal();

  const validate = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const url = buildWhatsAppOrderUrl(form, items, total, window.location.origin);
    setWhatsappUrl(url);
    setShowConfirm(true);
  };

  const continueToWhatsApp = () => {
    if (!whatsappUrl) return;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setShowConfirm(false);
  };

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="summary-box py-12 text-center">
        <p className="font-serif text-3xl leading-none text-[#4b1020]">No items to checkout.</p>
        <p className="mx-auto mt-3 max-w-md text-[#735f58]">Shortlist a piece first so the WhatsApp order has useful details.</p>
        <Link className="btn-proto btn-primary-proto mx-auto mt-5" href="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="checkout-layout">
        <form className="form-grid checkout-form-card" onSubmit={handleSubmit}>
          <div className="checkout-intro">
            <span className="eyebrow">One step away</span>
            <h2>Tell us who to confirm with.</h2>
            <p>Name and city are enough. Your WhatsApp number comes automatically when you send the message.</p>
          </div>

          <label>
            Name *
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" />
            {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
          </label>

          <label>
            City *
            <input value={form.city} onChange={(event) => updateField("city", event.target.value)} placeholder="Your city" />
            {errors.city && <span className="text-sm text-red-600">{errors.city}</span>}
          </label>

          <label>
            Customised fit notes
            <textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Optional: height, relaxed fit, sleeve length, alteration request..."
            />
          </label>

          <button type="submit" className="btn-proto btn-primary-proto">
            <MessageCircle className="h-4 w-4" />
            Review WhatsApp Order
          </button>
        </form>

        <aside className="summary-box checkout-summary">
          <span className="eyebrow">Order preview</span>
          <h3>Ready to confirm.</h3>
          <p className="meta">Your selected pieces will be sent to AARNA CREATIONS as one clean WhatsApp message.</p>
          <div className="checkout-preview-list">
            {items.map((item) => (
              <div key={item.cartId} className="checkout-preview-item">
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    Size {item.size} | Qty {item.quantity} | {formatPrice(item.price)} each
                  </span>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-line total">
            <span>Estimated total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <p className="meta">Final availability, shipping, and payment are confirmed personally by the boutique on WhatsApp.</p>
        </aside>
      </div>

      {showConfirm && (
        <div className="checkout-modal-backdrop" role="presentation">
          <div className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title">
            <span className="eyebrow">Almost done</span>
            <h2 id="checkout-modal-title">Continue to WhatsApp?</h2>
            <p>WhatsApp will open with your order message ready. Review it once and tap Send.</p>
            <div className="checkout-modal-actions">
              <button type="button" className="btn-proto btn-primary-proto" onClick={continueToWhatsApp}>
                Continue
              </button>
              <button type="button" className="btn-proto btn-outline-proto" onClick={() => setShowConfirm(false)}>
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
