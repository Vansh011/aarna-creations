import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "Kurtis",
    subtitle: "Everyday comfort with boutique detail",
    href: "/shop?category=Kurtis",
    image: "/aarna-redesign/category-kurtis.webp",
    large: true,
  },
  {
    name: "Suit Sets",
    subtitle: "Ready sets for work and family plans",
    href: "/shop?category=Suit+Sets",
    image: "/aarna-redesign/category-suit-sets.webp",
  },
  {
    name: "Lehengas",
    subtitle: "Festive pieces with presence",
    href: "/shop?category=Lehengas",
    image: "/aarna-redesign/category-lehengas.webp",
  },
  {
    name: "Sarees",
    subtitle: "Texture, borders, and heritage drapes",
    href: "/shop?category=Sarees",
    image: "/aarna-redesign/category-sarees.webp",
  },
  {
    name: "Girls Wear",
    subtitle: "Festive looks for little occasions",
    href: "/shop?category=Girls+Wear",
    image: "/aarna-redesign/category-girls.webp",
  },
];

export function FeaturedCollections() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Shop by category</span>
        <h2>Choose by occasion, not confusion.</h2>
        <p>Quick mobile-first cards help customers jump straight into the style they came for.</p>
      </div>
      <div className="category-grid">
        {collections.map((collection) => (
          <Link
            key={collection.name}
            href={collection.href}
            className={collection.large ? "category-card large" : "category-card"}
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover"
              sizes={collection.large ? "(max-width: 720px) 100vw, 40vw" : "(max-width: 720px) 50vw, 20vw"}
            />
            <span className="category-label">
              <strong>{collection.name}</strong>
              <span>{collection.subtitle}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
