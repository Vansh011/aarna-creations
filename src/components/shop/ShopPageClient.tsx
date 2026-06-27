"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { filterProducts, getPriceRange } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFiltersPanel } from "@/components/shop/ProductFilters";
import { SortBar } from "@/components/shop/SortBar";
import { FilterChips } from "@/components/shop/FilterChips";
import { Button } from "@/components/ui/button";
import type { Product, ProductFilters, SortOption, Category } from "@/types";

interface ShopPageClientProps {
  products: Product[];
}

function ShopContent({ products }: ShopPageClientProps) {
  const searchParams = useSearchParams();
  const range = useMemo(() => getPriceRange(products), [products]);
  const defaultFilters = useMemo<ProductFilters>(() => ({
    categories: [],
    sizes: [],
    materials: [],
    priceMin: range.min,
    priceMax: range.max,
  }), [range.min, range.max]);
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

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
    <div className="bg-ivory">
      <section className="relative overflow-hidden bg-maroon py-14 text-ivory">
        <div className="absolute inset-0 boutique-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.28),transparent_32rem)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Limited pieces, handpicked daily</p>
          <h1 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">Shop Collection</h1>
          <p className="mt-4 max-w-2xl text-ivory/78">
            Browse fresh ethnic wear drops, detailed sizing, and one-of-one colorways curated by AARNA CREATIONS.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-lg border border-gold/20 bg-white/92 p-6 shadow-[0_20px_60px_rgba(90,21,41,0.08)]">
              <h2 className="font-serif text-lg text-maroon">Filters</h2>
              <p className="mb-5 mt-1 text-xs text-maroon/55">Refine by fit, fabric, and occasion-ready category.</p>
              <ProductFiltersPanel products={products} priceRange={range} filters={filters} onChange={setFilters} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-3">
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
              defaultPriceMin={range.min}
              defaultPriceMax={range.max}
            />

            <SortBar sort={sort} onChange={setSort} count={filtered.length} />

            {filtered.length === 0 ? (
              <div className="rounded-lg border border-gold/20 bg-white py-16 text-center shadow-sm">
                <p className="mb-4 text-maroon/70">No products match your filters</p>
                <Button variant="outline" onClick={() => setFilters(defaultFilters)}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
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
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute bottom-0 right-0 top-0 w-80 max-w-full overflow-y-auto bg-ivory shadow-2xl">
              <div className="flex items-center justify-between border-b border-gold/20 p-4">
                <div>
                  <h2 className="font-serif text-lg text-maroon">Filters</h2>
                  <p className="text-xs text-maroon/55">Find the perfect piece.</p>
                </div>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <X className="h-5 w-5 text-maroon" />
                </button>
              </div>
              <div className="p-4">
                <ProductFiltersPanel products={products} priceRange={range} filters={filters} onChange={setFilters} />
              </div>
              <div className="sticky bottom-0 border-t border-gold/20 bg-ivory p-4">
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
    </div>
  );
}

export function ShopPageClient({ products }: ShopPageClientProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-maroon">Loading...</div>}>
      <ShopContent products={products} />
    </Suspense>
  );
}
