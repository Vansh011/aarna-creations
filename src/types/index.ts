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

export type Size =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "3XL"
  | "4XL"
  | "5XL"
  | "Free Size"
  | "Oversized";

export interface Product {
  id: string;
  slug: string;
  name: string;
  discountedPrice: number;
  mainPrice: number;
  images: string[];
  imagePublicIds?: string[];
  category: Category;
  subcategory?: string;
  sizes: Size[];
  color: string;
  fabricMaterial: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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
  materials: string[];
  priceMin: number;
  priceMax: number;
}

export interface ProductCatalog {
  products: Product[];
  updatedAt: string;
}

export interface SoldProductLogEntry {
  id: string;
  name: string;
  discountedPrice: number;
  mainPrice: number;
  category: Category;
  soldAt: string;
}
