import { CartItemList } from "@/components/cart/CartItemList";

export const metadata = {
  title: "Cart | AARNA CREATIONS",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <main className="section">
      <div className="section-head">
        <span className="eyebrow">Your shortlist</span>
        <h1 className="page-title">Review your pieces before WhatsApp.</h1>
        <p>
          Check sizes and quantities here. At checkout, the website prepares one ready-to-send WhatsApp message with your order and delivery details.
        </p>
      </div>
      <CartItemList />
    </main>
  );
}
