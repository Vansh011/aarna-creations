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
        <h1 className="page-title">Your boutique shortlist.</h1>
        <p>
          Review your selected pieces, adjust quantity, then move to the final step when everything feels right.
        </p>
      </div>
      <CartItemList />
    </main>
  );
}
