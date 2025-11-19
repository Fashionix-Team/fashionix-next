"use client";

import SortOrder, { SortOrderTypes } from "./filter/sort-order";

interface SearchHeaderProps {
  categoryName?: string;
  totalResults: number;
  sortOrders: SortOrderTypes[];
  filterAttributes?: any;
}

export default function SearchHeader({
  categoryName,
  totalResults,
  sortOrders,
}: SearchHeaderProps) {
  return (
    <div className="mb-6">
      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">{totalResults}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Hasil ditemukan</span>
        </div>

        {/* Sort Order - Desktop only */}
        <div className="hidden md:flex items-center gap-2">
          <SortOrder sortOrders={sortOrders} title="Urutkan" />
        </div>
      </div>
    </div>
  );
}
