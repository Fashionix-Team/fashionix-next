"use client";

import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Bagaimana cara mengetahui status pesanan saya?",
    answer:
      "Anda dapat memantau status pesanan melalui menu 'Dashboard' di akun Anda. Informasi akan diperbarui secara otomatis mulai dari pesanan dibuat hingga pengiriman.",
  },
  {
    id: 2,
    question: "Produk apa saja yang tersedia?",
    answer:
      "Kami menyediakan berbagai kategori fashion seperti kemeja, sepatu, jaket dan lainnya. Anda dapat melihat lebih lengkap pada dashboard, klik 'kategori'",
  },
  {
    id: 3,
    question: "Berapa lama waktu pengiriman pesanan?",
    answer:
      "Waktu pengiriman tergantung lokasi tujuan dan jasa ekspedisi yang digunakan. Biasanya berkisar antara 1–7 hari kerja.",
  },
  {
    id: 4,
    question:
      "Bagaimana jika lupa password?",
    answer:
      "Anda dapat mereset kata sandi dengan memasukkan email yang terdaftar, lalu masukkan kata sandi baru",
  },
  {
    id: 5,
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menyediakan berbagai metode pembayaran melalui e-wallet dan pembayaran di tempat (COD)",
  },
];

const FAQPage = () => {
  const [activeId, setActiveId] = useState<number | null>(2);

  return (
    <div className="bg-gray-150 min-h-screen">

      {/* 🔹 Main FAQ Section */}
      <div className="py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Left Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`border rounded-lg ${
                    activeId === faq.id ? "border-orange-400" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() =>
                      setActiveId(activeId === faq.id ? null : faq.id)
                    }
                    className={`w-full text-left p-4 font-medium flex justify-between items-center ${
                      activeId === faq.id
                        ? "bg-orange-400 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {faq.question}
                    <span>{activeId === faq.id ? "-" : "+"}</span>
                  </button>
                  {activeId === faq.id && (
                    <div className="p-4 bg-white text-gray-600 border-t border-gray-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3 bg-yellow-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Tidak menemukan jawaban Anda?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Mintalah bantuan dukungan. Isi form di bawah untuk mengirim pesan
              kepada kami.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Alamat Email"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                placeholder="Subjek"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              <textarea
                placeholder="Pesan (Opsional)"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="block mx-auto bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-all"
              >
                KIRIM PESAN →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
