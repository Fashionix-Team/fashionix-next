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
    <div className="sticky top-4">
      {/* Rating dan Judul Produk */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Rating
            length={5}
            reviewCount={moreDetails?.averageRating}
            star={moreDetails?.averageRating}
            totalReview={moreDetails?.reviews?.length}
          />
          <span className="text-sm text-gray-600">
            {moreDetails?.averageRating || 4.7} ({moreDetails?.reviews?.length || 0} Ulasan Pengguna)
          </span>
        </div>
        <h1 className="font-outfit text-2xl font-bold mb-2">{data?.name}</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Ketersediaan:</span>
          <span className="text-blue-600 font-medium">Tersedia</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Merek:</span>
          <span className="text-blue-600 font-medium">Onitsuka</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Kategori:</span>
          <span className="text-blue-600 font-medium">Sepatu</span>
        </div>
      </div>

      {/* Harga */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
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
            <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
              SAVE 50%
            </span>
          </>
        )}
      </div>

      {/* Variant Selector */}
      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded" />}>
        <VariantSelector
          index={configurableProductIndexData}
          variants={configurableProductData}
        />
      </Suspense>

      {/* Add to Cart */}
      <Suspense fallback={<div className="h-12 bg-gray-100 animate-pulse rounded" />}>
        <AddToCart
          availableForSale={data?.status || false}
          index={configurableProductIndexData}
          productId={data?.id || ""}
          variants={configurableProductData || []}
        />
      </Suspense>

      {/* Bandingkan Produk */}
      <div className="mt-4 mb-6">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Bandingkan Produk
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-base mb-4">Filter</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              defaultChecked 
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
            />
            <div className="flex items-start gap-2 text-sm">
              <span>🏷️</span>
              <span>Diskon / Tokcer Gratis</span>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
            />
            <div className="flex items-start gap-2 text-sm">
              <span>📦</span>
              <span>Ongkir & Pengemasan Super Cepat</span>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
            />
            <div className="flex items-start gap-2 text-sm">
              <span>💯</span>
              <span>Dijamin Uang Kembali 100%</span>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
            />
            <div className="flex items-start gap-2 text-sm">
              <span>🎁</span>
              <span>Layanan Pelanggan 24 Jam</span>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
            />
            <div className="flex items-start gap-2 text-sm">
              <span>💬</span>
              <span>Metode Pembayaran Aman</span>
            </div>
          </label>
        </div>
      </div>

      {/* Informasi Pengiriman */}
      <div className="border-t pt-4 space-y-2 text-sm mb-6">
        <div className="flex items-start gap-2">
          <span className="text-orange-500">✓</span>
          <div>
            <span className="font-semibold">Kursi: </span>
            <span className="text-gray-600">Gratis ongkir untuk negara pilihan</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-orange-500">✓</span>
          <div>
            <span className="font-semibold">Pengiriman Lebih: </span>
            <span className="text-gray-600">Rp. 500 - Rp. 5000</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-orange-500">✓</span>
          <div>
            <span className="font-semibold">Pengiriman Global (DHL): </span>
            <span className="text-gray-600">Rp. 25.00 - Rp. 40.00</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-orange-500">✓</span>
          <div>
            <span className="font-semibold">Barang Imitasi Murahka: </span>
            <span className="text-gray-600">3 - 4 hari, 500,00</span>
          </div>
        </div>
      </div>

      {/* Tabs Section - Moved below in the main layout */}
      <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded" />}>
        <ProductMoreDetails
          additionalData={moreDetails?.additionalData || []}
          description={moreDetails?.description || ""}
          reviews={moreDetails?.reviews || []}
          totalReview={moreDetails?.reviews?.length}
        />
      </Suspense>
    </div>
  );
}
