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
    <section id="collections" className="bg-[#fbf7ef] px-3 py-9 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-8">
          <p className="ornate-title text-[#8a1538]">The collections</p>
          <h2 className="section-subline mt-3">
            Curated for every celebration
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group overflow-hidden border border-[#c9ad76] bg-[#fffaf5] text-center shadow-[0_8px_24px_rgba(78,30,22,0.06)] transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99]"
            >
              <div className="mx-2 mt-2 overflow-hidden rounded-t-[3.8rem] border border-[#d9bf8f]/70 bg-cream sm:mx-4 sm:mt-4 sm:rounded-t-[5rem]">
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
              <div className="px-2.5 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4">
                <p className="font-calligraphy text-xl text-gold sm:text-2xl">{collection.number}</p>
                <h3 className="mt-1 font-serif text-[1.08rem] leading-[1.02] text-[#76162a] sm:text-[1.55rem]">{collection.name}</h3>
                <p className="mx-auto mt-1.5 min-h-[2.2rem] max-w-[10rem] font-serif text-[0.78rem] leading-[1.2] text-ink/75 sm:mt-2 sm:min-h-[2.4rem] sm:max-w-[12rem] sm:text-sm sm:leading-[1.15]">{collection.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#7c1022] sm:mt-4 sm:gap-2 sm:text-[10px] sm:tracking-[0.16em]">
                  Discover <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-7 text-center sm:mt-8">
          <Link href="/shop" className="maroon-cta">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
