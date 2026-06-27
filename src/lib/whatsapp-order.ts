import type { CartItem, CheckoutFormData } from "@/types";
import { formatPrice } from "@/lib/utils";

export function buildWhatsAppOrderUrl(
  customer: CheckoutFormData,
  items: CartItem[],
  total: number,
  origin: string
): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX";

  const lines = [
    "*New Order — AARNA CREATIONS*",
    "",
    "*Customer:*",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`,
    `City: ${customer.city}`,
    `PIN: ${customer.pincode}`,
    customer.notes ? `Notes: ${customer.notes}` : "",
    "",
    "*Items:*",
    ...items.map((item, index) => {
      const parts = [
        `${index + 1}. ${item.name}`,
        `   Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}`,
        item.customization ? `   Custom: ${item.customization}` : "",
        `   Price: ${formatPrice(item.price * item.quantity)}`,
        `   Link: ${origin}/product/${item.slug}`,
      ].filter(Boolean);
      return parts.join("\n");
    }),
    "",
    `*Order Total: ${formatPrice(total)}*`,
    "",
    "Placed via AARNA CREATIONS website",
  ].filter((line) => line !== undefined);

  const text = encodeURIComponent(lines.join("\n"));
  const cleanPhone = phone.replace(/\D/g, "");

  return `https://wa.me/${cleanPhone}?text=${text}`;
}
