import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-maroon text-ivory pattern-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="AARNA CREATIONS"
              width={180}
              height={70}
              className="h-16 w-auto object-contain brightness-110"
            />
            <p className="text-ivory/80 text-sm leading-relaxed max-w-xs">
              Handcrafted ethnic wear celebrating the grace and elegance of Indian women.
              Curated with love by Abha Maheshwari.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li><Link href="/shop" className="hover:text-gold transition-colors">Shop All</Link></li>
              <li><Link href="/shop?category=Kurtis" className="hover:text-gold transition-colors">Kurtis</Link></li>
              <li><Link href="/shop?category=Suit+Sets" className="hover:text-gold transition-colors">Suit Sets</Link></li>
              <li><Link href="/shop?category=Lehengas" className="hover:text-gold transition-colors">Lehengas</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.youtube.com/@aarnacreations1921"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-ivory/10 hover:bg-gold hover:text-maroon transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-ivory/10 hover:bg-gold hover:text-maroon transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-ivory/10 hover:bg-gold hover:text-maroon transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-ivory/70">
              Order via WhatsApp — we&apos;ll share payment details directly.
            </p>
          </div>
        </div>

        <div className="gold-divider my-8" />

        <p className="text-center text-sm text-ivory/60">
          &copy; {new Date().getFullYear()} AARNA CREATIONS by Abha Maheshwari. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
