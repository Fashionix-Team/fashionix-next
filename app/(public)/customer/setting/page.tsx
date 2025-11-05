"use client";

import { useState } from "react";

export default function AccountSettingPage() {
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    postalCode: "",
    province: "",
    country: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    shippingPostalCode: "",
    shippingCountry: "",
    shippingProvince: "",
    shippingEmail: "",
    shippingPhone: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perubahan disimpan!");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-8">Pengaturan Akun</h1>

      {/* === Pengaturan Akun === */}
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 mb-10">
        <h2 className="text-lg font-semibold mb-5 border-b pb-2">Pengaturan Akun</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Foto Profil */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="relative w-28 h-28 mb-2">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border"
              />
              <label
                htmlFor="upload"
                className="absolute bottom-1 right-1 bg-gray-700 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-black"
              >
                Ubah
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">Unggah foto profil (max 2MB)</p>
          </div>

          {/* Form kanan */}
          <div className="grid md:grid-cols-2 gap-4 w-full md:w-2/3">
            {[
              ["displayName", "Nama Tampilan"],
              ["username", "Username"],
              ["fullName", "Nama Lengkap"],
              ["email", "Email"],
              ["phone", "Nomor Telepon"],
              ["currentPassword", "Kata Sandi Saat Ini", "password"],
              ["postalCode", "Kode Pos"],
              ["province", "Provinsi"],
              ["country", "Negara/Wilayah"],
              ["newPassword", "Kata Sandi Baru", "password"],
              ["confirmPassword", "Konfirmasi Kata Sandi", "password"],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
                <input
                  type={type || "text"}
                  name={name}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>

      {/* === Alamat Pengiriman === */}
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 border-b pb-2">Alamat Pengiriman</h2>

        {/* Form menjorok ke dalam */}
        <div className="pl-8 pr-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama Depan</label>
              <input
                name="firstName"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama Belakang</label>
              <input
                name="lastName"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nama Perusahaan (Opsional)
              </label>
              <input
                name="company"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700">Alamat</label>
              <input
                name="address"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Negara</label>
              <input
                name="shippingCountry"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Wilayah / Provinsi
              </label>
              <input
                name="shippingProvince"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Kota</label>
              <input
                name="city"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Kode Pos</label>
              <input
                name="shippingPostalCode"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="shippingEmail"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nomor Telepon</label>
              <input
                name="shippingPhone"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
