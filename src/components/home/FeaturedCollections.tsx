"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    number: "01",
    name: "Kurtis",
    subtitle: "Everyday elegance, beautifully crafted.",
    href: "/shop?category=Kurtis",
    image: "/aarna-collection-kurtis-v3.png",
    featured: true,
  },
  {
    number: "02",
    name: "Lehengas",
    subtitle: "Heirloom energy for moments that matter.",
    href: "/shop?category=Lehengas",
    image: "/aarna-collection-lehengas-v3.png",
    featured: true,
  },
  {
    number: "03",
    name: "Festive Sets",
    subtitle: "Curated co-ords for every celebration.",
    href: "/shop?category=Festive+Wear",
    image: "/aarna-collection-festive-v3.png",
  },
  {
    number: "04",
    name: "Everyday Ethnic",
    subtitle: "Quiet luxury for daily dressing.",
    href: "/shop?category=Suit+Sets",
    image: "/aarna-collection-everyday-v3.png",
  },
  {
    number: "05",
    name: "Girls Ethnic Wear",
    subtitle: "Little wonders, traditionally dressed.",
    href: "/shop?category=Girls+Wear",
    image: "/aarna-collection-girls-v3.png",
  },
];

export function FeaturedCollections() {
  return (
    <section id="collections" className="bg-[#fbf7ef] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="ornate-title text-[#8a1538]">The collections</p>
          <h2 className="section-subline mt-3">
            Curated for every celebration
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group overflow-hidden border border-[#c9ad76] bg-[#fffaf5] text-center shadow-[0_8px_24px_rgba(78,30,22,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mx-4 mt-4 overflow-hidden rounded-t-[5rem] border border-[#d9bf8f]/70 bg-cream">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
              </div>
              <div className="px-4 pb-5 pt-4">
                <p className="font-calligraphy text-2xl text-gold">{collection.number}</p>
                <h3 className="mt-1 font-serif text-[1.55rem] leading-none text-[#76162a]">{collection.name}</h3>
                <p className="mx-auto mt-2 min-h-[2.4rem] max-w-[12rem] font-serif text-sm leading-[1.15] text-ink/75">{collection.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7c1022]">
                  Discover <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/shop" className="maroon-cta">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
