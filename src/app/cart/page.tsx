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
        <h1 className="page-title">Cart designed for WhatsApp ordering.</h1>
        <p>The cart should feel like a shortlist, because the final confirmation still happens personally with the owner.</p>
      </div>
      <CartItemList />
    </main>
  );
}
