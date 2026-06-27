"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const collections = [
  {
    name: "Kurtis",
    href: "/shop?category=Kurtis",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
  },
  {
    name: "Suit Sets",
    href: "/shop?category=Suit+Sets",
    image: "https://images.unsplash.com/photo-1595777457583-95c059a36a12?w=600&q=80",
  },
  {
    name: "Festive Wear",
    href: "/shop?category=Festive+Wear",
    image: "https://images.unsplash.com/photo-1610030459668-9a67d699e746?w=600&q=80",
  },
  {
    name: "Lehengas",
    href: "/shop?category=Lehengas",
    image: "https://images.unsplash.com/photo-1610030459413-c7360a5080a1?w=600&q=80",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-maroon mb-3">
          Explore Collections
        </h2>
        <div className="gold-divider w-24 mx-auto mb-4" />
        <p className="text-maroon/70 max-w-lg mx-auto">
          Discover handcrafted ethnic wear for every occasion
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.name}
            href={collection.href}
            className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="font-serif text-white text-lg md:text-xl mb-1">
                {collection.name}
              </h3>
              <span className="text-gold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
