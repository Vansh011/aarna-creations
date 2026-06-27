"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
  { name: "Kurtis", href: "/shop?category=Kurtis", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=900&q=85" },
  { name: "Suit Sets", href: "/shop?category=Suit+Sets", image: "https://images.unsplash.com/photo-1595777457583-95c059a36a12?w=900&q=85" },
  { name: "Festive Wear", href: "/shop?category=Festive+Wear", image: "https://images.unsplash.com/photo-1610030459668-9a67d699e746?w=900&q=85" },
  { name: "Lehengas", href: "/shop?category=Lehengas", image: "https://images.unsplash.com/photo-1610030459413-c7360a5080a1?w=900&q=85" },
];

export function FeaturedCollections() {
  return (
    <section className="bg-ivory px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-gold">Shop by mood</p>
            <h2 className="mt-3 font-serif text-4xl text-maroon md:text-5xl">Explore Collections</h2>
          </div>
          <p className="max-w-2xl text-maroon/68 md:justify-self-end">
            A softer, visual way to browse daily wear, festive favorites, wedding moments, and handpicked boutique pieces.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {collections.map((collection, index) => (
            <Link key={collection.name} href={collection.href} className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(90,21,41,0.12)]">
              <Image src={collection.image} alt={collection.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <p className="mb-1 text-xs uppercase tracking-[0.22em] text-gold">0{index + 1}</p>
                <h3 className="font-serif text-xl text-white md:text-2xl">{collection.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
