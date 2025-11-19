import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Grid from "@/components/grid";
import FilterListSkeleton, {
  SortOrderSkeleton,
} from "@/components/layout/search/filter/filter-skeleton";
import NotFound from "@/components/layout/search/not-found";
import { getFilterAttributes, getMenu, getProducts } from "@/lib/bagisto";
import { isArray, isObject } from "@/lib/type-guards";
import MobileFilter from "@/components/layout/search/filter/modile-filter";
import CategoryDetail from "@/components/layout/search/category-detail.tsx";
import Pagination from "@/components/elements/pagination";
import Breadcrumb from "@/components/layout/search/breadcrumb";
import FilterSidebar from "@/components/layout/search/filter/sidebar";
import SearchHeader from "@/components/layout/search/search-header";
import SearchField from "@/components/layout/search/search-field";
import ActiveFilters from "@/components/layout/search/active-filters";
const ProductGridItems = dynamic(
  () => import("@/components/layout/product-grid-items-compact"),
  {
    ssr: true,
  }
);
const FilterList = dynamic(() => import("@/components/layout/search/filter"), {
  ssr: true,
});
const SortOrder = dynamic(
  () => import("@/components/layout/search/filter/sort-order"),
  {
    ssr: true,
  }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: categorySlug } = await params;
  const collections = await getMenu("catalog");
  const categoryItem = collections.find(
    (item) => item.path == `/search/${categorySlug}`
  );

  if (!isObject(categoryItem)) return notFound();

  return {
    title: categoryItem?.metaTitle || categoryItem?.title,
    description:
      categoryItem?.metaDescription ||
      categoryItem?.description ||
      `${categoryItem?.title} products`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection: categorySlug } = await params;
  const collections = await getMenu("catalog");

  const categoryItem = collections.find(
    (item) => item.path == `/search/${categorySlug}`
  );
  const categoryId = categoryItem?.id || "";

  const { sort: sortKey = "name-desc", ...rest } = (await searchParams) as {
    [key: string]: string;
  };
  const filters = Object.entries(rest).map(([key, value]) => ({
    key,
    value,
  }));

  const data = await getProducts({
    categoryId,
    sortKey,
    filters,
    tag: categorySlug,
  });

  const productAttributes = await getFilterAttributes({
    categorySlug: categorySlug,
  });
  const sortOrders = productAttributes?.sortOrders;
  const filterAttributes = productAttributes?.filterAttributes;
  const products = data?.products;
  const paginatorInfo = data?.paginatorInfo;
  const { total, currentPage } = paginatorInfo;

  // Check if products array is valid and has items
  const hasProducts = isArray(products) && products.length > 0;
  const actualTotal = hasProducts ? total : 0;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Semua Kategori", href: "/search" },
          { label: categoryItem?.title || categorySlug },
        ]}
      />

      {/* Mobile Filter */}
      <div className="flex items-center justify-between gap-4 mb-6 md:hidden">
        <MobileFilter filterAttributes={filterAttributes} />
        <Suspense fallback={<SortOrderSkeleton />}>
          <div className="flex-1 max-w-[200px]">
            <SortOrder sortOrders={sortOrders} title="Urutkan" />
          </div>
        </Suspense>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Sidebar Filter - Desktop */}
        <Suspense fallback={<div className="hidden md:block w-64 animate-pulse bg-gray-200 rounded-lg h-96" />}>
          <FilterSidebar filterAttributes={filterAttributes} />
        </Suspense>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search Field */}
          <SearchField />

          {/* Active Filters */}
          <ActiveFilters filterAttributes={filterAttributes} />

          {/* Search Header with results count and sort */}
          <SearchHeader
            categoryName={categoryItem?.title || categorySlug}
            totalResults={actualTotal}
            sortOrders={sortOrders}
            filterAttributes={filterAttributes}
          />

          {/* Products Grid */}
          {!hasProducts ? (
            <NotFound
              msg={`There are no products that match Showing : ${categorySlug}`}
            />
          ) : (
            <Grid className="mb-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <ProductGridItems products={products} />
            </Grid>
          )}

          {/* Pagination */}
          {hasProducts && total > 12 ? (
            <nav
              aria-label="Collection pagination"
              className="mt-10 block items-center sm:flex"
            >
              <Pagination
                itemsPerPage={12}
                itemsTotal={total}
                currentPage={currentPage ? currentPage - 1 : 0}
              />
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
}
