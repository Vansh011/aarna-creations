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
      <div className="relative min-h-[585px] overflow-hidden bg-maroon text-ivory sm:h-[520px] sm:min-h-0 lg:h-[560px]">
        <div
          className="absolute inset-0 bg-cover bg-[62%_center] sm:bg-[center_32%] lg:bg-[center_40%]"
          style={{ backgroundImage: "url('/aarna-home-hero-v3.png')" }}
        />
        <div className="absolute inset-0 luxury-scrim" />

        <div className="relative mx-auto flex min-h-[585px] max-w-7xl items-end px-4 pb-9 pt-10 sm:h-full sm:min-h-0 sm:items-center sm:px-6 sm:pb-0 sm:pt-0 lg:px-8">
          <div className="max-w-[34rem] fade-up">
            <p className="editorial-kicker mb-4 text-gold-light sm:mb-5">Est. boutique</p>
            <h1 className="font-brand text-[3rem] uppercase leading-[0.88] text-white min-[380px]:text-[3.35rem] sm:text-[5rem] lg:text-[5.6rem]">
              AARNA <br /> CREATIONS
            </h1>

            <p className="brand-byline mt-4 text-gold-light sm:mt-5">by Abha Maheshwari</p>
            <p className="mt-5 max-w-[21rem] font-serif text-[0.98rem] leading-5 text-white/92 sm:mt-9 sm:max-w-xl md:text-[1.2rem] md:leading-[1.15]">
              Wear what you feel like, and let it be unique - curated kurtis, lehengas and festive sets, hand-picked for moments that matter.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
              <Button variant="default" size="lg" className="h-11 w-full rounded-[2px] bg-[#8a2c3c] px-5 text-[11px] font-extrabold uppercase tracking-[0.11em] shadow-none hover:bg-[#6d1022] sm:w-auto sm:px-7 sm:text-xs" asChild>
                <Link href="/shop?sort=newest">Shop New Arrivals <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="h-11 w-full rounded-[2px] border border-gold bg-black/10 px-5 text-[11px] font-extrabold uppercase tracking-[0.11em] text-[#f6d887] hover:bg-gold hover:text-maroon sm:w-auto sm:px-7 sm:text-xs" asChild>
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
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-3 sm:px-6 lg:grid-cols-4 lg:px-8">
          {featureStrip.map(([title, label]) => (
            <div key={title} className="px-2 py-4 text-center sm:px-3 sm:py-5">
              <p className="font-serif text-[1.05rem] leading-none text-[#6d1022] sm:text-xl md:text-2xl">{title}</p>
              <p className="mt-2 text-[9px] font-bold uppercase leading-4 tracking-[0.14em] text-ink/70 sm:text-[10px] sm:tracking-[0.2em]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
