"use client";

import { Cart } from "@/lib/bagisto/types";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CartSummary({ cart }: { cart: Cart }) {
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const subtotal = cart.subTotal || 0;
  const shipping = cart.selectedShippingRate?.price
    ? parseFloat(cart.selectedShippingRate.price)
    : 0;
  const grandTotal = cart.grandTotal || 0;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-medium text-gray-900">
        Total Keranjang
      </h2>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-base text-gray-600">Subtotal</span>
          <span className="text-base font-medium text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-base text-gray-600">Pengiriman</span>
          {shipping > 0 ? (
            <span className="text-base font-medium text-gray-900">
              {formatPrice(shipping)}
            </span>
          ) : (
            <span className="text-base font-medium text-green-600">Gratis</span>
          )}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-xl font-semibold text-gray-900">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-orange-600"
      >
        LANJUT KE PEMBAYARAN
        <ArrowRightIcon className="h-5 w-5" />
      </Link>

      {/* Additional Info */}
      <div className="mt-6 space-y-2 text-sm text-gray-500">
        <p className="flex items-start gap-2">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Gratis ongkir untuk pembelian tertentu</span>
        </p>
        <p className="flex items-start gap-2">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Pembayaran aman dan terpercaya</span>
        </p>
        <p className="flex items-start gap-2">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Jaminan uang kembali 100%</span>
        </p>
      </div>
    </div>
  );
}
