import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Grid from "@/components/grid";
import FilterListSkeleton from "@/components/layout/search/filter/filter-skeleton";
import NotFound from "@/components/layout/search/not-found";
import { getFilterAttributes, getMenu, getProducts } from "@/lib/bagisto";
import { isArray, isObject } from "@/lib/type-guards";
import Pagination from "@/components/elements/pagination";
import Breadcrumb from "@/components/layout/search/breadcrumb";
import FilterSidebar from "@/components/layout/search/filter-sidebar";
import SearchHeader from "@/components/layout/search/search-header";

const ProductGridItems = dynamic(
  () => import("@/components/layout/product-grid-items"),
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

  return (
    <>
      <Breadcrumb categoryTitle={categoryItem?.title || categorySlug} />

      <div className="flex gap-8">
        {/* Sidebar Filter */}
        <Suspense fallback={<FilterListSkeleton />}>
          <FilterSidebar filterAttributes={filterAttributes} />
        </Suspense>

        {/* Main Content */}
        <div className="flex-1">
          <SearchHeader sortOrders={sortOrders} totalResults={total} />

          {products.length === 0 ? (
            <NotFound
              msg={`There are no products that match Showing : ${categorySlug}`}
            />
          ) : (
            <>
              <Grid className="mb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ProductGridItems products={products} />
              </Grid>

              {isArray(products) && total > 12 ? (
                <nav
                  aria-label="Collection pagination"
                  className="mt-10 flex items-center justify-center"
                >
                  <Pagination
                    itemsPerPage={12}
                    itemsTotal={total}
                    currentPage={currentPage ? currentPage - 1 : 0}
                  />
                </nav>
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
}
