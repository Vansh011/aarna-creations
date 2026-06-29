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
      <section className="relative overflow-hidden px-4 py-14 text-ivory sm:px-6 lg:px-8 lg:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/aarna-collection-festive-v3.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050403]/95 via-[#32100c]/82 to-[#211812]/34" />
        <div className="absolute inset-0 boutique-pattern opacity-20 mix-blend-soft-light" />
        <div className="relative mx-auto max-w-7xl">
          <p className="ornate-title text-gold-light">Shop the edit</p>
          <h1 className="mt-5 max-w-3xl font-serif text-[2.65rem] leading-[0.98] text-white md:text-[3.6rem]">
            Find the one piece nobody else will wear like you.
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-xl leading-7 text-ivory/86">
            Browse fresh ethnic wear drops, detailed sizing, and single-color boutique pieces curated by AARNA CREATIONS.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 grid gap-4 border-y border-gold/25 py-5 text-sm text-maroon/72 md:grid-cols-3">
          <p><span className="font-semibold text-[#8a1538]">Unique design:</span> no mass matching sets.</p>
          <p><span className="font-semibold text-[#8a1538]">Material-first:</span> fabric and fall matter.</p>
          <p><span className="font-semibold text-[#8a1538]">Fast moving:</span> limited items can sell within hours.</p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-36 border border-gold/25 bg-white/95 p-6 shadow-[0_24px_70px_rgba(78,19,37,0.09)]">
              <h2 className="font-serif text-2xl text-[#8a1538]">Filters</h2>
              <p className="mb-6 mt-2 text-sm leading-6 text-ink/58">Refine by fit, fabric, and occasion-ready category.</p>
              <ProductFiltersPanel products={products} priceRange={range} filters={filters} onChange={setFilters} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none lg:hidden"
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
              <div className="border border-gold/25 bg-white py-16 text-center shadow-sm">
                <p className="mb-4 text-maroon/70">No products match your filters.</p>
                <Button variant="outline" className="rounded-none" onClick={() => setFilters(defaultFilters)}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h2 className="font-serif text-2xl text-[#8a1538]">Filters</h2>
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
                  className="w-full rounded-none uppercase tracking-[0.16em]"
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
