"use client";

import { categories, sizes } from "@/data/products";
import { getMaterialOptions } from "@/lib/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductFilters } from "@/types";

interface ProductFiltersProps {
  products: Product[];
  priceRange: { min: number; max: number };
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 border-b border-gold/20 pb-5 last:border-0">
      <h3 className="mb-3 font-serif text-sm uppercase tracking-wider text-maroon">{title}</h3>
      {children}
    </div>
  );
}

export function ProductFiltersPanel({ products, priceRange, filters, onChange }: ProductFiltersProps) {
  const materialOptions = getMaterialOptions(products);

  const toggleArrayItem = <T extends string>(key: keyof ProductFilters, value: T) => {
    const current = filters[key] as T[];
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  return (
    <div className="space-y-1">
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm text-maroon/80">
              <Checkbox checked={filters.categories.includes(cat)} onCheckedChange={() => toggleArrayItem("categories", cat)} />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleArrayItem("sizes", size)}
                className={[
                  "rounded-md border px-3 py-1.5 text-xs transition-colors",
                  active ? "border-maroon bg-maroon text-white" : "border-maroon/30 text-maroon hover:border-maroon",
                ].join(" ")}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <Slider
          min={priceRange.min}
          max={Math.max(priceRange.max, 1)}
          step={100}
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={([min, max]) => onChange({ ...filters, priceMin: min, priceMax: max })}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-maroon/70">
          <span>{formatPrice(filters.priceMin)}</span>
          <span>{formatPrice(filters.priceMax)}</span>
        </div>
      </FilterSection>

      {materialOptions.length > 0 && (
        <FilterSection title="Fabric / Material">
          <div className="space-y-2">
            {materialOptions.map((material) => (
              <label key={material} className="flex cursor-pointer items-center gap-2 text-sm text-maroon/80">
                <Checkbox checked={filters.materials.includes(material)} onCheckedChange={() => toggleArrayItem("materials", material)} />
                {material}
              </label>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
}
