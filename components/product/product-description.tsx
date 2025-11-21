"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { useAddProduct } from "@/components/hooks/use-add-to-cart";
import { useToast } from "@/app/context/toast-context";

export function ProductDescription({
  product,
}: {
  product: BagistoProductInfo[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const data = product[0];
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onAddToCart, isCartLoading } = useAddProduct();
  const { addToast } = useToast();

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

  // Helper functions for cart actions
  const searchParamsToObject = (searchParams: any) => {
    const paramsObject: any = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObject[key] = value;
    }
    return paramsObject;
  };

  const findMatchingVariant = (searchParamsObject: any) => {
    for (const variant of configurableIndex) {
      let match = true;
      const attributeOptionIds = [];

      for (const attributeOption of variant.attributeOptionIds) {
        const attributeCode = attributeOption.attributeCode;
        const attributeOptionId = attributeOption.attributeOptionId;

        if (searchParamsObject[attributeCode] !== attributeOptionId) {
          match = false;
          break;
        }
        attributeOptionIds.push({
          attributeId: Number(attributeOption.attributeId),
          attributeOptionId: Number(attributeOption.attributeOptionId),
        });
      }
      if (match) {
        return { ...variant, attributeOptionIds };
      }
    }
    return null;
  };

  const searchParamsObject = searchParamsToObject(searchParams);
  const matchingVariant = findMatchingVariant(searchParamsObject);
  const selectedVariantId = matchingVariant?.id || data.id;
  const selectedConfigurableOption = Number(matchingVariant?.id || data.id);
  const superAttribute = matchingVariant?.attributeOptionIds || [];

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (!isAvailable) return;
    
    try {
      await onAddToCart({
        input: {
          quantity,
          isBuyNow: false,
          productId: selectedVariantId,
          selectedConfigurableOption,
          superAttribute,
        },
      });
      addToast({
        message: "Produk berhasil ditambahkan ke keranjang!",
        type: "success",
      });
    } catch (error) {
      addToast({
        message: "Gagal menambahkan produk ke keranjang",
        type: "danger",
      });
    }
  };

  // Handle Buy Now
  const handleBuyNow = async () => {
    if (!isAvailable) return;
    
    try {
      await onAddToCart({
        input: {
          quantity,
          isBuyNow: true,
          productId: selectedVariantId,
          selectedConfigurableOption,
          superAttribute,
        },
      });
      router.push("/checkout");
    } catch (error) {
      addToast({
        message: "Gagal memproses pembelian",
        type: "danger",
      });
    }
  };

  // Handle Share Product
  const handleShareProduct = async () => {
    setIsSharing(true);
    const shareUrl = window.location.href;
    const shareTitle = data.name;
    const shareText = `Check out ${data.name}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        addToast({
          message: "Berhasil membagikan produk!",
          type: "success",
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        addToast({
          message: "Link produk berhasil disalin!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      addToast({
        message: "Gagal membagikan produk",
        type: "danger",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
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

      {/* 4. Product Description (Collapsible) */}
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
        
        {/* Toggle Button */}
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
            onClick={handleAddToCart}
            className={`flex-1 font-bold text-sm px-6 h-12 rounded-md flex items-center justify-center gap-2 transition-colors uppercase ${isAvailable && !isCartLoading ? 'bg-[#F97316] hover:bg-orange-600 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
            disabled={!isAvailable || isCartLoading}
        >
            <span>{isCartLoading ? 'MEMPROSES...' : isAvailable ? 'TAMBAH KE KERANJANG' : 'HABIS'}</span>
            {!isCartLoading && <ShoppingCartIcon className="h-5 w-5" />}
        </button>

        <button 
            onClick={handleBuyNow}
            className={`flex-1 border-2 font-bold text-sm px-6 h-12 rounded-md transition-colors uppercase ${isAvailable && !isCartLoading ? 'bg-white border-[#F97316] text-[#F97316] hover:bg-orange-50' : 'border-gray-300 text-gray-400 cursor-not-allowed'}`}
            disabled={!isAvailable || isCartLoading}
        >
            {isCartLoading ? 'MEMPROSES...' : 'BELI SEKARANG'}
        </button>
      </div>

      <div className="flex justify-end mt-4">
         <button 
            onClick={handleShareProduct}
            disabled={isSharing}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-xs font-medium disabled:opacity-50"
         >
            <span>{isSharing ? 'Membagikan...' : 'Bagikan Produk:'}</span>
            <DocumentDuplicateIcon className="h-4 w-4" />
         </button>
      </div>

    </div>
  );
}