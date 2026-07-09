import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Story | AARNA CREATIONS",
  description: "The story of AARNA CREATIONS, a women-driven ethnic wear boutique by Abha Maheshwari.",
};

const storyValues = [
  ["Started at home", "AARNA grew through trust, recommendations, repeat customers, and careful selection."],
  ["Women driven", "The boutique is shaped by women who understand comfort, occasion, fabric, and fit."],
  ["Exhibition roots", "Collections are selected with the same eye used for exhibitions: wearable, graceful, and limited."],
  ["No copy-paste fashion", "Pieces are chosen so customers do not feel like everyone else in the room."],
];

const galleryImages = [
  {
    src: "/aarna-redesign/service-curation.webp",
    alt: "Curated ethnic wear being prepared for boutique customers",
    title: "Curated by hand",
    text: "Fabric, fall and finishing are checked before a piece reaches the customer.",
  },
  {
    src: "/aarna-redesign/category-kurtis.webp",
    alt: "Kurti collection displayed for customers",
    title: "Everyday elegance",
    text: "Easy pieces for regular days, family gatherings and graceful office wear.",
  },
  {
    src: "/aarna-redesign/category-lehengas.webp",
    alt: "Lehenga collection for celebrations",
    title: "Celebration edits",
    text: "Festive styles selected for weddings, functions, pujas and special evenings.",
  },
  {
    src: "/aarna-redesign/category-suit-sets.webp",
    alt: "Suit sets arranged as a boutique collection",
    title: "Exhibition spirit",
    text: "Collections built to feel personal, limited and worth discovering in person.",
  },
];

export default function AboutPage() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX").replace(/\D/g, "");
  const appointmentMessage = encodeURIComponent(
    "Hi AARNA CREATIONS, I would like to book an appointment to visit the boutique. Please suggest a suitable timing."
  );

  return (
    <main>
      <section className="page-hero">
        <div className="section">
          <span className="eyebrow">Our story</span>
          <h1 className="page-title">A boutique built at home, carried by trust.</h1>
          <p>
            AARNA CREATIONS by Abha Maheshwari began with a simple belief: women should find ethnic wear that feels personal, comfortable, and different from the usual crowd.
          </p>
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
          <h1>Wear what feels like you.</h1>
          <p className="meta text-base leading-7">
            AARNA is a women-led home boutique where every piece is selected with patience. The focus is not on filling racks endlessly. The focus is on fabric, finishing, fitting guidance, and that quiet joy of finding something that feels made for your moment.
          </p>
          <p className="quote">
            &quot;A good outfit should not only look beautiful. It should make the woman wearing it feel sure of herself.&quot;
          </p>
          <div className="detail-panel">
            <h3>The promise</h3>
            <p>
              Limited selections, honest guidance, and a personal ordering experience. You browse online, shortlist what you like, and the final conversation happens directly with the boutique.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link className="btn-proto btn-primary-proto" href="/shop">
              Explore Collection
            </Link>
            <a
              className="btn-proto btn-outline-proto"
              href={"https://wa.me/" + whatsapp + "?text=" + appointmentMessage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Visit
            </a>
          </div>
        </div>
      </section>

      <section className="section story-values">
        {storyValues.map(([title, text]) => (
          <div className="story-value-card" key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-head story-gallery-head">
          <span className="eyebrow">Boutique journey</span>
          <h2>From exhibitions to a home boutique.</h2>
          <p>
            The journey has always been close to customers: showing collections, listening to preferences, understanding body comfort, and selecting pieces with intention.
          </p>
        </div>
        <div className="story-gallery">
          {galleryImages.map((image) => (
            <figure key={image.title} className="story-gallery-card">
              <Image src={image.src} alt={image.alt} width={520} height={640} sizes="(max-width: 720px) 82vw, 24vw" />
              <figcaption>
                <strong>{image.title}</strong>
                <span>{image.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="about-closing">
          <span className="eyebrow">AARNA CREATIONS</span>
          <h2>Chosen slowly. Worn beautifully.</h2>
          <p>Come for the outfit. Stay for the guidance, the fabric feel, and the confidence of being helped by someone who cares.</p>
          <Link className="btn-proto btn-primary-proto" href="/shop">
            Shop The Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
