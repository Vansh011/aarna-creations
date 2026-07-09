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
        <h1 className="page-title">Place your order on WhatsApp.</h1>
        <p>
          Fill your details once. We will open WhatsApp with your complete order message already written, so you only need to review it and press Send.
        </p>
      </div>
      <CheckoutForm />
    </main>
  );
}
