import type { Product, ProductFilters, SortOption } from "@/types";

export function getPriceRange(products: Product[]) {
  if (products.length === 0) return { min: 0, max: 0 };
  return {
    min: Math.min(...products.map((product) => product.discountedPrice)),
    max: Math.max(...products.map((product) => product.discountedPrice)),
  };
}

export function getMaterialOptions(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.fabricMaterial).filter(Boolean))].sort();
}

export function getSubcategoryOptions(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.subcategory).filter(Boolean) as string[])].sort();
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
  sort: SortOption
) {
  let result = products.filter((product) => {
    if (filters.categories.length && !filters.categories.includes(product.category)) {
      return false;
    }
    if (filters.sizes.length && !filters.sizes.some((size) => product.sizes.includes(size))) {
      return false;
    }
    if (filters.materials.length && !filters.materials.includes(product.fabricMaterial)) {
      return false;
    }
    if (product.discountedPrice < filters.priceMin || product.discountedPrice > filters.priceMax) {
      return false;
    }
    return true;
  });

  switch (sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.discountedPrice - b.discountedPrice);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.discountedPrice - a.discountedPrice);
      break;
    case "popular":
      result = [...result].sort((a, b) => {
        const discountA = a.mainPrice > 0 ? (a.mainPrice - a.discountedPrice) / a.mainPrice : 0;
        const discountB = b.mainPrice > 0 ? (b.mainPrice - b.discountedPrice) / b.mainPrice : 0;
        return discountB - discountA;
      });
      break;
    case "newest":
    default:
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return result;
}
