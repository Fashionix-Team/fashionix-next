"use client";

import { Suspense, useState } from "react";
import { VariantSelector } from "./variant-selector";
import { AddToCart } from "@/components/cart/add-to-cart";
import Price from "@/components/price";
import { BagistoProductInfo } from "@/lib/bagisto/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export function ProductDescription({
  product,
}: {
  product: BagistoProductInfo[];
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const data = product?.[0];
  const configurableProductData = data?.configutableData?.attributes || [];
  const configurableProductIndexData = data?.configutableData?.index || [];

  if (!data) return null;

  const averageRating = 4.7;

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
        {data?.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 ${
                star <= Math.floor(averageRating) ? "text-orange-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {averageRating} Penilaian Pelanggan
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <Price
          amount={
            data?.priceHtml?.finalPrice || data?.priceHtml?.regularPrice || "0"
          }
          className="text-3xl font-bold text-neutral-900 dark:text-neutral-100"
          currencyCode={data?.priceHtml?.currencyCode || ""}
        />

        {data?.priceHtml?.regularPrice !== data?.priceHtml?.finalPrice && (
          <span className="text-lg text-neutral-400 line-through">
            {data?.priceHtml?.formattedRegularPrice}
          </span>
        )}

        {data?.priceHtml?.regularPrice !== data?.priceHtml?.finalPrice && (
          <span className="rounded bg-orange-100 px-2 py-1 text-sm font-semibold text-orange-600">
            50% OFF
          </span>
        )}
      </div>

      {/* Variant Selector */}
      <Suspense fallback={<div>Loading...</div>}>
        <VariantSelector
          index={configurableProductIndexData}
          variants={configurableProductData}
        />
      </Suspense>

      {/* Quantity Selector */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Jumlah:
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-neutral-300 dark:border-neutral-600">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-4 w-4" />
            </button>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-16 border-x border-neutral-300 bg-transparent px-3 py-2 text-center dark:border-neutral-600"
              min={1}
            />

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Suspense fallback={<div>Loading...</div>}>
        <AddToCart
          availableForSale={data?.status || false}
          index={configurableProductIndexData}
          productId={data?.id || ""}
          variants={configurableProductData || []}
        />
      </Suspense>

      {/* Extra Actions */}
      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border-2 border-orange-500 bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
          BELI SEKARANG
        </button>
        <button className="rounded-lg border-2 border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
          Bagikan Produk
        </button>
      </div>
    </div>
  );
}
