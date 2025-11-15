import { getCollectionHomeProducts } from "@/lib/bagisto";
import { mapBagistoProducts } from "@/lib/bagisto/helpers/product-mapper";
import ProductsTabs from "../products/product-tabs";

export default async function Products01Section() {
  // Fetch products from Bagisto API
  const filters = [
    { key: "limit", value: "8" },
    { key: "sort", value: "name-asc" },
  ];

  const bagistoProducts = await getCollectionHomeProducts({
    filters,
    tag: "products-section-01",
  });

  // Convert Bagisto products to our Product type
  const products = mapBagistoProducts(bagistoProducts);

  return (
    <section className="bg-white py-18 md:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <ProductsTabs title="Penawaran Terbaik" products={products} />
        </div>
      </div>
    </section>
  );
}
