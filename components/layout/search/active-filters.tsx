"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { SORT } from "@/lib/constants";
import { getFilterAttributeTypes } from "@/lib/bagisto/types";

interface ActiveFiltersProps {
  filterAttributes?: getFilterAttributeTypes[];
}

export default function ActiveFilters({ filterAttributes }: ActiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilters: Array<{ label: string; code: string; value: string }> = [];

  // Get all active filters
  filterAttributes?.forEach((filter) => {
    const value = searchParams.get(filter.code);
    if (value) {
      const filterIds = value.split(",");
      filterIds.forEach((id) => {
        const option = filter.options?.find((opt) => opt.id === id);
        if (option) {
          activeFilters.push({
            label: option.adminName,
            code: filter.code,
            value: id,
          });
        }
      });
    }
  });

  const removeFilter = (code: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentValue = newParams.get(code);
    
    if (currentValue) {
      const values = currentValue.split(",").filter((v) => v !== value);
      if (values.length > 0) {
        newParams.set(code, values.join(","));
      } else {
        newParams.delete(code);
      }
    }

    const sort = searchParams.get(SORT);
    if (sort) newParams.set(SORT, sort);

    const newUrl = createUrl(pathname, newParams);
    router.replace(newUrl, { scroll: false });
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        Filter Aktif:
      </span>
      {activeFilters.map((filter, index) => (
        <button
          key={index}
          onClick={() => removeFilter(filter.code, filter.value)}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {filter.label}
          <XMarkIcon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
