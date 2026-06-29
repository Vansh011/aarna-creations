import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#641121] via-[#811b2c] to-[#5b0b17] text-[#fff4e2]">
      <div className="absolute inset-0 pattern-border opacity-25" />
      <div className="relative mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.45fr_0.75fr_1fr]">
          <div>
            <div>
              <p className="font-brand text-[2.35rem] uppercase leading-[0.92] tracking-[0.05em] text-[#f3d89a]">
                AARNA <br /> CREATIONS
              </p>
              <p className="brand-byline mt-3 text-gold-light">by Abha Maheshwari</p>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#f2dbc2]">
              Limited ethnic wear, selected for material, fall, color, and individuality. Wear what you feel like, and let it be unique.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f3d89a]">
              <MapPin className="h-4 w-4" /> Visit us here
            </p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#fff0d6]">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#f5ddc7]">
              <li><Link href="/shop" className="hover:text-gold-light">All Pieces</Link></li>
              <li><Link href="/shop?category=Kurtis" className="hover:text-gold-light">Kurtis</Link></li>
              <li><Link href="/shop?category=Suit+Sets" className="hover:text-gold-light">Suit Sets</Link></li>
              <li><Link href="/shop?category=Lehengas" className="hover:text-gold-light">Lehengas</Link></li>
              <li><Link href="/shop?category=Girls+Wear" className="hover:text-gold-light">Girls Wear</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#fff0d6]">Connect</h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.youtube.com/@aarnacreations1921"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dab56e] text-[#f7dfb0] transition-colors hover:bg-gold hover:text-maroon"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dab56e] text-[#f7dfb0] transition-colors hover:bg-gold hover:text-maroon"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={"https://wa.me/" + (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dab56e] text-[#f7dfb0] transition-colors hover:bg-gold hover:text-maroon"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#f2dbc2]">
              Orders complete on WhatsApp so sizing, delivery, and availability can be confirmed personally.
            </p>
          </div>
        </div>

        <div className="my-7 h-px bg-[#f6d8bc]/20" />
      </div>
    </footer>
  );
}
