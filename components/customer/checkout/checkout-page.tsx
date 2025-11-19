'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type CountryArrayDataType as Country } from "@/lib/bagisto/types";
import { useAppSelector } from '@/store/hooks';
import { getValidImageUrl } from '@/lib/utils';
import { NOT_IMAGE } from '@/lib/constants';

// Definisikan tipe props
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  firstName: string;
  lastName: string;
  accessToken?: string;
  role?: string;
  phone?: string;
}

interface CheckoutPageProps {
  countries: Country[];
  step: string;
  user?: User | null;
}

// Definisikan tipe untuk form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage({ countries, step, user }: CheckoutPageProps) {
  const cartDetail = useAppSelector((state) => state.cartDetail);
  const cart = cartDetail?.cart;

  // State untuk form data
  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: countries.length > 0 ? countries[0].id : '',
  });

  // State untuk metode pembayaran
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Hitung subtotal dari cart
  const subtotal = parseFloat(cart?.subTotal || "0");
  const shipping = 0;
  const total = subtotal + shipping;

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(numPrice);
  };

  // Handle perubahan form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Payment method:', paymentMethod);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-gray-900">Beranda</Link>
          <span className="mx-2">›</span>
          <Link href="/cart" className="hover:text-gray-900">Keranjang Belanja</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Pembayaran</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informasi Pengguna */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Informasi Pengguna</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Nama Pengguna</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Nama Pengguna"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Alamat</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Jalan Indonesia"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Negara</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {countries.map(country => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Kota</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Kota"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Kode Pos</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Kode Pos"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Alamat Tujuan"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    className="text-orange-500 text-sm hover:text-orange-600"
                  >
                    Masuk dan simpan data ini
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    <input type="checkbox" className="mr-2" />
                    SIMPAN PESANAN INI
                  </label>
                </div>
              </form>
            </div>

            {/* Informasi Tambahan */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Informasi Tambahan</h2>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Catatan Pesanan (Opsional)</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Catatan tentang pesanan Anda, misal catatan khusus untuk pengiriman"
                ></textarea>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Pilihan Metode Pembayaran</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {[
                  { id: 'seabank', name: 'SeaBank', logo: '/image/logo/SeaBank.png' },
                  { id: 'linkaja', name: 'Link Aja!', logo: '/image/logo/LinkAja.png' },
                  { id: 'ovo', name: 'OVO', logo: '/image/logo/OVO.png' },
                  { id: 'dana', name: 'DANA', logo: '/image/logo/Dana.png' },
                  { id: 'gopay', name: 'GoPay', logo: '/image/logo/Gopay.png' },
                ].map(method => (
                  <button 
                    key={method.id}
                    type="button"
                    className={`border-2 rounded-lg p-4 transition-all ${
                      paymentMethod === method.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="aspect-square bg-white rounded-lg p-2 flex items-center justify-center">
                      <Image
                        src={method.logo}
                        alt={method.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>

              
            </div>
          </div>

          {/* Kolom Kanan - Ringkasan */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Ringkasan Produksi</h2>
              
              <div className="space-y-4 mb-6">
                {cart?.items?.map((item: any, index: number) => {
                  const imageUrl = getValidImageUrl(item?.product?.images?.[0]?.url);
                  const itemPrice = typeof item.total === 'string' ? parseFloat(item.total) : item.total;
                  
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.quantity} x Rp. {formatPrice(itemPrice / item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rp. {formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pengiriman</span>
                  <span className="font-medium">{shipping === 0 ? 'Gratis' : `Rp. ${formatPrice(shipping)}`}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>Rp. {formatPrice(total)}</span>
                </div>
              </div>
              
              <button 
                onClick={handleSubmit}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center gap-2"
              >
                BUAT PESANAN
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}