import { ProductCard } from "@/components/product-card";
import { ProductDetailsInfo } from "@/lib/bagisto/types";
import { NOT_IMAGE } from "@/lib/constants";
import { fixBagistoImageUrl } from "@/lib/utils";

export default function ProductGridItems({
  products,
}: {
  products: ProductDetailsInfo[];
}) {
  return products.map((product, index) => {
    const rawImageUrl =
      product?.cacheGalleryImages?.[0]?.originalImageUrl ??
      product?.images?.[0]?.url ??
      NOT_IMAGE;

    const imageUrl = fixBagistoImageUrl(rawImageUrl) || NOT_IMAGE;

    const price =
      product?.priceHtml?.finalPrice || product?.priceHtml?.regularPrice || "0";
    const currency = product?.priceHtml?.currencyCode;

    // Prepare images array for QuickView - fix all image URLs
    const images = product?.cacheGalleryImages?.map((img) => ({
      url: fixBagistoImageUrl(img.originalImageUrl || img.largeImageUrl || img.mediumImageUrl) || NOT_IMAGE,
      altText: product.name || "Product image"
    })) || product?.images?.map((img) => ({
      url: fixBagistoImageUrl(img.url) || NOT_IMAGE,
      altText: img.altText || product.name || "Product image"
    })) || [{ url: imageUrl, altText: product.name || "Product image" }];

    return (
      <ProductCard
        key={index}
        currency={currency}
        imageUrl={imageUrl}
        price={price}
        product={{
          ...product,
          images: images
        }}
      />
    );
  });
}
