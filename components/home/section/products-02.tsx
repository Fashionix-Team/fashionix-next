import { getCollectionHomeProducts } from "@/lib/bagisto";
import { mapBagistoProducts } from "@/lib/bagisto/helpers/product-mapper";
import ProductsTabs from "../products/product-tabs";

export default async function Products02Section() {
  // Fetch products from Bagisto API
  const filters = [
    { key: "limit", value: "8" },
    { key: "sort", value: "price-desc" }, // Sort by price descending for featured products
  ];

  let bagistoProducts = [];
  try {
    bagistoProducts = await getCollectionHomeProducts({
      filters,
      tag: "products-section-02",
    });
  } catch (error) {
    console.error("Products02Section: failed to load products:", error);
    bagistoProducts = [];
  }

  // Convert Bagisto products to our Product type
  const products = mapBagistoProducts(bagistoProducts);

  return (
    <section className="py-[72px]">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="grid gap-8 2xl:grid-cols-12">
          {/* Products */}
          <main className="order-2 2xl:order-1 2xl:col-span-9">
            <ProductsTabs title="Produk Unggulan" products={products} />
          </main>
        </div>
      </div>
    </section>
  );
}
