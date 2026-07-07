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
    <div className="gallery">
      <div className="gallery-main">
        <Image
          src={activeImage}
          alt={name + " product image " + (activeIndex + 1)}
          fill
          className="object-cover"
          sizes="(max-width: 720px) 100vw, 50vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-white/45 bg-[#fffaf1]/90 text-[#4b1020]"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((index) => (index + 1) % images.length)}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-white/45 bg-[#fffaf1]/90 text-[#4b1020]"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="thumbs">
          {images.slice(0, 5).map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={index === activeIndex ? "overflow-hidden border-[#b78a39]" : "overflow-hidden opacity-70"}
              aria-label={"View image " + (index + 1)}
            >
              <Image src={img} alt="" width={160} height={160} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
