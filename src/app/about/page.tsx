import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Story | AARNA CREATIONS",
  description: "The story of AARNA CREATIONS, a women-driven ethnic wear boutique by Abha Maheshwari.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="section">
          <span className="eyebrow">Our story</span>
          <h1 className="page-title">A boutique built on trust, taste, and real fabric.</h1>
          <p>AARNA CREATIONS should feel less like a catalogue dump and more like visiting a trusted home boutique where someone helps you choose.</p>
        </div>
      </section>

      <section className="section owner-story">
        <div className="story-img">
          <Image
            src="/aarna-redesign/owner-portrait.webp"
            alt="Founder portrait"
            width={640}
            height={800}
            sizes="(max-width: 720px) 100vw, 48vw"
          />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">By Abha Maheshwari</span>
          <h1>Curated with a personal eye.</h1>
          <p className="meta text-base leading-7">
            The brand voice is warm, direct, and practical: beautiful pieces, clear prices, honest fit help, and a WhatsApp-led confirmation process.
          </p>
          <div className="detail-panel">
            <h3>What this redesign fixes</h3>
            <ul>
              <li>Stronger first impression with brand, owner, and boutique authenticity.</li>
              <li>Mobile-first shopping path with visible categories and new arrivals.</li>
              <li>Trust cues around dispatch, fitting, returns help, and personal confirmation.</li>
              <li>Product pages that highlight fabric, description, color, and size before asking for action.</li>
            </ul>
          </div>
          <Link className="btn-proto btn-primary-proto" href="/shop">
            Explore Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
