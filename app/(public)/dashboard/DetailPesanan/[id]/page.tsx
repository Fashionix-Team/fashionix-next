// app/dashboard/DetailPesanan/DetailPesananpage.tsx

import React from 'react';
import Image from 'next/image'; // Gunakan Next.js Image untuk optimasi

// --- Data Dummy (ganti dengan data asli dari API) ---
const mockOrderDetails = {
    id: '#96459761',
    placedOn: '17 Januari 2021 pukul 19:32',
    total: 'Rp. 400.000',
    expectedDelivery: '23 Januari 2021',
    status: 'Pengiriman', // Status saat ini
    activities: [
        { text: 'Pesanan Anda telah dikirim. Terima kasih telah berbelanja!', time: '22 Jan, 2021 07:02 PM', completed: true },
        { text: 'Kami (Line World) telah mengambil pesanan Anda untuk dikirim.', time: '22 Jan, 2021 07:01 PM', completed: true },
        { text: 'Pesanan Anda telah masuk di pusat sortir terakhir.', time: '22 Jan, 2021 01:00 AM', completed: true },
        { text: 'Pesanan Anda sedang dalam perjalanan menuju pusat sortir Bpost terdekat.', time: '21 Jan, 2021 10:32 AM', completed: true },
        { text: 'Pesanan Anda (Method: diverifikasi).', time: '20 Jan, 2021 04:12 PM', completed: true },
        { text: 'Pesanan Anda telah dikonfirmasi.', time: '19 Jan, 2021 01:00 AM', completed: true },
    ],
    products: [
        { id: 1, name: 'Sepatu Sneakers Pria Sepatu Olahraga Pria Sport Casual Model Terbaru', category: 'ACCESSORIES', price: 'Rp. 350.000', qty: 1, subtotal: 'Rp. 350.000', imageUrl: 'https://down-id.img.susercontent.com/file/sg-11134201-7rdyk-lzpcpentjjfscd.jpg' },
        { id: 2, name: 'Kemeja Katun Pria Daleman/Anak Laki-Laki Lengan Pendek', category: 'ACCESSORIES', price: 'Rp. 50.000', qty: 1, subtotal: 'Rp. 50.000', imageUrl: 'https://down-id.img.susercontent.com/file/sg-11134201-7ra3i-m59doszrgnecc8.jpg' },
    ],
    billingAddress: {
        name: 'Kevin Gilbert',
        address: 'Jalan Mangga 784, Jalan No. 123, Kelurahan No. 12933, Unit No. 12, Jakarta',
        phone: '(+62) 895-1201-1218',
        email: 'kevin.gilbert@hotmail.com'
    },
    shippingAddress: {
        name: 'Kevin Gilbert',
        address: 'Jalan Mangga 784, Jalan No. 123, Kelurahan No. 12933, Unit No. 12, Jakarta',
        phone: '(+62) 895-1201-1218',
        email: 'kevin.gilbert@hotmail.com'
    },
    notes: 'Selisih harga tidak seberapa dari yang impor, jadi pilih yang lokal. Kualitas bagus, bahan oke, dipakai juga enak, dua jempol pokoknya. Bungkusnya rapi, pengiriman berjalan dengan baik. Abang kurirnya juga sopan.'
};
// ----------------------------------------------------

// Tipe Props (untuk TypeScript)
// Ini akan mengambil 'id' dari URL, contoh: /dashboard/DetailPesanan/96459761
type DetailPesananPageProps = {
    params: { id: string };
};

export default function DetailPesananPage({ params }: DetailPesananPageProps) {
    const order = mockOrderDetails; // Nanti Anda akan fetch data berdasarkan params.id
    const productCount = order.products.length;

    return (
        <div className="p-4 md:p-8 bg-white min-h-screen">
            {/* Breadcrumbs dan Header */}
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li><a href="#" className="text-blue-600 hover:underline">Beranda</a></li>
                    <li><span>&gt;</span></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Akun Pengguna</a></li>
                    <li><span>&gt;</span></li>
                    <li className="text-gray-700">Detail Pesanan</li>
                </ol>
            </nav>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Detail Pesanan</h1>
                <a href="#" className="text-sm text-blue-600 font-medium border border-blue-600 rounded-md px-4 py-2 hover:bg-blue-50">
                    Beri Penilaian +
                </a>
            </div>

            {/* Kotak Info Pesanan */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Pesanan {order.id}</h2>
                    <p className="text-sm text-gray-600">{`4 Produk • Dipesan pada ${order.placedOn}`}</p>
                    <p className="text-sm text-gray-600">{`Pesanan akan dikirimkan pada ${order.expectedDelivery}`}</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-gray-800">{order.total}</span>
                </div>
            </div>

            {/* Timeline Status */}
            <div className="w-full mb-8">
                <div className="flex items-center">
                    {/* Step 1: Pesanan Dibuat */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">✔</div>
                        <p className="text-xs mt-2 font-medium">Pesanan Dibuat</p>
                    </div>
                    {/* Garis Penghubung */}
                    <div className="flex-auto border-t-2 border-orange-500 mx-2"></div>
                    
                    {/* Step 2: Pengemasan */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">✔</div>
                        <p className="text-xs mt-2 font-medium">Pengemasan</p>
                    </div>
                    {/* Garis Penghubung */}
                    <div className="flex-auto border-t-2 border-orange-500 mx-2"></div>

                    {/* Step 3: Dalam Pengiriman */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">🚚</div>
                        <p className="text-xs mt-2 font-medium">Dalam Pengiriman</p>
                    </div>
                    {/* Garis Penghubung */}
                    <div className="flex-auto border-t-2 border-gray-300 mx-2"></div>

                    {/* Step 4: Terkirim */}
                    <div className="flex flex-col items-center text-center text-gray-400">
                        <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">📦</div>
                        <p className="text-xs mt-2 font-medium">Terkirim</p>
                    </div>
                </div>
            </div>

            {/* Order Activity */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Order Activity</h3>
                <ul className="border-l-2 border-gray-200 pl-6 space-y-6">
                    {order.activities.map((activity, index) => (
                        <li key={index} className="relative">
                            <span className={`absolute -left-8 top-1 w-4 h-4 rounded-full ${activity.completed ? 'bg-blue-600' : 'bg-gray-300'} border-2 border-white`}></span>
                            <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Daftar Produk */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Product ({productCount})</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk/Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kuantitas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-16 w-16">
                                                {/* Ganti src dengan product.imageUrl */}
                                                <Image src={product.imageUrl} alt={product.name} width={64} height={64} className="rounded-md" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-xs text-gray-500">{product.category}</div>
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">x{product.qty}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{product.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Info Alamat & Catatan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h4 className="text-md font-semibold mb-2">Alamat Penagihan</h4>
                    <address className="text-sm text-gray-600 not-italic">
                        <strong>{order.billingAddress.name}</strong><br />
                        {order.billingAddress.address}<br />
                        <br />
                        <strong>Nomor Telepon:</strong><br />
                        {order.billingAddress.phone}<br />
                        <strong>Email:</strong><br />
                        {order.billingAddress.email}
                    </address>
                </div>
                <div>
                    <h4 className="text-md font-semibold mb-2">Alamat Pengiriman</h4>
                    <address className="text-sm text-gray-600 not-italic">
                        <strong>{order.shippingAddress.name}</strong><br />
                        {order.shippingAddress.address}<br />
                        <br />
                        <strong>Nomor Telepon:</strong><br />
                        {order.shippingAddress.phone}<br />
                        <strong>Email:</strong><br />
                        {order.shippingAddress.email}
                    </address>
                </div>
                <div>
                    <h4 className="text-md font-semibold mb-2">Catatan Pesanan</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">{order.notes}</p>
                </div>
            </div>
        </div>
    );
}