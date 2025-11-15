"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Komponen utama
export default function RatingModal() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (rating === 0) {
    alert("Silakan beri penilaian dulu!");
    return;
  }

  try {
    const res = await fetch("/api/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating,
        feedback,
        productId: 123, // contoh saja
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Ulasan berhasil dikirim!");
      setRating(0);
      setFeedback("");
    } else {
      alert("Gagal: " + data.error);
    }
  } catch (err) {
    alert("Terjadi kesalahan server.");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative"
      >
        <h2 className="text-gray-800 font-semibold text-sm uppercase mb-4 border-b pb-2">
          Alamat Penagihan
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Penilaian */}
          <div className="mb-4">
            <label className="block text-xs text-gray-600 mb-2">
              Penilaian
            </label>

            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= (hover || rating)}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  />
                ))}
              </div>
              <span className="ml-2 text-xs text-gray-600">
                {rating > 0 ? `Peringkat Bintang ${rating}` : "Belum ada penilaian"}
              </span>
            </div>
          </div>

          {/* Umpan Balik */}
          <div className="mb-6">
            <label className="block text-xs text-gray-600 mb-2">
              Umpan Balik
            </label>
            <textarea
              placeholder="Tulis umpan balik Anda tentang produk dan layanan kami"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-28 border rounded p-3 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-orange-400/40"
            ></textarea>
          </div>

          {/* Tombol kirim */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
          >
            KIRIM ULASAN
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// Komponen bintang individual ⭐
interface StarProps {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Star: React.FC<StarProps> = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "orange" : "none"}
      stroke="orange"
      strokeWidth={1.5}
      className="w-6 h-6 cursor-pointer transition-transform hover:scale-110"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.201 4.665 24 6 15.596 0 9.748l8.332-1.73L12 .587z" />
    </svg>
  );
};
