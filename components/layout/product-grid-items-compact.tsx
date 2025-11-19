import { ProductCardCompact } from "@/components/product-card-compact";
import { ProductDetailsInfo } from "@/lib/bagisto/types";
import { NOT_IMAGE } from "@/lib/constants";

export default function ProductGridItemsCompact({
  products,
}: {
  products: ProductDetailsInfo[];
}) {
  return products.map((product, index) => {
    const imageUrl =
      product?.cacheGalleryImages?.[0]?.mediumImageUrl ??
      product?.cacheGalleryImages?.[0]?.originalImageUrl ??
      product?.images?.[0]?.url ??
      NOT_IMAGE;
    const price =
      product?.priceHtml?.finalPrice || product?.priceHtml?.regularPrice || "0";
    const currency = product?.priceHtml?.currencyCode;

    // Mock rating data (you can replace this with actual data from your backend)
    const rating = 4 + Math.random(); // Random rating between 4-5
    const reviewCount = Math.floor(Math.random() * 1000) + 100;

    return (
      <ProductCardCompact
        key={product.id || index}
        currency={currency}
        imageUrl={imageUrl}
        price={price}
        product={{
          ...product,
          rating: rating,
          reviewCount: reviewCount,
        }}
      />
    );
  });
}
