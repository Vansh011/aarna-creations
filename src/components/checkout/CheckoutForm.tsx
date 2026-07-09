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
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const total = getTotal();

  const validate = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim() || form.pincode.replace(/\D/g, "").length < 6) {
      newErrors.pincode = "Valid PIN code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const url = buildWhatsAppOrderUrl(form, items, total, window.location.origin);
    window.open(url, "_blank");
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
    <div className="checkout-layout">
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Full name
          <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" />
          {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
        </label>
        <label>
          Phone number
          <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+91 XXXXX XXXXX" />
          {errors.phone && <span className="text-sm text-red-600">{errors.phone}</span>}
        </label>
        <label>
          Address
          <textarea value={form.address} onChange={(event) => updateField("address", event.target.value)} placeholder="House number, area, landmark" />
          {errors.address && <span className="text-sm text-red-600">{errors.address}</span>}
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            City
            <input value={form.city} onChange={(event) => updateField("city", event.target.value)} placeholder="City" />
            {errors.city && <span className="text-sm text-red-600">{errors.city}</span>}
          </label>
          <label>
            PIN code
            <input value={form.pincode} onChange={(event) => updateField("pincode", event.target.value)} placeholder="452001" />
            {errors.pincode && <span className="text-sm text-red-600">{errors.pincode}</span>}
          </label>
        </div>
        <label>
          Fit notes
          <textarea
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Example: height 5'4, need relaxed fit, sleeve length adjustment"
          />
        </label>
        <button type="submit" className="btn-proto btn-primary-proto">
          <MessageCircle className="h-4 w-4" />
          Open WhatsApp With Order Text
        </button>
      </form>

      <aside className="summary-box">
        <h3 className="m-0 font-serif text-2xl leading-none text-[#4b1020]">Order preview</h3>
        <p className="meta">
          Hi AARNA CREATIONS, I want to order these pieces. Please confirm availability, size, final price, and shipping.
        </p>
        <div className="checkout-steps">
          <div>
            <strong>1. Details</strong>
            <span>You add your contact, address, and fit notes here.</span>
          </div>
          <div>
            <strong>2. WhatsApp opens</strong>
            <span>Your full order message is automatically typed inside WhatsApp.</span>
          </div>
          <div>
            <strong>3. Tap Send</strong>
            <span>WhatsApp keeps you in control, so the final send button must be pressed by you.</span>
          </div>
        </div>
        {items.map((item) => (
          <div key={item.cartId} className="summary-line">
            <span>{item.name}</span>
            <strong>{item.size}</strong>
          </div>
        ))}
        <div className="summary-line total">
          <span>Estimated total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <p className="meta">Final availability, shipping, and payment are confirmed personally by the boutique on WhatsApp.</p>
      </aside>
    </div>
  );
}
