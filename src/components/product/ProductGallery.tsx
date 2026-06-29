"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream shadow-[0_32px_85px_rgba(78,19,37,0.18)] ring-1 ring-gold/25">
        <Image
          src={activeImage}
          alt={name + " image " + (activeIndex + 1)}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2b1513]/30 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 bg-white/94 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#7f2f38] shadow">
          One design
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-maroon shadow transition-colors hover:bg-gold"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveIndex((index) => (index + 1) % images.length)}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-maroon shadow transition-colors hover:bg-gold"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, index) => (
            <button
              key={img + index}
              onClick={() => setActiveIndex(index)}
              className={[
                "relative aspect-[3/4] overflow-hidden border-2 bg-cream transition-all",
                index === activeIndex ? "border-gold shadow-md" : "border-transparent opacity-70 hover:opacity-100",
              ].join(" ")}
              aria-label={"View image " + (index + 1)}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="90px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
