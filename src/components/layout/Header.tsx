"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/checkout", label: "WhatsApp Order" },
];

const tickerItems = [
  "✨ Designer quality clothes",
  "🚚 Free shipping on first order",
  "🧵 Custom fitting guidance",
  "💬 Order directly on WhatsApp",
  "🌸 Curated with trust by Abha",
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 7c3 0 5 1.8 5 4 0 1.8-1.1 3.1-2.8 3.7L38 36.5c.7 1.3-.2 2.9-1.7 2.9H11.7c-1.5 0-2.4-1.6-1.7-2.9l11.8-21.8C20.1 14.1 19 12.8 19 11c0-2.2 2-4 5-4Z"
          stroke="#6f1d2f"
          strokeWidth="2"
        />
        <path d="M18 22h12M15 30h18" stroke="#b78a39" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <>
      <div className="ticker" aria-label="Store highlights">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={item + index}>{item}</span>
          ))}
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-lockup" aria-label="AARNA CREATIONS home">
            <BrandMark />
            <span className="min-w-0">
              <span className="brand-title">AARNA CREATIONS</span>
              <span className="brand-byline">by Abha Maheshwari</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} className={active ? "active" : ""}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link href="/cart" className="icon-btn relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-maroon px-1 text-[10px] font-black text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              className="menu-btn"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className={mobileOpen ? "menu-panel open" : "menu-panel"} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setMobileOpen(false)}>
            Cart
          </Link>
        </nav>
      </header>
    </>
  );
}
