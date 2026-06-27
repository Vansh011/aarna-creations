"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products, priceRange } from "@/data/products";
import { filterProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFiltersPanel } from "@/components/shop/ProductFilters";
import { SortBar } from "@/components/shop/SortBar";
import { FilterChips } from "@/components/shop/FilterChips";
import { Button } from "@/components/ui/button";
import type { ProductFilters, SortOption, Category } from "@/types";

const defaultFilters: ProductFilters = {
  categories: [],
  sizes: [],
  colors: [],
  fabrics: [],
  occasions: [],
  priceMin: priceRange.min,
  priceMax: priceRange.max,
};

function ShopContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category");
    const sortParam = searchParams.get("sort") as SortOption | null;

    if (category) {
      setFilters((prev) => ({
        ...prev,
        categories: [decodeURIComponent(category) as Category],
      }));
    }
    if (sortParam) {
      setSort(sortParam);
    }
  }, [searchParams]);

  const filtered = filterProducts(products, filters, sort);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-maroon mb-2">
          Shop Collection
        </h1>
        <div className="gold-divider w-24 mb-3" />
        <p className="text-maroon/70">
          Browse our handcrafted ethnic wear for ladies and girls
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-lg p-6 shadow-sm border border-gold/10">
            <h2 className="font-serif text-lg text-maroon mb-4">Filters</h2>
            <ProductFiltersPanel filters={filters} onChange={setFilters} />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <FilterChips
            filters={filters}
            onChange={setFilters}
            defaultPriceMin={priceRange.min}
            defaultPriceMax={priceRange.max}
          />

          <SortBar sort={sort} onChange={setSort} count={filtered.length} />

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-maroon/70 mb-4">No products match your filters</p>
              <Button variant="outline" onClick={() => setFilters(defaultFilters)}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gold/20">
              <h2 className="font-serif text-lg text-maroon">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5 text-maroon" />
              </button>
            </div>
            <div className="p-4">
              <ProductFiltersPanel filters={filters} onChange={setFilters} />
            </div>
            <div className="p-4 border-t border-gold/20">
              <Button
                variant="gold"
                className="w-full"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {filtered.length} Products
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ShopPageClient() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-maroon">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
