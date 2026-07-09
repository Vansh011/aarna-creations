import Image from "next/image";
import Link from "next/link";

export function SaleBanner() {
  return (
    <section className="section">
      <Link href="/shop" className="sale-banner" aria-label="Shop the celebration sale collection">
        <Image
          src="/aarna-redesign/celebration-sale.png"
          alt="Celebration sale, 10 percent to 30 percent off ethnic wear. Shop now."
          width={1734}
          height={907}
          sizes="(max-width: 720px) 100vw, 1120px"
        />
      </Link>
    </section>
  );
}
