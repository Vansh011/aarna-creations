"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import type { YouTubeVideo } from "@/types";

interface YouTubeCarouselProps {
  videos: YouTubeVideo[];
}

export function YouTubeCarousel({ videos }: YouTubeCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  useEffect(() => {
    if (isPaused || videos.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, videos.length]);

  if (videos.length === 0) return null;

  const visibleCount = Math.min(3, videos.length);
  const visibleVideos = Array.from({ length: visibleCount }, (_, i) => {
    return videos[(current + i) % videos.length];
  });

  return (
    <section
      className="py-20 bg-cream pattern-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-maroon mb-3">
            New Arrivals — Watch on YouTube
          </h2>
          <div className="gold-divider w-24 mx-auto mb-4" />
          <p className="text-maroon/70">
            See our latest collections and styling tips
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleVideos.map((video, index) => (
                <motion.a
                  key={`${video.id}-${current}-${index}`}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-maroon"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/30 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="h-7 w-7 text-maroon ml-1" fill="currentColor" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm line-clamp-2 flex items-start gap-2">
                      <span className="flex-1">{video.title}</span>
                      <ExternalLink className="h-4 w-4 shrink-0 opacity-60 mt-0.5" />
                    </p>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {videos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-maroon hover:bg-gold transition-colors z-10"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-maroon hover:bg-gold transition-colors z-10"
                aria-label="Next video"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === current
                        ? "bg-maroon w-8"
                        : "bg-maroon/30 hover:bg-maroon/50"
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/@aarnacreations1921"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-maroon hover:text-gold font-medium transition-colors"
          >
            View All Videos on YouTube
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
