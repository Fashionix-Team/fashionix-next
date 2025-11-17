"use client";
import { useState } from "react";
import RatingStars from "@/components/product/rating-starts"; // pastikan path-nya benar

export default function ShopeeStyleRating() {
  const categories = ["Kualitas Bahan", "Desain", "Kenyamanan", "Harga"];
  const [overall, setOverall] = useState(0);
  const [ratings, setRatings] = useState(
    categories.map((c) => ({ name: c, rating: 0, comment: "" }))
  );
  const [review, setReview] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleStarClick = (index: number, value: number) => {
    setRatings((prev) => {
      const updated = [...prev];
      updated[index].rating = value;
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      overall,
      ratings,
      review,
      images: images.map((i) => i.name),
    });
    alert("Terima kasih atas ulasanmu!");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Beri Penilaian Produk
      </h1>

      {/* Rating keseluruhan */}
      <div className="text-center mb-8">
        <p className="text-lg mb-2 font-medium">Penilaian Keseluruhan</p>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setOverall(star)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={star <= overall ? "#facc15" : "#e5e7eb"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 transition-transform hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442a.563.563 0 01.321.987l-4.204 3.573a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.726-2.774a.562.562 0 00-.586 0l-4.726 2.774a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.573a.563.563 0 01.321-.987l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Rating per kategori */}
      <div className="space-y-6 mb-8">
        {ratings.map((item, i) => (
          <div key={item.name} className="border-b pb-4">
            <p className="font-medium mb-2">{item.name}</p>
            <div className="flex items-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(i, star)}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= item.rating ? "#facc15" : "#e5e7eb"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442a.563.563 0 01.321.987l-4.204 3.573a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.726-2.774a.562.562 0 00-.586 0l-4.726 2.774a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.573a.563.563 0 01.321-.987l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder={`Tulis komentar singkat (contoh: “Terjangkau banget”)`}
              value={item.comment}
              onChange={(e) => {
                const newRatings = [...ratings];
                newRatings[i].comment = e.target.value;
                setRatings(newRatings);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Komentar panjang */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Komentar Tambahan</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          placeholder="Ceritakan pengalaman kamu secara lengkap..."
          className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
        ></textarea>
      </div>

      {/* Upload foto */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Upload Foto Produk (opsional)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-100 file:text-orange-600 hover:file:bg-orange-200"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((img, idx) => (
            <p key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {img.name}
            </p>
          ))}
        </div>
      </div>

      {/* Tombol Kirim */}
      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
      >
        Kirim Ulasan
      </button>
    </div>
  );
}
