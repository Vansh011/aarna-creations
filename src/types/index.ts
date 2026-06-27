export type Category =
  | "Kurtis"
  | "Suit Sets"
  | "Lehengas"
  | "Sarees"
  | "Girls Wear"
  | "Festive Wear";

export type Occasion = "Casual" | "Festive" | "Wedding" | "Office";

export type Fabric =
  | "Cotton"
  | "Silk"
  | "Georgette"
  | "Chiffon"
  | "Rayon"
  | "Linen";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: Category;
  sizes: Size[];
  colors: string[];
  fabric: Fabric;
  occasion: Occasion;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  createdAt: string;
}

export interface CartItem {
  cartId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: Size;
  color: string;
  customization: string;
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "popular";

export interface ProductFilters {
  categories: Category[];
  sizes: Size[];
  colors: string[];
  fabrics: Fabric[];
  occasions: Occasion[];
  priceMin: number;
  priceMax: number;
}
