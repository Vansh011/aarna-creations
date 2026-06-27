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

  filters.categories.forEach((cat) =>
    chips.push({
      label: cat,
      remove: () =>
        onChange({
          ...filters,
          categories: filters.categories.filter((c) => c !== cat),
        }),
    })
  );

  filters.sizes.forEach((size) =>
    chips.push({
      label: `Size: ${size}`,
      remove: () =>
        onChange({
          ...filters,
          sizes: filters.sizes.filter((s) => s !== size),
        }),
    })
  );

  filters.colors.forEach((color) =>
    chips.push({
      label: color,
      remove: () =>
        onChange({
          ...filters,
          colors: filters.colors.filter((c) => c !== color),
        }),
    })
  );

  filters.fabrics.forEach((fabric) =>
    chips.push({
      label: fabric,
      remove: () =>
        onChange({
          ...filters,
          fabrics: filters.fabrics.filter((f) => f !== fabric),
        }),
    })
  );

  filters.occasions.forEach((occ) =>
    chips.push({
      label: occ,
      remove: () =>
        onChange({
          ...filters,
          occasions: filters.occasions.filter((o) => o !== occ),
        }),
    })
  );

  if (filters.priceMin > defaultPriceMin || filters.priceMax < defaultPriceMax) {
    chips.push({
      label: `₹${filters.priceMin} – ₹${filters.priceMax}`,
      remove: () =>
        onChange({ ...filters, priceMin: defaultPriceMin, priceMax: defaultPriceMax }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={chip.remove}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon/10 text-maroon text-xs rounded-full hover:bg-maroon/20 transition-colors"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        onClick={() =>
          onChange({
            categories: [],
            sizes: [],
            colors: [],
            fabrics: [],
            occasions: [],
            priceMin: defaultPriceMin,
            priceMax: defaultPriceMax,
          })
        }
        className="text-xs text-maroon/60 hover:text-maroon underline"
      >
        Clear all
      </button>
    </div>
  );
}
