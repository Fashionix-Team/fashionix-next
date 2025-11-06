"use client";
import React, { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Suspendisse ultrices pharetra libero sed interdum.",
    answer:
      "Nunc malesuada sodales nisi, vitae egestas lacus laoreet in. Morbi aliquet pulvinar orci non volutpat.",
  },
  {
    id: 2,
    question: "Fusce molestie condimentum facilisis.",
    answer:
      "Donec aliquam ullamcorper gravida. Integer id malesuada risus. Sed molestie accumsan orci, eu tempor felis pretium id.",
  },
  {
    id: 3,
    question: "Quisque quis nunc quis urna tempor lobortis vel non orci.",
    answer:
      "Vivamus vel sem non tortor aliquet varius vitae non nulla. Ut imperdiet turpis nec lorem mattis fermentum.",
  },
  {
    id: 4,
    question:
      "Donec rutrum ultrices ante nec malesuada. In accumsan eget nisi a rhoncus.",
    answer:
      "Ut mattis, metus eget porta volutpat, augue elit posuere justo, in commodo massa nisi id mi.",
  },
  {
    id: 5,
    question: "Nulla sed sapien maximus, faucibus massa vitae, tristique nulla.",
    answer:
      "Sed vel orci id erat egestas aliquam. Mauris ac felis sit amet enim convallis facilisis.",
  },
];

const FAQPage: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(2);

  return (
    <div className="bg-gray-150 min-h-screen">
      {/* 🔹 BAGIAN FILTER & BREADCRUMB */}
      <section className="bg-white-100% border-b border-gray-200 py-3 px-8 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-md p-2 text-sm">
            <option>Semua Kategori</option>
            <option>Pakaian Wanita</option>
            <option>Pakaian Pria</option>
            <option>Aksesoris</option>
          </select>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">Butuh Bantuan</span>
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full border text-xs font-bold text-gray-500 cursor-pointer"
              title="Informasi Bantuan"
            >
              i
            </span>
          </div>
        </div>
    </section>
    <section>
      {/* 🔹 Breadcrumb */}
      <div className="bg-gray-100% text-sm text-gray-600 py-3 px-6 flex items-center gap-2">
        <span className="text-gray-500">🏠</span>
        <span>Beranda</span>
        <span className="text-gray-400">›</span>
        <span>Halaman</span>
        <span className="text-gray-400">›</span>
        <span className="text-blue-500 font-medium">FAQs</span>
      </div>
    </section>

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
                className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-all"
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
