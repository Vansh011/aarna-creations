import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout | AARNA CREATIONS",
  description: "Complete your order via WhatsApp.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-ivory">
      <section className="relative overflow-hidden px-4 py-12 text-ivory sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[#3b0d1a]" />
        <div className="absolute inset-0 boutique-pattern opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <p className="ornate-title text-gold-light">WhatsApp ordering</p>
          <h1 className="mt-5 font-serif text-[2.6rem] text-white md:text-[3.3rem]">Complete your request</h1>
          <p className="mt-4 max-w-2xl text-ivory/78">
            Share delivery details and AARNA will confirm availability, payment, and shipping personally.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <CheckoutForm />
      </div>
    </div>
  );
}
