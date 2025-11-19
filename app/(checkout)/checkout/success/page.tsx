"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F5F6F8] px-4 py-10">

      {/* Breadcrumb */}
      <div className="w-full max-w-4xl text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition">Beranda</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-orange-500 transition">Keranjang Belanja</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">Pembayaran</span>
        </div>
      </div>

      {/* Box */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl py-10 px-6 flex flex-col items-center text-center">

        {/* Icon */}
        <CheckCircle size={70} className="text-green-500 mb-6" />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Pesanan Anda berhasil dibuat
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-md mb-10">
          Pelaksanaan sed lectus nec tortor tristique accumsan quis dictum.
          Donec volutpat mollis non facilisis.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-3 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 transition"
          >
            PERGI KE DASBOR
          </Link>

          <Link
            href="/orders"
            className="px-5 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            LIHAT PESANAN →
          </Link>
        </div>
      </div>
    </div>
  );
}
