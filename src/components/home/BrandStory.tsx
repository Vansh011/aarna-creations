import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-maroon py-20 text-ivory">
      <div className="absolute inset-0 boutique-pattern opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.22),transparent_28rem)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-gold">Our Story</p>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Crafted with Love by <span className="text-gold">Abha Maheshwari</span>
          </h2>
          <p className="mt-6 leading-relaxed text-ivory/84">
            AARNA CREATIONS is a home boutique dedicated to ethnic wear that feels personal, graceful, and easy to order. Every piece is selected with fabric, fit, and occasion in mind.
          </p>
          <p className="mt-4 leading-relaxed text-ivory/70">
            Customers can browse, choose size, add notes, and place an order directly through WhatsApp for a more personal boutique experience.
          </p>
          <Button variant="gold" className="mt-8" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>

        <div className="relative min-h-[420px]">
          <div className="absolute left-0 top-8 h-72 w-52 overflow-hidden rounded-lg border-4 border-gold/25 bg-cover bg-center shadow-2xl md:h-80 md:w-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595777457583-95c059a36a12?w=700&q=85')" }} />
          <div className="absolute bottom-0 right-0 h-80 w-60 overflow-hidden rounded-lg border-4 border-ivory/18 bg-cover bg-center shadow-2xl md:h-96 md:w-72" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583391733981-9a734153864a?w=700&q=85')" }} />
          <div className="absolute left-10 top-72 rounded-lg bg-gold px-5 py-3 font-serif text-lg text-maroon-dark shadow-lg md:left-24">
            Handpicked daily
          </div>
        </div>
      </div>
    </section>
  );
}
