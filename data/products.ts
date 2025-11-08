import type { Product, TabId } from "@/types";

export const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Semua Produk" },
  { id: "women", label: "Fashion Wanita" },
  { id: "men", label: "Fashion Pria" },
  { id: "accessories", label: "Aksesori" },
  { id: "footwear", label: "Sepatu" },
];

export const BADGE_STYLES: Record<NonNullable<Product["badge"]>["variant"], string> = {
  secondary: "bg-gray-900 text-white",
  danger: "bg-red-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-amber-400 text-gray-900",
};

// PRODUCTS1 & PRODUCTS2 data have been removed - now using real data from Bagisto GraphQL API
// See components/home/section/products-01.tsx and products-02.tsx for the implementation
