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
        <h1 className="page-title">Send a clean WhatsApp order.</h1>
        <p>The checkout should collect just enough detail to make the WhatsApp conversation useful, without looking like a payment gateway.</p>
      </div>
      <CheckoutForm />
    </main>
  );
}
