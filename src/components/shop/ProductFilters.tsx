"use client";

import {
  categories,
  fabrics,
  occasions,
  sizes,
  allColors,
  priceRange,
} from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";
import type { ProductFilters } from "@/types";

interface ProductFiltersProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gold/20 pb-5 mb-5 last:border-0">
      <h3 className="font-serif text-maroon text-sm uppercase tracking-wider mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ProductFiltersPanel({ filters, onChange }: ProductFiltersProps) {
  const toggleArrayItem = <T extends string>(
    key: keyof ProductFilters,
    value: T
  ) => {
    const current = filters[key] as T[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  return (
    <div className="space-y-1">
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-maroon/80">
              <Checkbox
                checked={filters.categories.includes(cat)}
                onCheckedChange={() => toggleArrayItem("categories", cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayItem("sizes", size)}
              className={`px-3 py-1.5 text-xs border rounded-md transition-colors ${
                filters.sizes.includes(size)
                  ? "bg-maroon text-white border-maroon"
                  : "border-maroon/30 text-maroon hover:border-maroon"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <Slider
          min={priceRange.min}
          max={priceRange.max}
          step={100}
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={([min, max]) =>
            onChange({ ...filters, priceMin: min, priceMax: max })
          }
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-maroon/70">
          <span>{formatPrice(filters.priceMin)}</span>
          <span>{formatPrice(filters.priceMax)}</span>
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {allColors.map((color) => (
            <label key={color} className="flex items-center gap-2 cursor-pointer text-sm text-maroon/80">
              <Checkbox
                checked={filters.colors.includes(color)}
                onCheckedChange={() => toggleArrayItem("colors", color)}
              />
              {color}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fabric">
        <div className="space-y-2">
          {fabrics.map((fabric) => (
            <label key={fabric} className="flex items-center gap-2 cursor-pointer text-sm text-maroon/80">
              <Checkbox
                checked={filters.fabrics.includes(fabric)}
                onCheckedChange={() => toggleArrayItem("fabrics", fabric)}
              />
              {fabric}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Occasion">
        <div className="space-y-2">
          {occasions.map((occ) => (
            <label key={occ} className="flex items-center gap-2 cursor-pointer text-sm text-maroon/80">
              <Checkbox
                checked={filters.occasions.includes(occ)}
                onCheckedChange={() => toggleArrayItem("occasions", occ)}
              />
              {occ}
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
