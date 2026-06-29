import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const VISIT_ADDRESS = "AARNA CREATIONS Boutique - Silver Stud Apt, 7/2 Race Course Road, Indore - 452001";

export function BrandStory() {
  return (
    <section className="bg-[#fbf7ef]">
      <div className="mx-auto grid max-w-7xl overflow-hidden border-y border-[#e5d2b1] bg-[#fcf5eb] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[420px] bg-maroon lg:min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/aarna-material-usp-v3.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#fcf5eb]/40" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <div className="pointer-events-none absolute right-4 top-6 h-64 w-44 opacity-25 pattern-border" />

          <div className="relative border-b border-[#d7c09a] pb-8">
            <p className="ornate-title text-[#2a1716]">Our story</p>
            <h2 className="mt-4 max-w-2xl font-serif text-[1.65rem] leading-tight text-[#3c302b] md:text-[1.95rem]">
              <strong className="font-semibold">A boutique built on</strong>{" "}
              <em className="font-calligraphy text-[2.55rem] normal-case tracking-normal text-[#9c6b20] md:text-[3rem]">intentions.</em>
            </h2>
            <div className="mt-4 h-px w-20 bg-[#be963e]" />
            <p className="mt-5 max-w-2xl font-serif text-[1.08rem] leading-6 text-[#3c302b]">
              AARNA CREATIONS began as a home boutique for women who wanted clothing chosen with patience, feeling, and a personal eye. Every piece is selected for fabric, finish, and individuality, so getting dressed feels less ordinary and more like you.
            </p>
            <p className="mt-4 max-w-2xl font-serif text-[1.02rem] leading-6 text-[#3c302b]/82">
              Led by Abha Maheshwari, the boutique keeps the experience close, warm, and personal, from browsing to WhatsApp ordering.
            </p>
            <Link href="/about" className="maroon-cta mt-6">
              Read our story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div id="visit" className="relative pt-8">
            <p className="font-serif text-[2.05rem] font-bold uppercase leading-none tracking-[0.07em] text-[#2a1716] md:text-[2.6rem]">
              Visit &middot; Order &middot; Connect
            </p>
            <h3 className="section-subline mt-3">
              Begin your journey with us.
            </h3>
            <p className="mt-4 flex gap-3 font-serif text-[1.04rem] font-semibold leading-6 text-[#3c302b]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#9c6b20]" />
              <span>{VISIT_ADDRESS}</span>
            </p>
            <p className="mt-4 font-serif text-[1.02rem] leading-6 text-[#3c302b]/78">
              Visit the boutique to feel the fabrics, confirm details on WhatsApp, or browse online before choosing your piece.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="gold" className="h-10 rounded-[2px] px-5 text-[11px] font-extrabold uppercase tracking-[0.13em] shadow-none" asChild>
                <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(VISIT_ADDRESS)} target="_blank" rel="noopener noreferrer">
                  Open map
                </a>
              </Button>
              <Button variant="outline" className="h-10 rounded-[2px] border-[#751528] px-5 text-[11px] font-extrabold uppercase tracking-[0.13em]" asChild>
                <Link href="/shop"><MessageCircle className="h-4 w-4" /> Browse first</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
