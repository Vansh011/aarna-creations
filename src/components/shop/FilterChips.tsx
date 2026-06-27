"use client";

import { X } from "lucide-react";
import type { ProductFilters } from "@/types";

interface FilterChipsProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  defaultPriceMin: number;
  defaultPriceMax: number;
}

export function FilterChips({ filters, onChange, defaultPriceMin, defaultPriceMax }: FilterChipsProps) {
  const chips: { label: string; remove: () => void }[] = [];

  filters.categories.forEach((cat) => chips.push({
    label: cat,
    remove: () => onChange({ ...filters, categories: filters.categories.filter((c) => c !== cat) }),
  }));

  filters.sizes.forEach((size) => chips.push({
    label: "Size: " + size,
    remove: () => onChange({ ...filters, sizes: filters.sizes.filter((s) => s !== size) }),
  }));

  filters.materials.forEach((material) => chips.push({
    label: material,
    remove: () => onChange({ ...filters, materials: filters.materials.filter((m) => m !== material) }),
  }));

  if (filters.priceMin > defaultPriceMin || filters.priceMax < defaultPriceMax) {
    chips.push({
      label: "Rs " + filters.priceMin + " - Rs " + filters.priceMax,
      remove: () => onChange({ ...filters, priceMin: defaultPriceMin, priceMax: defaultPriceMax }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={chip.remove}
          className="inline-flex items-center gap-1.5 rounded-full bg-maroon/10 px-3 py-1 text-xs text-maroon transition-colors hover:bg-maroon/20"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        onClick={() => onChange({ categories: [], sizes: [], materials: [], priceMin: defaultPriceMin, priceMax: defaultPriceMax })}
        className="text-xs text-maroon/60 underline hover:text-maroon"
      >
        Clear all
      </button>
    </div>
  );
}
