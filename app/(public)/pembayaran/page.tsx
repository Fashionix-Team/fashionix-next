"use client";

import React, { useState } from "react";

interface PaymentMethod {
  name: string;
  img: string;
}

const payments: PaymentMethod[] = [
  { name: "SeaBank", img: "/image/payment/seabank.png" },
  { name: "LinkAja", img: "/image/payment/linkaja.png" },
  { name: "OVO", img: "/image/payment/ovo.jpg" },
  { name: "DANA", img: "/image/payment/dana.png" },
  { name: "GoPay", img: "/image/payment/gopay.jpg" },
];

export default function OpsiPembayaran() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const openModal = (payment: PaymentMethod) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPhoneNumber("");
    setOtpCode("");
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-20 bg-white rounded-xl shadow p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center uppercase tracking-wide">
        Opsi Pembayaran
      </h2>

      {/* Daftar Opsi Pembayaran */}
      <div className="flex flex-wrap justify-center gap-8">
        {payments.map((p) => (
          <button
            key={p.name}
            onClick={() => openModal(p)}
            className="border rounded-xl shadow-sm hover:shadow-lg transition p-4 bg-white focus:outline-none"
          >
            <img src={p.img} alt={p.name} className="w-32 h-32 object-contain" />
          </button>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-[400px] p-6 relative animate-fadeIn">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>

            <h3 className="text-lg font-semibold text-center mb-6">
              Hubungkan Akun {selectedPayment?.name}
            </h3>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Masukkan Nomor Anda
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full border rounded-l-lg px-3 py-2 text-sm focus:ring focus:ring-blue-300 outline-none"
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm rounded-r-lg">
                    Kirim OTP
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Masukkan Kode Verifikasi
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Masukkan kode OTP"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-300 outline-none"
                />
              </div>

              <button
                onClick={() => alert("Akun berhasil dihubungkan!")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Hubungkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
