import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const VISIT_ADDRESS = "AARNA CREATIONS Boutique - Silver Stud Apt, 7/2 Race Course Road, Indore - 452001";

export function BrandStory() {
  return (
    <section className="bg-[#fbf7ef]">
      <div className="mx-auto grid max-w-7xl overflow-hidden border-y border-[#e5d2b1] bg-[#fcf5eb] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[285px] bg-maroon sm:min-h-[420px] lg:min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/aarna-material-usp-v3.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#fcf5eb]/40" />
        </div>

        <div className="relative px-4 py-8 sm:px-10 lg:px-14 lg:py-12">
          <div className="pointer-events-none absolute right-2 top-5 h-40 w-28 opacity-18 pattern-border sm:right-4 sm:top-6 sm:h-64 sm:w-44 sm:opacity-25" />

          <div className="relative border-b border-[#d7c09a] pb-7 sm:pb-8">
            <p className="ornate-title text-[#2a1716]">Our story</p>
            <h2 className="mt-3 max-w-2xl font-serif text-[1.25rem] leading-tight text-[#3c302b] sm:mt-4 sm:text-[1.65rem] md:text-[1.95rem]">
              <strong className="font-semibold">A boutique built on</strong>{" "}
              <em className="font-calligraphy text-[2rem] normal-case tracking-normal text-[#9c6b20] sm:text-[2.55rem] md:text-[3rem]">intentions.</em>
            </h2>
            <div className="mt-4 h-px w-20 bg-[#be963e]" />
            <p className="mt-4 max-w-2xl font-serif text-[1rem] leading-6 text-[#3c302b] sm:mt-5 sm:text-[1.08rem]">
              AARNA CREATIONS began as a home boutique for women who wanted clothing chosen with patience, feeling, and a personal eye. Every piece is selected for fabric, finish, and individuality, so getting dressed feels less ordinary and more like you.
            </p>
            <p className="mt-3 max-w-2xl font-serif text-[0.96rem] leading-6 text-[#3c302b]/82 sm:mt-4 sm:text-[1.02rem]">
              Led by Abha Maheshwari, the boutique keeps the experience close, warm, and personal, from browsing to WhatsApp ordering.
            </p>
            <Link href="/about" className="maroon-cta mt-6">
              Read our story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div id="visit" className="relative pt-7 sm:pt-8">
            <p className="font-serif text-[1.32rem] font-bold uppercase leading-tight tracking-[0.055em] text-[#2a1716] sm:text-[2.05rem] sm:leading-none md:text-[2.6rem]">
              Visit &middot; Order &middot; Connect
            </p>
            <h3 className="section-subline mt-3">
              Begin your journey with us.
            </h3>
            <p className="mt-4 flex gap-3 font-serif text-[0.98rem] font-semibold leading-6 text-[#3c302b] sm:text-[1.04rem]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#9c6b20]" />
              <span>{VISIT_ADDRESS}</span>
            </p>
            <p className="mt-3 font-serif text-[0.96rem] leading-6 text-[#3c302b]/78 sm:mt-4 sm:text-[1.02rem]">
              Visit the boutique to feel the fabrics, confirm details on WhatsApp, or browse online before choosing your piece.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
              <Button variant="gold" className="h-10 w-full rounded-[2px] px-5 text-[11px] font-extrabold uppercase tracking-[0.13em] shadow-none sm:w-auto" asChild>
                <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(VISIT_ADDRESS)} target="_blank" rel="noopener noreferrer">
                  Open map
                </a>
              </Button>
              <Button variant="outline" className="h-10 w-full rounded-[2px] border-[#751528] px-5 text-[11px] font-extrabold uppercase tracking-[0.13em] sm:w-auto" asChild>
                <Link href="/shop"><MessageCircle className="h-4 w-4" /> Browse first</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
