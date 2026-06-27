import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout | AARNA CREATIONS",
  description: "Complete your order via WhatsApp.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl md:text-4xl text-maroon mb-2">
        Checkout
      </h1>
      <div className="gold-divider w-24 mb-2" />
      <p className="text-maroon/70 mb-8">
        Fill in your details and place your order via WhatsApp
      </p>
      <CheckoutForm />
    </div>
  );
}
