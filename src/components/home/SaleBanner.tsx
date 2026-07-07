import Link from "next/link";

export function SaleBanner() {
  return (
    <section className="section">
      <Link href="/shop" className="sale-banner" aria-label="Explore sale collection">
        <span className="sale-banner-kicker">Limited festive edit</span>
        <strong>CELEBRATION SALE</strong>
        <span>10%-30% off - Explore our collection</span>
      </Link>
    </section>
  );
}
