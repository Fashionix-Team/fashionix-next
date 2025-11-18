"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { getFilterAttributeTypes } from "@/lib/bagisto/types";
import { SORT } from "@/lib/constants";
import { createUrl } from "@/lib/utils";

export default function FilterSidebar({
  filterAttributes,
}: {
  filterAttributes: any;
}) {
  const currentParams = useSearchParams();
  const sort = currentParams.get(SORT) || "name-asc";
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // State untuk rentang harga
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  const applyPriceFilter = () => {
    const newParams = new URLSearchParams(currentParams.toString());
    newParams.set("price_min", minPrice.toString());
    newParams.set("price_max", maxPrice.toString());
    if (sort) newParams.set(SORT, sort);

    const newUrl = createUrl(pathname, newParams);
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const handleFilterChange = (code: string, selectedValues: string[]) => {
    const newParams = new URLSearchParams(currentParams.toString());

    if (selectedValues.length > 0) {
      newParams.set(code, selectedValues.join(","));
    } else {
      newParams.delete(code);
    }

    if (sort) newParams.set(SORT, sort);

    const newUrl = createUrl(pathname, newParams);
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const formatPrice = (value: number) => {
    return `Rp. ${value.toLocaleString("id-ID")}`;
  };

  return (
    <aside className="w-64 shrink-0 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold">RENTANG HARGA</h2>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span>Harga Minimum</span>
          <span>Harga Maksimum</span>
        </div>
        
        {/* Min Price Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="text-sm font-medium">{formatPrice(minPrice)}</div>
        </div>

        {/* Max Price Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="text-sm font-medium">{formatPrice(maxPrice)}</div>
        </div>

        <button
          onClick={applyPriceFilter}
          disabled={isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Terapkan
        </button>
      </div>

      {/* Filter Attributes */}
      {filterAttributes?.map((filter: getFilterAttributeTypes) => {
        const selectedFilters = new Set(
          currentParams.get(filter.code)?.split(",") ?? []
        );

        return (
          <div key={filter.code} className="space-y-3 border-t pt-4">
            <h3 className="font-semibold uppercase">{filter.adminName}</h3>
            <CheckboxGroup
              value={Array.from(selectedFilters)}
              onValueChange={(values) =>
                handleFilterChange(filter.code, values as string[])
              }
            >
              {filter.options?.map((option) => (
                <Checkbox key={option.id} value={option.id}>
                  {option.adminName}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        );
      })}
    </aside>
  );
}
