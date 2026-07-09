import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-redesign">
      <div className="hero-content">
        <span className="hero-kicker">Est. home boutique</span>
        <h1 className="hero-title">
          AARNA CREATIONS <span className="hero-byline" style={{ fontSize: '3.2rem'}}>by Abha Maheshwari</span>
        </h1>
        <p className="hero-copy" style={{ fontSize: '1.6rem' }}>
          Choose what you Feel. Grace in Every Thread. Curated with Trust. 
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
