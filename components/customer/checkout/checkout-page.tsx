'use client';

import { useState } from 'react';
import { type CountryArrayDataType as Country } from "@/lib/bagisto/types";

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

// Definisikan tipe untuk item pesanan
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage({ countries, step, user }: CheckoutPageProps) {
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

  // Contoh data pesanan
  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Tas Kulit Premium',
      price: 250000,
      quantity: 1,
      image: '/images/bag1.jpg',
    },
    {
      id: '2',
      name: 'Dompet Kartu',
      price: 150000,
      quantity: 1,
      image: '/images/wallet1.jpg',
    },
  ];

  // Hitung subtotal
  const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

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
    // Logika untuk memproses checkout
    console.log('Form submitted:', formData);
    console.log('Payment method:', paymentMethod);
  };

  return (
    <div className="container mx-auto px-4 py-10 lg:py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {user && (
        <p className="mb-6 text-gray-600">
          Anda checkout sebagai {user.firstName} {user.lastName} ({user.email})
        </p>
      )}
      
      {/* Menambahkan penggunaan 'step' untuk menghilangkan error */}
      <p className="mb-6 text-sm text-gray-500">
        Langkah saat ini: {step}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri - Form Informasi Penagihan */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Informasi Penagihan</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nama Depan</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Nama Belakang</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Alamat</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Kota</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Provinsi</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Kode Pos</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Negara</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { id: 'seabank', name: 'SeaBank' },
                { id: 'linkaja', name: 'Link Aja!' },
                { id: 'ovo', name: 'OVO' },
                { id: 'dana', name: 'DANA' },
                { id: 'gopay', name: 'gopay' },
              ].map(method => (
                <div 
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === method.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                      <span className="text-xs font-medium">{method.name.substring(0, 2)}</span>
                    </div>
                    <span className="text-sm font-medium">{method.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Ringkasan Pesanan */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-4 mb-6">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">
                    Rp. {item.price.toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp. {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span>Rp. {shipping.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>Rp. {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >
              BUAT PESANAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}