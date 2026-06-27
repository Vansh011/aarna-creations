import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1610030459668-9a67d699e746?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/70 to-maroon/40" />
      <div className="absolute inset-0 pattern-border opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">
          <p className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4">
            by Abha Maheshwari
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-6">
            Where Tradition
            <br />
            <span className="text-gold">Meets Elegance</span>
          </h1>
          <p className="text-ivory/85 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Celebrating the timeless beauty of Indian women through handcrafted
            ethnic wear — kurtis, suits, lehengas, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link href="/shop">Shop Collection</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-ivory text-ivory hover:bg-ivory hover:text-maroon"
              asChild
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
