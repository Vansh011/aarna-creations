import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "fallback-1",
    slug: "aarna-signature-kurti-set",
    name: "AARNA Signature Kurti Set",
    discountedPrice: 1799,
    mainPrice: 2599,
    images: [
      "/aarna-collection-kurtis-v3.png",
      "/aarna-collection-everyday-v3.png",
      "/aarna-material-usp-v3.png",
    ],
    category: "Kurtis",
    subcategory: "Festive",
    sizes: ["S", "M", "L", "XL"],
    color: "Maroon, gold work",
    fabricMaterial: "Cotton silk",
    description: "A boutique sample piece for AARNA CREATIONS, selected for graceful fall, festive detailing, and easy ethnic styling.",
    createdAt: "2026-06-29T00:00:00.000Z",
    updatedAt: "2026-06-29T00:00:00.000Z",
  },
];

export const categories = [
  "Kurtis",
  "Suit Sets",
  "Lehengas",
  "Sarees",
  "Girls Wear",
  "Festive Wear",
] as const;

export const fabrics = [
  "Cotton",
  "Silk",
  "Georgette",
  "Chiffon",
  "Rayon",
  "Linen",
] as const;

export const occasions = ["Casual", "Festive", "Wedding", "Office"] as const;

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "Free Size", "Oversized"] as const;

export const allColors = [
  ...new Set(products.map((product) => product.color)),
].sort();

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);
}

export function getNewArrivals(): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);
}

export const priceRange = {
  min: Math.min(...products.map((product) => product.discountedPrice)),
  max: Math.max(...products.map((product) => product.discountedPrice)),
};
