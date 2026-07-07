"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/products";
import { filterProducts, getPriceRange } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Category, Product, ProductFilters, SortOption } from "@/types";

interface ShopPageClientProps {
  products: Product[];
}

function ShopContent({ products }: ShopPageClientProps) {
  const searchParams = useSearchParams();
  const range = useMemo(() => getPriceRange(products), [products]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  useEffect(() => {
    const category = searchParams.get("category");
    const sortParam = searchParams.get("sort") as SortOption | null;

    if (category && categories.includes(category as Category)) {
      setActiveCategory(category as Category);
    }
    if (sortParam) setSort(sortParam);
  }, [searchParams]);

  const filters = useMemo<ProductFilters>(() => ({
    categories: activeCategory === "All" ? [] : [activeCategory],
    sizes: [],
    materials: [],
    priceMin: range.min,
    priceMax: range.max,
  }), [activeCategory, range.max, range.min]);

  const filtered = useMemo(() => {
    const categoryFiltered = filterProducts(products, filters, sort);
    const term = query.trim().toLowerCase();
    if (!term) return categoryFiltered;

    return categoryFiltered.filter((product) => [
      product.name,
      product.category,
      product.subcategory,
      product.color,
      product.fabricMaterial,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(term));
  }, [filters, products, query, sort]);

  return (
    <main>
      <section className="page-hero">
        <div className="section">
          <span className="eyebrow">Full collection</span>
          <h1 className="page-title">Boutique pieces that feel selected for you.</h1>
          <p>
            Use simple filters, then open any piece to see fabric, sizes, color, and WhatsApp-ready ordering. This page is designed for fast mobile browsing from Instagram traffic.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shop-layout">
          <aside className="filters">
            <input
              className="search-box"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search kurtis, sarees, festive..."
              aria-label="Search products"
            />
            <select
              className="select-box"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              aria-label="Sort products"
            >
              <option value="newest">Sort: New arrivals</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="popular">Best discount</option>
            </select>
            <div className="filter-row" aria-label="Category filters">
              <button
                className={activeCategory === "All" ? "filter-chip active" : "filter-chip"}
                onClick={() => setActiveCategory("All")}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "filter-chip active" : "filter-chip"}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="shop-note">
              Tip: Ask Abha on WhatsApp if you are between sizes. Boutique pieces often sell fast, so the order is confirmed manually.
            </div>
          </aside>

          <div>
            <p className="mb-3 text-sm font-bold text-[#735f58]">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} found
            </p>
            {filtered.length === 0 ? (
              <div className="summary-box py-12 text-center">
                <p className="text-[#735f58]">No products match your search.</p>
                <button className="btn-proto btn-outline-proto mx-auto mt-4" onClick={() => { setQuery(""); setActiveCategory("All"); }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="product-grid-proto">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ShopPageClient({ products }: ShopPageClientProps) {
  return (
    <Suspense fallback={<div className="section text-center text-maroon">Loading...</div>}>
      <ShopContent products={products} />
    </Suspense>
  );
}
