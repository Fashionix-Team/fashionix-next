"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem } from "@heroui/select";
import { createUrl } from "@/lib/utils";
import { SORT } from "@/lib/constants";

export type SortOrderTypes = {
  key: string;
  title: string;
  value: string;
  sort: string;
  order: string;
  position: string;
};

export default function SearchHeader({
  sortOrders,
  totalResults,
}: {
  sortOrders: SortOrderTypes[];
  totalResults: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  
  const sort = searchParams.get(SORT) || "name-asc";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (searchValue) {
      newParams.set("q", searchValue);
    } else {
      newParams.delete("q");
    }

    const newUrl = createUrl(pathname, newParams);
    startTransition(() => {
      router.replace(newUrl);
    });
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) newParams.set(SORT, value);
    const newUrl = createUrl(pathname, newParams);
    router.replace(newUrl);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search Box */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Cari apa yang kamu cari..."
          className="w-full rounded-md border border-gray-300 py-3 pl-4 pr-12 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
            Filter Aktif
          </button>
          <Select
            aria-label="Kemeja Wanita"
            placeholder="Kemeja Wanita"
            className="w-48"
            size="sm"
          >
            <SelectItem key="1">Kemeja Wanita</SelectItem>
            <SelectItem key="2">Kemeja Pria</SelectItem>
          </Select>
          <Select
            aria-label="Rating"
            placeholder="Rating"
            className="w-32"
            size="sm"
          >
            <SelectItem key="5">5 Bintang</SelectItem>
            <SelectItem key="4">4 Bintang</SelectItem>
            <SelectItem key="3">3 Bintang</SelectItem>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{totalResults.toLocaleString("id-ID")}</span> hasil ditampilkan
          </p>
          <Select
            aria-label="Sort by"
            selectedKeys={[sort]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              if (value) handleSortChange(value);
            }}
            className="w-48"
            size="sm"
          >
            {sortOrders?.map((order) => (
              <SelectItem key={order.value}>
                {order.title}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
