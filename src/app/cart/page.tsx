import { CartItemList } from "@/components/cart/CartItemList";

export const metadata = {
  title: "Cart | AARNA CREATIONS",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="bg-ivory">
      <section className="relative overflow-hidden px-4 py-10 text-ivory sm:px-6 sm:py-12 lg:px-8">
        <div className="absolute inset-0 bg-[#8a1538]" />
        <div className="absolute inset-0 boutique-pattern opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <p className="ornate-title text-gold-light">Boutique bag</p>
          <h1 className="mt-4 font-serif text-[2rem] leading-tight text-white sm:mt-5 sm:text-[2.6rem] md:text-[3.3rem]">Pieces you picked</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ivory/78 sm:mt-4 sm:text-base">
            Review size, color, and notes before the order moves to WhatsApp.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-3 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <CartItemList />
      </div>
    </div>
  );
}
