"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Kurtis", label: "Kurtis" },
  { href: "/shop?category=Lehengas", label: "Lehengas" },
  { href: "/shop?category=Festive+Wear", label: "Festive" },
  { href: "/about", label: "About" },
];

const tickerItems = [
  "Hand-curated boutique pieces",
  "Premium quality fabrics",
  "WhatsApp ordering",
  "Fresh limited drops",
  "By Abha Maheshwari",
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfc59a] bg-[#fbf7ef]/98 text-maroon shadow-[0_6px_28px_rgba(62,13,22,0.08)] backdrop-blur-md">
      <div className="overflow-hidden bg-gradient-to-r from-[#5b0a15] via-[#75182a] to-[#4d0812] py-1.5 text-[10px] sm:py-2 sm:text-[11px] font-bold text-[#fee9c4]">
        <div className="marquee-track flex w-max whitespace-nowrap px-4">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={item + index} className="mx-7 inline-flex items-center gap-7">
              <span>{item}</span>
              <span className="text-[#d8b16e]/75">|</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-[64px] items-center justify-between gap-2 sm:min-h-[84px] sm:gap-5">
          <Link href="/" className="group min-w-0 lg:shrink-0" aria-label="AARNA CREATIONS home">
            <span className="block max-w-[12.2rem] font-brand text-[1.28rem] uppercase leading-[0.92] tracking-[0.035em] text-[#6d1022] min-[380px]:max-w-[13.5rem] min-[380px]:text-[1.42rem] sm:max-w-none sm:text-[2.35rem]">
              AARNA CREATIONS
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const baseHref = link.href.split("?")[0];
              const active = link.href === "/" ? pathname === "/" : !link.href.includes("?") && pathname.startsWith(baseHref);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d1717] transition-colors hover:text-[#6d1022]",
                    active && "text-[#6d1022] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#6d1022]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 text-[#171414] sm:gap-4">
            <Link href="/shop" className="hidden p-2 transition-colors hover:text-maroon sm:inline-flex" aria-label="Search products">
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center p-2 transition-colors hover:text-maroon"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 text-[9px] font-bold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-gold/45 bg-white/45 text-maroon transition-colors hover:bg-cream lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="mobile-menu-panel border-t border-gold/25 bg-[#fffaf3] px-1 py-3 shadow-[0_14px_30px_rgba(62,13,22,0.08)] lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-gold/15 px-3 py-3 text-[13px] font-extrabold uppercase tracking-[0.18em] text-maroon/82 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
