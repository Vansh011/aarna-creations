"use client";

import type { SortOption } from "@/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

interface SortBarProps {
  sort: SortOption;
  onChange: (sort: SortOption) => void;
  count: number;
}

export function SortBar({ sort, onChange, count }: SortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <p className="text-sm text-maroon/70">
        {count} {count === 1 ? "product" : "products"} found
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-maroon/70 whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="h-10 rounded-md border border-maroon/20 bg-white px-3 text-sm text-maroon focus:outline-none focus:ring-2 focus:ring-gold"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
