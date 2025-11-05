// app/dashboard/DetailPesanan/[id]/page.tsx

import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import {

    ArrowLeftIcon, //Untuk panah kembali

    // Ikon untuk Order Activity
    CheckCircleIcon, // Untuk aktivitas selesai
    UserIcon, // Untuk 'Kurir Mengambil Pesanan'
    MapPinIcon, // Untuk 'Pesanan Tiba di Pusat Distribusi'
    MapIcon, // Untuk 'Pesanan dalam Perjalanan'
    ClipboardDocumentCheckIcon, // Untuk 'Pesanan Diverifikasi'
    
    // Ikon untuk Timeline Status
    ClipboardIcon, // Untuk 'Pesanan Dibuat'
    CubeIcon,      // Untuk 'Pengemasan'
    TruckIcon,     // Untuk 'Dalam Perjalanan'
    CheckBadgeIcon // Untuk 'Terkirim'
} from '@heroicons/react/24/outline';

// --- Data Dummy (ganti dengan data asli dari API) ---
const mockOrderDetails = {
    id: '#96459761',
    placedOn: '17 Januari 2021 pukul 19:32',
    total: 'Rp. 400.000',
    expectedDelivery: '23 Januari 2021',
    status: 'Pengiriman', 
    activities: [
        { text: 'Pesanan Anda telah dikirim. Terima kasih telah berbelanja!', time: '22 Jan, 2021 07:02 PM', completed: true, icon: 'CheckBadgeIcon' },
        { text: 'Kurir kami (John Wick) telah mengambil pesanan Anda untuk dikirim.', time: '21 Jan, 2021 02:00 PM', completed: true, icon: 'UserIcon' },
        { text: 'Pesanan Anda telah tiba di pusat distribusi terakhir.', time: '22 Jan, 2021 08:00 AM', completed: true, icon: 'MapPinIcon' },
        { text: 'Pesanan Anda sedang dalam perjalanan menuju pusat distribusi (last mile).', time: '21 Jan, 2021 05:32 AM', completed: true, icon: 'MapIcon' },
        { text: 'Pesanan Anda berhasil diverifikasi.', time: '20 Jan, 2021 07:32 PM', completed: true, icon: 'CheckCircleIcon' },
        { text: 'Pesanan Anda telah dikonfirmasi.', time: '19 Jan, 2021 02:61 PM', completed: true, icon: 'ClipboardDocumentCheckIcon' },
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

const ActivityIcon = ({ iconName, completed }: { iconName: string, completed: boolean }) => {
    let IconComponent;
    let iconColorClass = completed ? 'text-green-600' : 'text-blue-600';
    let bgColorClass = completed ? 'bg-green-100' : 'bg-blue-100';

    switch (iconName) {
        case 'UserIcon':
            IconComponent = UserIcon;
            iconColorClass = 'text-blue-600';
            bgColorClass = 'bg-blue-100';
            break;
        case 'MapPinIcon':
            IconComponent = MapPinIcon;
            iconColorClass = 'text-blue-600';
            bgColorClass = 'bg-blue-100';
            break;
        case 'MapIcon':
            IconComponent = MapIcon;
            iconColorClass = 'text-blue-600';
            bgColorClass = 'bg-blue-100';
            break;
        case 'ClipboardDocumentCheckIcon':
            IconComponent = ClipboardDocumentCheckIcon;
            iconColorClass = 'text-blue-600';
            bgColorClass = 'bg-blue-100';
            break;
        case 'CheckBadgeIcon':
            IconComponent = CheckBadgeIcon;
            iconColorClass = 'text-green-600';
            bgColorClass = 'bg-green-100';
            break;
        case 'CheckCircleIcon':
        default:
            IconComponent = CheckCircleIcon;
            iconColorClass = 'text-green-600';
            bgColorClass = 'bg-green-100';
            break;
    }

    return (
        <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg ${bgColorClass} z-10`}>
            <IconComponent className={`h-5 w-5 ${iconColorClass}`} />
        </div>
    );
};


type DetailPesananPageProps = {
    params: { id: string };
};

export default function DetailPesananPage({ params }: DetailPesananPageProps) {
    const order = mockOrderDetails; 
    const productCount = order.products.length;

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                {/* Breadcrumbs dan Header */}
                <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex space-x-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Beranda</a></li>
                        <li><span>&gt;</span></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Akun Pengguna</a></li>
                        <li><span>&gt;</span></li>
                        <li><Link href="/dashboard/RiwayatPesanan" className="text-blue-600 hover:underline">Riwayat Pesanan</Link></li>
                        <li><span>&gt;</span></li>
                        <li className="text-gray-700">Detail Pesanan</li>
                    </ol>
                </nav>

                {/* Kotak Putih Utama (Section) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

                    {/* Header Detail Pesanan (dengan panah kembali) */}
                    <div className="flex justify-between items-center mb-6">
                        <Link href="/dashboard/RiwayatPesanan" className="flex items-center text-lg font-medium text-gray-800 hover:text-blue-600 group">
                            <ArrowLeftIcon className="h-5 w-5 mr-3 transition-transform group-hover:-translate-x-1" />
                            <span className="uppercase">Detail Pesanan</span>
                        </Link>
                        {/* Link "Beri Penilaian" diubah warnanya */}
                        <a href="#" className="text-sm text-orange-500 font-medium hover:text-orange-600">
                            Beri Penilaian +
                        </a>
                </div>

                <hr className="mb-6" />

                {/* Kotak Info Pesanan (Sama) */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{order.id}</h2>
                        <p className="text-sm text-gray-600">{`${productCount} Produk • Dipesan pada ${order.placedOn}`}</p>
                        
                    </div>
                    <div className="text-right">
                        {/* Harga diubah warnanya menjadi biru */}
                        <span className="text-2xl font-bold text-blue-500">{order.total}</span>
                    </div>
                </div>

                {/* PERBAIKAN 7: Teks ekspektasi pengiriman DIPINDAH ke sini */}
                <p className="text-sm text-gray-600 mb-8">
                    {`Pesanan diperkirakan tiba pada ${order.expectedDelivery}`}
                </p>

                {/* Timeline Status (Sama) */}
                <div className="w-full mb-8">
                    <div className="flex items-center">
                        {/* Step 1: Pesanan Dibuat */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">
                                {/* Mengganti '✔' dengan ikon */}
                                <ClipboardIcon className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-xs mt-2 font-medium">Pesanan Dibuat</p>
                        </div>
                        {/* Garis Penghubung */}
                        <div className="flex-auto border-t-2 border-orange-500 mx-2"></div>
                        
                        {/* Step 2: Pengemasan */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">
                                {/* Mengganti '✔' dengan ikon */}
                                <CubeIcon className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-xs mt-2 font-medium">Pengemasan</p>
                        </div>
                        {/* Garis Penghubung */}
                        <div className="flex-auto border-t-2 border-orange-500 mx-2"></div>

                        {/* Step 3: Dalam Pengiriman */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">
                                <TruckIcon className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-xs mt-2 font-medium">Dalam Pengiriman</p>
                        </div>
                        {/* Garis Penghubung */}
                        <div className="flex-auto border-t-2 border-gray-300 mx-2"></div>

                        {/* Step 4: Terkirim */}
                        <div className="flex flex-col items-center text-center text-gray-400">
                            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                                <CheckBadgeIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-xs mt-2 font-medium">Terkirim</p>
                        </div>
                    </div>
                </div>

                {/* Order Activity */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-6">Order Activity</h3>
                    
                    {/* Bungkus 'ul' dengan 'div' relatif untuk garis timeline */}
                    <div className="relative">
                        {/* Garis Timeline Vertikal (dibuat dengan div) */}
                        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200" style={{ zIndex: 0 }}></div>

                        <ul className="space-y-8">
                            {order.activities.map((activity, index) => (
                                <li key={index} className="relative pl-16">
                                    {/* Panggil komponen Ikon baru kita */}
                                    <ActivityIcon iconName={activity.icon} completed={activity.completed} />
                                    
                                    {/* Konten Teks */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Daftar Produk (Sama) */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Product ({productCount})</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk-Produk</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kuantitas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sub-total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-16">
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

                {/* Info Alamat & Catatan (Sama) */}
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
        </div>
    );
}