"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import type { YouTubeVideo } from "@/types";

interface YouTubeCarouselProps {
  videos: YouTubeVideo[];
}

const CHANNEL_URL = "https://www.youtube.com/@aarnacreations1921";

export function YouTubeCarousel({ videos }: YouTubeCarouselProps) {
  const safeVideos = videos.length > 0 ? videos : [
    {
      id: "aarna-youtube",
      title: "Watch AARNA CREATIONS latest arrivals on YouTube",
      url: CHANNEL_URL,
      thumbnail: "/aarna-home-hero-v3.png",
      publishedAt: new Date().toISOString(),
    },
  ];
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % safeVideos.length);
  }, [safeVideos.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + safeVideos.length) % safeVideos.length);
  }, [safeVideos.length]);

  useEffect(() => {
    if (isPaused || safeVideos.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, safeVideos.length]);

  const visibleCount = Math.min(3, safeVideos.length);
  const visibleVideos = Array.from({ length: visibleCount }, (_, index) => safeVideos[(current + index) % safeVideos.length]);

  return (
    <section
      className="relative overflow-hidden bg-[#fbf7ef] px-3 py-10 text-ink sm:px-6 lg:px-8 lg:py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 text-center sm:mb-8">
          <p className="ornate-title text-[#6d1022]">YouTube drops</p>
          <h2 className="section-subline mt-3">
            See the fabric move before you choose.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-[0.95rem] leading-6 text-[#836f65] sm:text-base">
            Follow AARNA CREATIONS by Abha Maheshwari for new arrival videos, material close-ups, and real boutique updates.
          </p>
        </div>

        <div className="relative px-0 md:px-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {visibleVideos.map((video, index) => (
                <motion.a
                  key={video.id + "-" + current + "-" + index}
                  href={video.url || CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className={(index > 0 ? "hidden md:block " : "") + "group overflow-hidden rounded-[3px] bg-white shadow-[0_10px_24px_rgba(64,23,18,0.07)] ring-1 ring-[#e1d0b7] transition-transform duration-300 active:scale-[0.99] md:rounded-md"}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail || "/aarna-home-hero-v3.png"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-11 w-14 items-center justify-center rounded bg-[#e8292c] text-white shadow-lg transition-transform group-hover:scale-105">
                        <Play className="ml-1 h-5 w-5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="flex items-start gap-2 text-sm font-semibold leading-snug text-[#1c1716]">
                      <span className="line-clamp-2 flex-1">{video.title}</span>
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9c6b20]" />
                    </p>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {safeVideos.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#c3a26a] bg-[#fbf7ef] text-[#8d6d38] shadow-sm transition-colors hover:bg-gold hover:text-maroon md:flex" aria-label="Previous video">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={next} className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#c3a26a] bg-[#fbf7ef] text-[#8d6d38] shadow-sm transition-colors hover:bg-gold hover:text-maroon md:flex" aria-label="Next video">
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="mt-7 text-center sm:mt-8">
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="maroon-cta">
            Open YouTube Channel <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
