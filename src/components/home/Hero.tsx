import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-maroon text-ivory">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1610030459668-9a67d699e746?w=1920&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon via-maroon/82 to-maroon/25" />
      <div className="absolute inset-0 boutique-pattern opacity-25" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ivory/10 px-4 py-2 text-sm text-gold backdrop-blur">
            <Sparkles className="h-4 w-4" />
            New limited drops added by the owner
          </div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-gold">by Abha Maheshwari</p>
          <h1 className="font-serif text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
            Ethnic wear that feels made for the moment.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/84 md:text-xl">
            Handpicked kurtis, suit sets, lehengas, sarees, and festive pieces for women and girls, curated with boutique attention.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link href="/shop">Shop Collection <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="border-ivory text-ivory hover:bg-ivory hover:text-maroon" asChild>
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative border-y border-gold/30 bg-maroon/92 py-3 text-gold">
        <div className="marquee-track flex whitespace-nowrap text-sm uppercase tracking-[0.26em]">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="mx-6">Limited pieces / WhatsApp orders / Custom notes / Fresh arrivals</span>
          ))}
        </div>
      </div>
    </section>
  );
}
