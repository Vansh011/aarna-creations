import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const featureStrip = [
  ["No repeat designs", "Each piece feels like yours"],
  ["Material-first", "Fabric, fall, and finish checked"],
  ["Curated by Abha", "Made with care"],
  ["WhatsApp ordering", "Personal support before buying"],
];

export function Hero() {
  return (
    <section className="bg-ivory">
      <div className="relative h-[520px] overflow-hidden bg-maroon text-ivory lg:h-[560px]">
        <div
          className="absolute inset-0 bg-cover bg-[center_32%] lg:bg-[center_40%]"
          style={{ backgroundImage: "url('/aarna-home-hero-v3.png')" }}
        />
        <div className="absolute inset-0 luxury-scrim" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl fade-up">
            <p className="editorial-kicker mb-5 text-gold-light">Est. boutique</p>
            <h1 className="font-brand text-[3.8rem] uppercase leading-[0.86] text-white sm:text-[5rem] lg:text-[5.6rem]">
              AARNA <br /> CREATIONS
            </h1>

            <p className="brand-byline mt-5 text-gold-light">by Abha Maheshwari</p>
            <p className="mt-9 max-w-xl font-serif text-[1rem] leading-[1.15] text-white md:text-[1.2rem]">
              Wear what you feel like, and let it be unique - curated kurtis, lehengas and festive sets, hand-picked for moments that matter.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="default" size="lg" className="h-11 rounded-[2px] bg-[#8a2c3c] px-7 text-xs font-extrabold uppercase tracking-[0.12em] shadow-none hover:bg-[#6d1022]" asChild>
                <Link href="/shop?sort=newest">Shop New Arrivals <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="h-11 rounded-[2px] border border-gold bg-black/10 px-7 text-xs font-extrabold uppercase tracking-[0.12em] text-[#f6d887] hover:bg-gold hover:text-maroon" asChild>
                <Link href="#collections">Explore Collections</Link>
              </Button>
            </div>
            <Link href="#visit" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light">
              <MapPin className="h-4 w-4" /> Visit us here
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-gold/25 bg-[#fbf7ef]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {featureStrip.map(([title, label]) => (
            <div key={title} className="px-3 py-5 text-center">
              <p className="font-serif text-xl leading-none text-[#6d1022] md:text-2xl">{title}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
