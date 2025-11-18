import dynamic from "next/dynamic";
import { Suspense } from "react";
import Grid from "@/components/grid";
import FilterListSkeleton from "@/components/layout/search/filter/filter-skeleton";
import NotFound from "@/components/layout/search/not-found";
import { getFilterAttributes, getProducts } from "@/lib/bagisto";
import { isArray } from "@/lib/type-guards";
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

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    sort: sortKey = "name-desc",
    q: searchValue,
    ...rest
  } = (await searchParams) as { [key: string]: string };

  const filters = Object.entries(rest).map(([key, value]) => ({
    key,
    value,
  }));

  const data = await getProducts({
    sortKey,
    query: searchValue,
    filters,
    tag: "search",
  });

  const productAttributes = await getFilterAttributes({ categorySlug: "" });
  const sortOrders = productAttributes?.sortOrders;
  const filterAttributes = productAttributes?.filterAttributes;
  const products = data?.products || [];
  const paginatorInfo = data?.paginatorInfo;
  const { total, currentPage } = paginatorInfo;

  return (
    <>
      <Breadcrumb categoryTitle={searchValue || "Kemeja"} />

      <div className="flex gap-8">
        {/* Sidebar Filter */}
        <Suspense fallback={<FilterListSkeleton />}>
          <FilterSidebar filterAttributes={filterAttributes} />
        </Suspense>

        {/* Main Content */}
        <div className="flex-1">
          <SearchHeader sortOrders={sortOrders} totalResults={total} />

          {!isArray(products) && (
            <NotFound
              msg={`${
                searchValue
                  ? `There are no products that match Showing : ${searchValue}`
                  : "There are no products that match Showing"
              } `}
            />
          )}
          
          {isArray(products) ? (
            <>
              <Grid className="mb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ProductGridItems products={products} />
              </Grid>

              {total > 12 ? (
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
          ) : null}
        </div>
      </div>
    </>
  );
}
