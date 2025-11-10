"use client";

import { useState } from "react";
import RatingStars from "@/components/product/rating-starts"; // pastikan path-nya benar

export default function RatingPage() {
  const [namaProduk, setNamaProduk] = useState("");
  const [komentar, setKomentar] = useState("");

  // Simulasi kirim data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rating dikirim:", { namaProduk, komentar });
    alert("Terima kasih atas penilaianmu!");
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      {/* Judul halaman */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        Beri Rating Produk
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Nilai pengalamanmu berdasarkan kriteria di bawah ini
      </p>

      {/* Form input nama produk */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">
            Nama Produk yang Ingin Dinilai
          </label>
          <input
            type="text"
            placeholder="Contoh: Kaos Polos Oversize"
            value={namaProduk}
            onChange={(e) => setNamaProduk(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Rating per kriteria */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Penilaian Per Kriteria</h2>
          <RatingStars criteria="Kualitas Bahan" />
          <RatingStars criteria="Desain" />
          <RatingStars criteria="Kenyamanan" />
          <RatingStars criteria="Harga" />
        </div>

        {/* Komentar tambahan */}
        <div>
          <label className="block font-medium mb-2">Komentar</label>
          <textarea
            rows={4}
            placeholder="Tulis pendapatmu tentang produk ini..."
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Tombol kirim */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Kirim Rating
          </button>
        </div>
      </form>
    </div>
  );
}
