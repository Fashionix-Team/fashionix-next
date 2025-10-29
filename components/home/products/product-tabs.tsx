"use client";

import { useMemo, useState } from "react";
import type { TabId, Product } from "@/types/product";
import { TABS } from "@/data/products";
import { cn } from "@heroui/react";

export default function ProductsTabs({ products, renderGrid }: {
  products: Product[];
  renderGrid: (list: Product[]) => React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const filtered = useMemo(() => {
    const next = products.filter((p) => p.categories.includes(activeTab));
    return next.length ? next : products;
  }, [activeTab, products]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold leading-8 text-gray-900">Featured Products</h2>

        <nav className="flex flex-wrap items-center justify-center gap-1 md:justify-end">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-semibold transition",
                  "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:bg-orange-400 after:content-[''] after:transition-all after:duration-300",
                  isActive
                    ? "text-gray-900 after:w-full after:opacity-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 after:w-0 after:opacity-0",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="md:ml-3">
          <a
            href="#"
            className="relative inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-orange-400 after:content-[''] after:transition-all after:duration-300 hover:text-orange-500 hover:after:w-full"
          >
            Browse All Product
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.125 10H16.875" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {renderGrid(filtered)}
    </div>
  );
}
