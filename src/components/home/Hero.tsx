import Link from "next/link";

const trustItems = [
  ["🚚", "24-hour dispatch", "Fast packing for ready pieces."],
  ["↩", "Easy returns help", "Guidance for size or quality issues."],
  ["📱", "Instant in-store feel", "Ask on WhatsApp before buying."],
  ["🧵", "Custom fitting", "Measurement help before order."],
];

export function Hero() {
  return (
    <>
      <section className="hero-redesign">
        <div className="hero-content">
          <span className="hero-kicker">Live boutique sale</span>
          <h1 className="hero-title">
            AARNA CREATIONS <span className="hero-byline">by Abha Maheshwari</span>
          </h1>
          <p className="hero-copy">
            Handpicked ethnic wear with a personal boutique touch. Browse the collection, ask for size guidance, and confirm your order directly on WhatsApp.
          </p>
          <div className="hero-actions">
            <Link className="btn-proto btn-primary-proto" href="/shop">
              Shop Collection
            </Link>
            <Link className="btn-proto btn-ghost-proto" href="/checkout">
              Order on WhatsApp
            </Link>
          </div>
          <div className="sale-card">
            <strong>10% off first website order</strong>
            <span>Use the site to shortlist your outfit and mention FIRSTAARNA on WhatsApp before confirming.</span>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="trust-strip">
          {trustItems.map(([icon, title, text]) => (
            <div key={title} className="trust-item">
              <span className="trust-icon">{icon}</span>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
