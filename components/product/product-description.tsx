import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductMoreDetails } from "./producr-more-detail";
import { VariantSelector } from "./variant-selector";
import Rating from ".";
import { AddToCart } from "@/components/cart/add-to-cart";
import Price from "@/components/price";
import Prose from "@/components/prose";
import { getCollectionReviewProducts } from "@/lib/bagisto";
import { BagistoProductInfo } from "@/lib/bagisto/types";

export async function ProductDescription({
  product,
  slug,
}: {
  product: BagistoProductInfo[];
  slug: string;
}) {
  if (!product.length) return notFound();
  const data = product[0];
  const configurableProductData = data?.configutableData?.attributes || [];
  const configurableProductIndexData = data?.configutableData?.index || [];
  const moreDetails = await getCollectionReviewProducts({
    collection: slug,
    page: "product",
  });

  return (
    <>
      {/* Rating dan Judul */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Rating
            length={5}
            reviewCount={moreDetails?.averageRating}
            star={moreDetails?.averageRating}
            totalReview={moreDetails?.reviews?.length}
          />
          <span className="text-sm text-gray-600">
            {moreDetails?.averageRating || 4.7} Penilaian Bintang
          </span>
        </div>
        <h1 className="font-outfit text-2xl font-semibold mb-4">{data?.name}</h1>
      </div>

      {/* Info Produk */}
      <div className="mb-6 space-y-2 text-sm">
        <div className="flex">
          <span className="text-gray-600 w-32">Ketersediaan:</span>
          <span className="text-green-600 font-medium">Tersedia</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-32">Merek:</span>
          <span className="text-blue-600">Onitsuka</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-32">Kategori:</span>
          <span className="text-blue-600">Sepatu</span>
        </div>
      </div>

      {/* Harga */}
      <div className="mb-6 flex items-center gap-3">
        <Price
          amount={
            data?.priceHtml?.finalPrice ||
            data?.priceHtml?.regularPrice ||
            "0"
          }
          className="font-outfit text-3xl font-bold text-orange-500"
          currencyCode={data?.priceHtml?.currencyCode || ""}
        />
        {data?.priceHtml?.regularPrice !== data?.priceHtml?.finalPrice && (
          <>
            <span className="text-lg text-gray-400 line-through">
              Rp. {parseFloat(data?.priceHtml?.regularPrice || "0").toLocaleString('id-ID')}
            </span>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">
              50% OFF
            </span>
          </>
        )}
      </div>

      {/* Variant Selector */}
      <Suspense fallback={<p>Loading...</p>}>
        <VariantSelector
          index={configurableProductIndexData}
          variants={configurableProductData}
        />
      </Suspense>

      {/* Add to Cart */}
      <Suspense fallback={<p>Loading...</p>}>
        <AddToCart
          availableForSale={data?.status || false}
          index={configurableProductIndexData}
          productId={data?.id || ""}
          variants={configurableProductData || []}
        />
      </Suspense>

      {/* Bagikan Produk */}
      <div className="mt-6 flex items-center gap-2">
        <span className="text-sm text-gray-600">Bagikan Produk:</span>
        <button className="p-2 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
      </div>

      {/* Tabs Section */}
      <Suspense fallback={<p>Loading...</p>}>
        <ProductMoreDetails
          additionalData={moreDetails?.additionalData || []}
          description={moreDetails?.description || ""}
          reviews={moreDetails?.reviews || []}
          totalReview={moreDetails?.reviews?.length}
        />
      </Suspense>
    </>
  );
}
