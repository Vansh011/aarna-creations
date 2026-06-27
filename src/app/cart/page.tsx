import { CartItemList } from "@/components/cart/CartItemList";

export const metadata = {
  title: "Cart | AARNA CREATIONS",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl md:text-4xl text-maroon mb-2">
        Shopping Cart
      </h1>
      <div className="gold-divider w-24 mb-8" />
      <CartItemList />
    </div>
  );
}
