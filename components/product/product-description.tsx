"use client";

import { Suspense, useState } from "react";
import { VariantSelector } from "./variant-selector";
import Price from "@/components/price";
import { BagistoProductInfo } from "@/lib/bagisto/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { 
  MinusIcon, 
  PlusIcon, 
  ShoppingCartIcon, 
  DocumentDuplicateIcon,
  ChevronDownIcon, 
  ChevronUpIcon 
} from "@heroicons/react/24/outline";

export function ProductDescription({
  product,
}: {
  product: BagistoProductInfo[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false); // State untuk deskripsi
  const data = product[0];

  // Data untuk Varian (Configurable Product)
  const configurableAttributes = data?.configutableData?.attributes || [];
  const configurableIndex = data?.configutableData?.index || [];

  if (!data) return null;

  // --- 1. LOGIKA DATA DINAMIS ---

  const averageRating = parseFloat((data as any).averageRating || "0");
  const totalReviews = (data as any).reviews?.length || 0;

  const totalStock = data.inventories?.reduce((acc, curr) => acc + parseInt(curr.qty), 0) || 0;
  const isAvailable = totalStock > 0 || (data as any).isSaleable;
  const availabilityLabel = isAvailable ? "Tersedia" : "Stok Habis";
  const availabilityColor = isAvailable ? "text-green-600" : "text-red-600";

  const brandAttribute = (data as any).additionalData?.find((attr: any) => attr.code === 'brand') || 
                         (data as any).attributeValues?.find((attr: any) => attr.attribute?.code === 'brand');
  
  const brandName = brandAttribute?.label || brandAttribute?.textValue || "-";
  const categoryName = (data as any).categories?.[0]?.name || "Umum";

  return (
<<<<<<< HEAD
    <div className="font-sans text-neutral-900">
      
      {/* 1. Rating & Reviews */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-orange-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon 
                key={star} 
                className={`h-4 w-4 ${star <= Math.round(averageRating) ? 'text-orange-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-medium">{averageRating || 0} Penilaian Bintang</span>
        </div>
        <span className="text-xs text-gray-500">({totalReviews} Ulasan Pengguna)</span>
      </div>

      {/* 2. Title */}
      <h1 className="text-xl md:text-2xl font-semibold mb-4 leading-tight">
        {data.name}
      </h1>

      {/* 3. Metadata */}
      <div className="text-sm text-gray-500 space-y-2 mb-6 border-b border-gray-100 pb-6">
        <p>
          Ketersediaan: <span className={`font-medium ${availabilityColor}`}>{availabilityLabel}</span>
        </p>
        <div className="flex flex-wrap gap-x-12 gap-y-2">
           <p>Merek: <span className="font-bold text-gray-800">{brandName}</span></p>
           <p>Kategori: <span className="font-bold text-gray-800">{categoryName}</span></p>
        </div>
      </div>

      {/* 4. Deskripsi Produk (Collapsible) */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase">Deskripsi Produk</h3>
        <div 
          className={`text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-full" : "max-h-24" // max-h-24 kira-kira 4-5 baris
          }`}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: data.description || data.shortDescription || "Tidak ada deskripsi." }} 
          />
        </div>
        
        {/* Tombol Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          {isExpanded ? (
            <>
              Sembunyikan <ChevronUpIcon className="h-3 w-3" />
            </>
          ) : (
            <>
              Selengkapnya <ChevronDownIcon className="h-3 w-3" />
            </>
          )}
        </button>
      </div>

      {/* 5. Price Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Price
            amount={data.priceHtml?.finalPrice || data.priceHtml?.regularPrice || "0"}
            className="text-3xl font-bold text-blue-500"
            currencyCode={data.priceHtml?.currencyCode || "IDR"}
          />
          
          {data.priceHtml?.regularPrice !== data.priceHtml?.finalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through decoration-gray-400">
                {data.priceHtml?.formattedRegularPrice}
              </span>
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-sm">
                SALE
              </span>
            </>
          )}
        </div>
      </div>

      {/* 6. Variants (Warna & Ukuran) */}
      {data.type === 'configurable' && (
        <div className="mb-8">
            <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded"></div>}>
                <VariantSelector
                    index={configurableIndex}
                    variants={configurableAttributes}
                />
            </Suspense>
        </div>
      )}

      {/* 7. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-4">
        
        <div className="flex items-center justify-between border border-gray-300 rounded-md w-full sm:w-32 h-12 px-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 text-gray-600 hover:text-black disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-10 text-center border-none focus:ring-0 p-0 text-gray-900 font-medium outline-none bg-transparent"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 text-gray-600 hover:text-black"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        <button 
            className={`flex-1 font-bold text-sm px-6 h-12 rounded-md flex items-center justify-center gap-2 transition-colors uppercase ${isAvailable ? 'bg-[#F97316] hover:bg-orange-600 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
            disabled={!isAvailable}
        >
            <span>{isAvailable ? 'TAMBAH KE KERANJANG' : 'HABIS'}</span>
            <ShoppingCartIcon className="h-5 w-5" />
        </button>

        <button 
            className={`flex-1 border-2 font-bold text-sm px-6 h-12 rounded-md transition-colors uppercase ${isAvailable ? 'bg-white border-[#F97316] text-[#F97316] hover:bg-orange-50' : 'border-gray-300 text-gray-400 cursor-not-allowed'}`}
            disabled={!isAvailable}
        >
            BELI SEKARANG
        </button>
      </div>

      <div className="flex justify-end mt-4">
         <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-xs font-medium">
            <span>Bagikan Produk:</span>
            <DocumentDuplicateIcon className="h-4 w-4" />
         </button>
      </div>

    </div>
=======
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
>>>>>>> e45a12803977b970130d0a0deb2935098dbce949
  );
}