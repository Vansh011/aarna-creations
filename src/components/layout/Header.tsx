"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Kurtis", label: "Kurtis" },
  { href: "/shop?category=Lehengas", label: "Lehngas" },
  { href: "/about", label: "Our Story" },
];

const tickerItems = [
  "\u2728 Designer quality clothes",
  "\u{1F69A} Free shipping on first order",
  "\u{1F9F5} Custom fitting guidance",
  "\u{1F4AC} Order directly on WhatsApp",
  "\u{1F338} Curated with trust by Abha",
];

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
            <Image
              src="/logo.png"
              alt=""
              width={1080}
              height={740}
              className="brand-logo"
              priority
              aria-hidden="true"
            />
            <span className="min-w-0">
              <span className="brand-title">AARNA CREATIONS</span>
              <span className="brand-byline">by Abha Maheshwari</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => {
              const baseHref = link.href.split("?")[0];
              const active = link.href === "/" ? pathname === "/" : pathname === baseHref && !link.href.includes("?");
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
