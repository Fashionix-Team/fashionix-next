"use client";

import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CheckoutSuccessPage() {
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center px-4 py-10">

      {/* Box */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl py-10 px-6 flex flex-col items-center text-center">

        {/* Icon */}
        <CheckCircleIcon className="w-[70px] h-[70px] text-green-500 mb-6" />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Pesanan Anda berhasil dibuat
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-md mb-10">
          Terima kasih atas pembelian Anda. Kami akan segera memproses pesanan Anda dan mengirimkan informasi lebih lanjut melalui email.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            href="/customer/dashboard"
            className="px-5 py-3 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 transition"
          >
            PERGI KE DASBOR
          </Link>

          <Link
            href="/customer/dashboard/order-history"
            className="px-5 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            LIHAT PESANAN →
          </Link>
        </div>
      </div>
    </div>
  );
}
