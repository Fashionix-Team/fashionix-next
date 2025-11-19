"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFilterAttributeTypes } from "@/lib/bagisto/types";
import { PAGE, QUERY, SORT } from "@/lib/constants";
import { isArray } from "@/lib/type-guards";
import { createUrl } from "@/lib/utils";
import { useMemo, useState, useTransition } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import CustomRadio from "./custom-radio";

interface FilterSidebarProps {
  filterAttributes: getFilterAttributeTypes[];
}

function FilterSection({
  filter,
  title,
}: {
  filter: getFilterAttributeTypes;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const currentParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const selectedFilters = useMemo(
    () => new Set(currentParams.get(filter.code)?.split(",") ?? []),
    [filter.code, currentParams]
  );

  const handleFilterToggle = (filterId: string) => {
    const code = filter.code;
    const newSelected = new Set(selectedFilters);

    if (newSelected.has(filterId)) {
      newSelected.delete(filterId);
    } else {
      newSelected.add(filterId);
    }

    const newParams = new URLSearchParams(currentParams.toString());

    if (newSelected.size > 0) {
      newParams.set(code, Array.from(newSelected).join(","));
    } else {
      newParams.delete(code);
    }

    const sort = currentParams.get(SORT);
    if (sort) newParams.set(SORT, sort);

    const newUrl = createUrl(pathname, newParams);
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {filter.options?.map((option) => {
            const isSelected = selectedFilters.has(option.id);
            return (
              <label
                key={option.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleFilterToggle(option.id)}
                  disabled={isPending}
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.adminName}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PriceRangeFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedRange, setSelectedRange] = useState<string>("");

  const priceRanges = [
    { label: "Semua Harga", value: "all", min: 0, max: 1000000 },
    { label: "Under Rp. 20.000", value: "0-20000", min: 0, max: 20000 },
    { label: "Rp. 20.000 - Rp. 75.000", value: "20000-75000", min: 20000, max: 75000 },
    { label: "Rp. 75.000 - Rp. 100.000", value: "75000-100000", min: 75000, max: 100000 },
    { label: "Rp. 100.000 - Rp. 200.000", value: "100000-200000", min: 100000, max: 200000 },
    { label: "Rp. 200.000 - Rp. 500.000", value: "200000-500000", min: 200000, max: 500000 },
    { label: "Rp. 500.000 - Rp. 1.000.000", value: "500000-1000000", min: 500000, max: 1000000 },
  ];

  const handleRangeSelect = (range: typeof priceRanges[0]) => {
    setSelectedRange(range.value);
    setMinPrice(range.min);
    setMaxPrice(range.max);
    
    // Apply filter to URL
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (range.value === "all") {
      newParams.delete("price_min");
      newParams.delete("price_max");
    } else {
      newParams.set("price_min", range.min.toString());
      newParams.set("price_max", range.max.toString());
    }
    
    const sort = searchParams.get(SORT);
    if (sort) newParams.set(SORT, sort);
    
    const newUrl = createUrl(pathname, newParams);
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const handleSliderChange = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (minPrice === 0 && maxPrice === 1000000) {
      newParams.delete("price_min");
      newParams.delete("price_max");
    } else {
      newParams.set("price_min", minPrice.toString());
      newParams.set("price_max", maxPrice.toString());
    }
    
    const sort = searchParams.get(SORT);
    if (sort) newParams.set(SORT, sort);
    
    const newUrl = createUrl(pathname, newParams);
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
      {/* Input Fields */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Harga Minimum"
            value={minPrice > 0 ? formatPrice(minPrice) : ""}
            readOnly
            className="w-1/2 px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
          />
          <input
            type="text"
            placeholder="Harga Maksimum"
            value={maxPrice < 1000000 ? formatPrice(maxPrice) : ""}
            readOnly
            className="w-1/2 px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
          />
        </div>

        {/* Dual Range Slider */}
        <div className="relative h-6 mb-6">
          {/* Track Background */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          
          {/* Active Track */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 bg-orange-500 rounded-full"
            style={{
              left: `${(minPrice / 1000000) * 100}%`,
              right: `${100 - (maxPrice / 1000000) * 100}%`,
            }}
          ></div>
          
          {/* Min Range Input */}
          <input
            type="range"
            min="0"
            max="1000000"
            step="5000"
            value={minPrice}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value < maxPrice - 10000) {
                setMinPrice(value);
                setSelectedRange("");
              }
            }}
            onMouseUp={handleSliderChange}
            onTouchEnd={handleSliderChange}
            className="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
          />
          
          {/* Max Range Input */}
          <input
            type="range"
            min="0"
            max="1000000"
            step="5000"
            value={maxPrice}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > minPrice + 10000) {
                setMaxPrice(value);
                setSelectedRange("");
              }
            }}
            onMouseUp={handleSliderChange}
            onTouchEnd={handleSliderChange}
            className="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
          />
        </div>
      </div>

      {/* Radio Button Price Ranges */}
      <div className="space-y-3">
        {priceRanges.map((range) => (
          <label
            key={range.value}
            className="flex items-center gap-3 cursor-pointer group py-0.5"
          >
            <CustomRadio
              name="priceRange"
              value={range.value}
              checked={selectedRange === range.value}
              onChange={() => handleRangeSelect(range)}
              disabled={isPending}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors select-none">
              {range.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FilterSidebar({ filterAttributes }: FilterSidebarProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentParams = useSearchParams();
  const currentPage = currentParams.get(PAGE) || "1";
  const sort = currentParams.get(SORT) || "name-asc";
  const query = currentParams.get(QUERY) || "";

  const handleClearAll = () => {
    const newUrl = createUrl(
      pathname,
      new URLSearchParams({
        ...(sort && { [SORT]: sort }),
        ...(Number(currentPage) > 1 && { [PAGE]: currentPage.toString() }),
        ...(query && { [QUERY]: query }),
      })
    );
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filterAttributes?.some((filter) => {
      const value = currentParams.get(filter.code);
      return value && value.length > 0;
    });
  }, [filterAttributes, currentParams]);

  return (
    <aside className="hidden md:block w-64 flex-shrink-0">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            Rentang Harga
          </h2>
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              disabled={isPending}
              className="text-xs text-orange-500 hover:text-orange-600 underline"
            >
              Reset
            </button>
          )}
        </div>

        {/* Price Range Filter */}
        <PriceRangeFilter />

        {/* Dynamic Filter Sections */}
        <div className="space-y-1 mt-6">
          {filterAttributes?.map((filter) => {
            const hasOptions = isArray(filter.options);
            return hasOptions ? (
              <FilterSection
                key={filter.id}
                filter={filter}
                title={filter.adminName}
              />
            ) : null;
          })}
        </div>
      </div>
    </aside>
  );
}
