"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
    if (!form.phone.trim() || form.phone.length < 10)
      newErrors.phone = "Valid phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim() || form.pincode.length < 6)
      newErrors.pincode = "Valid PIN code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const url = buildWhatsAppOrderUrl(
      form,
      items,
      total,
      window.location.origin
    );

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
      <div className="text-center py-16">
        <p className="text-maroon/70 text-lg mb-6">No items to checkout</p>
        <Button variant="gold" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div>
        <h2 className="font-serif text-2xl text-maroon mb-6">
          Delivery Details
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your full name"
              className="mt-1.5"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="mt-1.5"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Textarea
              id="address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="House no., street, landmark"
              className="mt-1.5"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="City"
                className="mt-1.5"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <Label htmlFor="pincode">PIN Code *</Label>
              <Input
                id="pincode"
                value={form.pincode}
                onChange={(e) => updateField("pincode", e.target.value)}
                placeholder="302001"
                className="mt-1.5"
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (optional)</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Any special instructions for your order"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-maroon mb-6">Order Review</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gold/10 space-y-4">
          {items.map((item) => (
            <div key={item.cartId} className="flex gap-3 pb-4 border-b border-gold/10 last:border-0 last:pb-0">
              <div className="relative w-16 h-20 shrink-0 rounded overflow-hidden bg-cream">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-maroon text-sm line-clamp-1">
                  {item.name}
                </p>
                <p className="text-xs text-maroon/60">
                  {item.size} | {item.color} | Qty: {item.quantity}
                </p>
                {item.customization && (
                  <p className="text-xs text-maroon/50 line-clamp-1">
                    {item.customization}
                  </p>
                )}
              </div>
              <p className="text-sm font-semibold text-maroon shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}

          <div className="gold-divider" />

          <div className="flex justify-between text-lg font-semibold text-maroon">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="bg-cream rounded-lg p-4 text-sm text-maroon/70">
            <p className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald" />
              Clicking &quot;Place Order&quot; will open WhatsApp with your order
              details. Send the message to complete your order. Payment link will
              be shared by Abha Maheshwari on WhatsApp.
            </p>
          </div>

          <Button
            variant="whatsapp"
            size="lg"
            className="w-full text-base"
            onClick={handlePlaceOrder}
          >
            <MessageCircle className="h-5 w-5" />
            Place Order via WhatsApp
          </Button>

          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="AARNA CREATIONS"
              width={120}
              height={48}
              className="h-10 w-auto opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
