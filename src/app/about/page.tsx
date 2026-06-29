import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, MessageCircle, Sparkles, Users, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const gallery = [
  {
    src: "/aarna-visit-boutique.png",
    title: "Boutique conversations",
    caption: "The personal fittings, fabric talks, and quiet details behind every selection.",
  },
  {
    src: "/aarna-material-usp-v3.png",
    title: "Material first",
    caption: "Fabric, fall, comfort, and finish guide what becomes part of AARNA.",
  },
  {
    src: "/aarna-collection-festive-v3.png",
    title: "Exhibition moments",
    caption: "A space for women to discover occasion wear with confidence and ease.",
  },
];

const values = [
  {
    icon: Users,
    title: "Women driven",
    desc: "A boutique shaped by women, for women, with an understanding of real occasions, comfort, and confidence.",
  },
  {
    icon: Heart,
    title: "Personal eye",
    desc: "Each piece is selected with care, not bought in bulk to look like every other rack.",
  },
  {
    icon: Sparkles,
    title: "Limited by choice",
    desc: "We keep the edit small so every design can feel special, considered, and individual.",
  },
];

export const metadata = {
  title: "About | AARNA CREATIONS",
  description: "The story of AARNA CREATIONS, a women-driven ethnic wear boutique by Abha Maheshwari.",
};

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      <section className="relative overflow-hidden px-4 py-16 text-ivory sm:px-6 lg:px-8 lg:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/aarna-home-hero-v3.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#24090f]/96 via-[#7b1932]/82 to-[#1b120f]/48" />
        <div className="absolute inset-0 boutique-pattern opacity-20 mix-blend-soft-light" />
        <div className="relative mx-auto max-w-7xl">
          <p className="ornate-title text-gold-light">About AARNA</p>
          <h1 className="mt-5 max-w-4xl font-serif text-[2.75rem] leading-[0.98] text-white md:text-[3.75rem]">
            A women-driven boutique with a personal eye.
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-xl leading-7 text-ivory/88">
            AARNA CREATIONS by Abha Maheshwari is built for women who want ethnic wear chosen with intention, warmth, and individuality.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="ornate-title text-[#6d1022]">Our story</p>
            <h2 className="mt-5 font-serif text-[2.4rem] leading-tight text-[#7a1026] md:text-[3rem]">
              Started at home. Built with trust.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-ink/76">
              <p>
                AARNA began as a home boutique with a simple thought: ethnic wear should feel personal. Not rushed, not repeated everywhere, and not chosen only because it is trending.
              </p>
              <p>
                Abha Maheshwari curates pieces with attention to fabric, fall, workmanship, and the woman who will wear them. The boutique is fully women driven, shaped by conversations, fittings, exhibitions, and years of trust from customers who return for that personal touch.
              </p>
              <p>
                Our collections are intentionally limited. We believe a good outfit should carry a sense of occasion, but also a sense of you.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-[420px] overflow-hidden bg-maroon shadow-[0_26px_70px_rgba(78,19,37,0.16)] sm:row-span-2">
              <Image src={gallery[0].src} alt={gallery[0].title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 38vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24090f]/82 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="font-serif text-3xl">{gallery[0].title}</p>
                <p className="mt-2 text-sm leading-6 text-white/78">{gallery[0].caption}</p>
              </div>
            </div>
            {gallery.slice(1).map((item) => (
              <div key={item.title} className="relative min-h-[202px] overflow-hidden bg-maroon shadow-[0_18px_45px_rgba(78,19,37,0.12)]">
                <Image src={item.src} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 28vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24090f]/82 via-[#24090f]/10 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <p className="font-serif text-2xl">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/76">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4eadb] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="ornate-title text-[#6d1022]">What guides us</p>
            <h2 className="mt-7 font-serif text-4xl leading-tight text-[#7a1026] md:text-5xl">
              Curation with feeling, not noise.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-gold/25 bg-ivory p-7 shadow-[0_18px_50px_rgba(78,19,37,0.08)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#8a1538] text-gold-light">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#7a1026]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 border border-gold/25 bg-[#4a0f20] p-7 text-ivory shadow-[0_28px_80px_rgba(78,19,37,0.16)] md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.28em] text-gold-light">
              <MapPin className="h-4 w-4" /> Visit &middot; Order &middot; Connect
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-white md:text-5xl">
              Begin your journey with us.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ivory/76">
              Visit the boutique, follow new arrivals on YouTube, or send a WhatsApp message to ask about sizing, fabric, and availability.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button variant="gold" size="lg" className="rounded-none uppercase tracking-[0.16em]" asChild>
              <a
                href={"https://wa.me/" + (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-none border-ivory text-ivory hover:bg-ivory hover:text-maroon" asChild>
              <a
                href="https://www.youtube.com/@aarnacreations1921"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" /> YouTube
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-none border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
