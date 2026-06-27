import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function filterProducts(
  products: import("@/types").Product[],
  filters: import("@/types").ProductFilters,
  sort: import("@/types").SortOption
) {
  let result = products.filter((product) => {
    if (filters.categories.length && !filters.categories.includes(product.category)) {
      return false;
    }
    if (filters.sizes.length && !filters.sizes.some((s) => product.sizes.includes(s))) {
      return false;
    }
    if (filters.colors.length && !filters.colors.some((c) => product.colors.includes(c))) {
      return false;
    }
    if (filters.fabrics.length && !filters.fabrics.includes(product.fabric)) {
      return false;
    }
    if (filters.occasions.length && !filters.occasions.includes(product.occasion)) {
      return false;
    }
    if (product.price < filters.priceMin || product.price > filters.priceMax) {
      return false;
    }
    return true;
  });

  switch (sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "popular":
      result = [...result].sort(
        (a, b) => Number(b.isPopular ?? false) - Number(a.isPopular ?? false)
      );
      break;
    case "newest":
    default:
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return result;
}
