"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cart } from "@/lib/bagisto/types";
import { NOT_IMAGE } from "@/lib/constants";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { fixBagistoImageUrl } from "@/lib/utils";

export default function CartItemsList({ cart }: { cart: Cart }) {
  const router = useRouter();
  const [loadingItems, setLoadingItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleUpdateQuantity = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    setLoadingItems((prev) => ({ ...prev, [cartItemId]: true }));

    try {
      const response = await fetch("/api/cart/updateCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: {
            qty: [{ cartItemId, quantity: newQuantity }],
          },
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    setLoadingItems((prev) => ({ ...prev, [cartItemId]: true }));

    try {
      const response = await fetch("/api/cart/removeCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineIds: cartItemId }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className="rounded-lg bg-white">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-medium text-gray-900">
          Keranjang Belanja
        </h1>
      </div>

      {/* Table Header */}
      <div className="hidden border-b border-gray-200 bg-gray-50 px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
        <div className="col-span-6">
          <p className="text-sm font-medium text-gray-700">PRODUK</p>
        </div>
        <div className="col-span-2 text-center">
          <p className="text-sm font-medium text-gray-700">HARGA</p>
        </div>
        <div className="col-span-2 text-center">
          <p className="text-sm font-medium text-gray-700">JUMLAH</p>
        </div>
        <div className="col-span-2 text-center">
          <p className="text-sm font-medium text-gray-700">SUBTOTAL</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-200">
        {cart.items.map((item: any) => {
          const rawImageUrl =
            item.product?.cacheBaseImage?.originalImageUrl ||
            item.product?.images?.[0]?.url ||
            NOT_IMAGE;

          const imageUrl = fixBagistoImageUrl(rawImageUrl) || NOT_IMAGE;

          const isLoading = loadingItems[item.id];

          return (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-4 p-6 md:grid-cols-12 md:items-center"
            >
              {/* Remove Button - Mobile */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                disabled={isLoading}
                className="absolute right-4 top-4 text-gray-400 hover:text-red-500 md:hidden"
                aria-label="Remove item"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>

              {/* Product Info */}
              <div className="col-span-1 md:col-span-6">
                <div className="flex gap-4">
                  {/* Remove Button - Desktop */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isLoading}
                    className="hidden text-gray-400 hover:text-red-500 md:block"
                    aria-label="Remove item"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>

                  {/* Product Image */}
                  <Link
                    href={`/product/${item.product?.urlKey || "#"}`}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200"
                  >
                    <Image
                      src={imageUrl}
                      alt={item.product?.name || "Product"}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link
                      href={`/product/${item.product?.urlKey || "#"}`}
                      className="text-base font-normal text-gray-900 hover:text-blue-600"
                    >
                      {item.product?.name || item.name}
                    </Link>
                    {item.sku && (
                      <p className="mt-1 text-sm text-gray-500">{item.sku}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-1 text-left md:col-span-2 md:text-center">
                <p className="text-sm font-medium text-blue-600 md:hidden">
                  Harga:
                </p>
                <p className="text-base text-gray-900">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center justify-start md:justify-center">
                  <p className="mr-4 text-sm font-medium text-blue-600 md:hidden">
                    Jumlah:
                  </p>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={isLoading || item.quantity <= 1}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="min-w-[3rem] px-4 py-2 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={isLoading}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="col-span-1 text-left md:col-span-2 md:text-center">
                <p className="text-sm font-medium text-blue-600 md:hidden">
                  Subtotal:
                </p>
                <p className="text-base font-medium text-gray-900">
                  {formatPrice(item.total)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back to Shop Button */}
      <div className="border-t border-gray-200 p-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-blue-500 bg-white px-6 py-3 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-50"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          KEMBALI KE TOKO
        </Link>
      </div>
    </div>
  );
}
