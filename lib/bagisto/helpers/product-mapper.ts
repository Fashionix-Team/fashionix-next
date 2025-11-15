import { Product } from "@/types/product";
import { ProductDetailsInfo } from "../types";
import { NOT_IMAGE } from "@/lib/constants";

/**
 * Converts Bagisto ProductDetailsInfo to our Product type
 */
export function mapBagistoProductToProduct(
  bagistoProduct: ProductDetailsInfo
): Product {
  const imageUrl =
    bagistoProduct?.cacheGalleryImages?.[0]?.originalImageUrl ??
    bagistoProduct?.images?.[0]?.url ??
    NOT_IMAGE;

  const finalPrice = bagistoProduct?.priceHtml?.formattedFinalPrice || "";
  const regularPrice = bagistoProduct?.priceHtml?.formattedRegularPrice || "";

  // Check if there's a discount
  const hasDiscount =
    bagistoProduct?.priceHtml?.finalPrice &&
    bagistoProduct?.priceHtml?.regularPrice &&
    parseFloat(bagistoProduct.priceHtml.finalPrice) < parseFloat(bagistoProduct.priceHtml.regularPrice);

  return {
    id: bagistoProduct.id,
    image: imageUrl,
    title: bagistoProduct.name || bagistoProduct.title,
    price: finalPrice || regularPrice,
    priceOriginal: hasDiscount ? regularPrice : undefined,
    reviews: "(0)", // Bagisto doesn't provide review count in this query
    categories: ["all"], // Default category, can be enhanced based on product data
    urlKey: bagistoProduct.urlKey, // Add urlKey for API calls
  };
}

/**
 * Maps multiple Bagisto products to Product array
 */
export function mapBagistoProducts(
  bagistoProducts: ProductDetailsInfo[]
): Product[] {
  return bagistoProducts.map(mapBagistoProductToProduct);
}
