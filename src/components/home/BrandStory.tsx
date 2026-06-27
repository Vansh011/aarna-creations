import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  return (
    <section className="py-20 bg-maroon text-ivory relative overflow-hidden">
      <div className="absolute inset-0 pattern-border opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
              Crafted with Love by
              <br />
              <span className="text-gold">Abha Maheshwari</span>
            </h2>
            <p className="text-ivory/85 leading-relaxed mb-4">
              AARNA CREATIONS is a home boutique dedicated to bringing you the finest
              ethnic wear for ladies and girls. Every piece is carefully selected to
              celebrate the grace, strength, and beauty of Indian women.
            </p>
            <p className="text-ivory/70 leading-relaxed mb-8">
              From everyday kurtis to grand wedding lehengas, we believe every woman
              deserves to feel regal in handcrafted tradition.
            </p>
            <Button variant="gold" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-4 border-gold/30 shadow-2xl">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1595777457583-95c059a36a12?w=800&q=80')",
                }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:right-8 bg-gold text-maroon-dark px-6 py-3 rounded-lg shadow-lg font-serif text-lg">
              Handpicked with care
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
