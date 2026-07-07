import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-redesign">
      <div className="hero-content">
        <span className="hero-kicker">Est. home boutique</span>
        <h1 className="hero-title">
          AARNA CREATIONS <span className="hero-byline">by Abha Maheshwari</span>
        </h1>
        <p className="hero-copy">
          Handpicked ethnic wear with a personal boutique touch. Browse the collection, ask for size guidance, and confirm your order directly on WhatsApp.
        </p>
        <div className="hero-actions">
          <Link className="btn-proto btn-primary-proto" href="/shop?sort=newest">
            Shop New Arrivals
          </Link>
          <Link className="btn-proto btn-ghost-proto" href="#collections">
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
