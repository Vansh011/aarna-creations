import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Youtube, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About | AARNA CREATIONS",
  description: "Learn about Abha Maheshwari and AARNA CREATIONS boutique.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative py-24 bg-maroon text-ivory overflow-hidden">
        <div className="absolute inset-0 pattern-border opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Image
            src="/logo.png"
            alt="AARNA CREATIONS"
            width={220}
            height={80}
            className="h-20 w-auto mx-auto mb-6"
          />
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            About AARNA CREATIONS
          </h1>
          <p className="text-gold text-lg">by Abha Maheshwari</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="prose prose-lg max-w-none text-maroon/80 space-y-6">
          <p className="text-xl leading-relaxed font-serif text-maroon">
            Welcome to AARNA CREATIONS — a home boutique born from a passion for
            celebrating the timeless elegance of Indian women.
          </p>

          <p>
            Founded by <strong>Abha Maheshwari</strong>, AARNA CREATIONS curates
            handcrafted ethnic wear for ladies and girls. From everyday cotton kurtis
            to grand wedding lehengas, every piece is chosen with care to help you
            feel confident, beautiful, and connected to our rich cultural heritage.
          </p>

          <p>
            What started as a love for traditional Indian craftsmanship has grown
            into a boutique that serves women who appreciate quality, authenticity,
            and personal attention. We believe fashion is not just about clothing —
            it is about expressing the grace and strength that every Indian woman
            carries within her.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Heart,
              title: "Handpicked Quality",
              desc: "Every garment is carefully selected for fabric, fit, and craftsmanship.",
            },
            {
              icon: Sparkles,
              title: "Personal Touch",
              desc: "Customization options and direct WhatsApp support from Abha Maheshwari.",
            },
            {
              icon: Youtube,
              title: "See Before You Buy",
              desc: "Watch new arrivals and styling videos on our YouTube channel.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gold/10"
            >
              <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-maroon" />
              </div>
              <h3 className="font-serif text-lg text-maroon mb-2">{title}</h3>
              <p className="text-sm text-maroon/70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-2xl text-maroon mb-4">Get in Touch</h2>
          <p className="text-maroon/70 mb-8">
            Have questions or want to place a custom order? Reach out on WhatsApp
            — we&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://www.youtube.com/@aarnacreations1921"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
                YouTube Channel
              </a>
            </Button>
            <Button variant="gold" size="lg" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
