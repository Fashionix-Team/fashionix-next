"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types/product";
import ProductBadge from "./product-badge";
import ProductRating from "./product-rating";
import QuickViewModal from "@/components/product/quick-view-modal";

interface ProductCardProps {
  product: Product;
  actions?: React.ReactNode;
  actionButtons?: {
    wishlist?: React.ReactNode;
    cart?: React.ReactNode;
    quickview?: React.ReactNode;
  };
}

export default function ProductCard({ product, actions, actionButtons }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Prepare data for QuickViewModal
  const quickViewProduct = {
    id: product.id,
    name: product.title,
    urlKey: product.id,
    type: "simple",
    price: product.price.replace(/[^0-9]/g, ''),
    currency: "IDR",
    images: [{ url: product.image, altText: product.title }],
    description: product.title,
    inStock: true,
    rating: 4.7,
    reviewCount: parseInt(product.reviews.replace(/[^0-9]/g, '') || '0'),
  };

  const handleQuickView = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Opening Quick View Modal');
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative flex items-center justify-center p-6">
          <Image
            src={product.image}
            alt={product.title}
            width={256}
            height={256}
            className="h-auto max-w-full object-contain"
            sizes="(min-width: 1280px) 256px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={false}
          />
          
          {/* Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-gray-900/60 opacity-0 transition duration-300 group-hover:opacity-100">
            {actionButtons ? (
              <>
                {actionButtons.wishlist}
                {actionButtons.cart}
                <button
                  type="button"
                  aria-label="Quick view"
                  onClick={handleQuickView}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-orange-400 hover:text-white"
                >
                  {actionButtons.quickview}
                </button>
              </>
            ) : actions}
          </div>
        </div>

        <ProductBadge badge={product.badge} />
        
        <div className="flex flex-col gap-4 p-6">
          <ProductRating reviews={product.reviews} />
          <h6 className="text-sm font-semibold leading-6 text-gray-900">{product.title}</h6>
          <p className="text-lg font-semibold text-gray-900">
            {product.priceOriginal && (
              <del className="mr-2 text-sm font-normal text-gray-500">{product.priceOriginal}</del>
            )}
            {product.price}
          </p>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={() => {
            console.log('Closing Quick View Modal');
            setIsQuickViewOpen(false);
          }}
        />
      )}
    </>
  );
}
