import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout | AARNA CREATIONS",
  description: "Complete your order via WhatsApp.",
};

export default function CheckoutPage() {
  return (
    <main className="section">
      <div className="section-head">
        <span className="eyebrow">Final step</span>
        <h1 className="page-title">One step away.</h1>
        <p>
          Share only your name, city, and any fit note. Then continue to WhatsApp with your order message already prepared.
        </p>
      </div>
      <CheckoutForm />
    </main>
  );
}
