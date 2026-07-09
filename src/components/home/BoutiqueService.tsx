import Image from "next/image";

const points = [
  ["🪡 Quality checked", "Fabric and embroidery reviewed before dispatch."],
  ["📏 Size guidance", "Share measurements and get a practical fit suggestion."],
  ["✨ Limited pieces", "Curated drops, fewer repeats, more uniqueness."],
  ["💬 WhatsApp first", "Availability, payment, and delivery confirmed personally."],
];

export function BoutiqueService() {
  return (
    <section className="section">
      <div className="service-grid">
        <div className="service-photo">
          <Image
            src="/aarna-redesign/service-curation.webp"
            alt="Boutique hands arranging embroidered ethnic wear for dispatch"
            fill
            className="object-cover"
            sizes="(max-width: 720px) 100vw, 55vw"
          />
        </div>
        <div className="service-panel">
          <span className="eyebrow">Boutique service</span>
          <div className="section-head mb-0">
            <h2>Personal shopping, not random scrolling.</h2>
            <p>
              Every piece is checked for fabric, fall, finish, and comfort before it reaches you. The website helps you browse faster; Abha helps you choose better.
            </p>
          </div>
          <div className="service-points">
            {points.map(([title, text]) => (
              <div key={title} className="point">
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
