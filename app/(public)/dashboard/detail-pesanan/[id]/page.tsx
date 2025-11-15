import React, { ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    CheckCircleIcon,
    UserIcon,
    MapPinIcon,
    BookOpenIcon,
    ClipboardDocumentCheckIcon,
    ClipboardIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

import { getCustomerOrderDetail, CustomerOrderDetail } from '@/lib/bagisto/index';

const ActivityIcon = ({ iconName, completed }: { iconName: string, completed: boolean }) => {
    let IconComponent: ElementType; 
    let iconColorClass = completed ? 'text-green-600' : 'text-blue-600';
    let bgColorClass = completed ? 'bg-green-100' : 'bg-blue-100';

    switch (iconName) {
        case 'UserIcon': IconComponent = UserIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
        case 'MapPinIcon': IconComponent = MapPinIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
        case 'BookOpenIcon': IconComponent = BookOpenIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
        case 'ClipboardDocumentCheckIcon': IconComponent = ClipboardDocumentCheckIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
        case 'CheckCircleIcon': IconComponent = CheckCircleIcon; iconColorClass = 'text-green-600'; bgColorClass = 'bg-green-100'; break;
        default: IconComponent = ClipboardIcon; iconColorClass = 'text-gray-600'; bgColorClass = 'bg-gray-100'; break;
    }
    return (
        <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg ${bgColorClass} z-10`}>
            <IconComponent className={`h-5 w-5 ${iconColorClass}`} />
        </div>
    );
};
// --- (Selesai Komponen Helper) ---


/**
 * Fungsi "Adapter" untuk mengubah data backend
 * menjadi format yang diharapkan oleh UI (mockOrderDetails)
 */
function transformOrderData(order: CustomerOrderDetail) {
    
    // 1. Transformasi 'activities' dari 'comments'
    const activities = order.comments.map(comment => {
        // Logika sederhana untuk menebak ikon dari teks komentar
        let icon = 'ClipboardIcon'; // Default
        if (comment.comment.includes('dikirim')) icon = 'TruckIcon';
        if (comment.comment.includes('dikonfirmasi')) icon = 'ClipboardDocumentCheckIcon';
        if (comment.comment.includes('diverifikasi')) icon = 'CheckCircleIcon';

        return {
            text: comment.comment,
            time: new Date(comment.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' PM', // Format waktu
            completed: true, // Asumsikan semua komentar adalah 'completed'
            icon: icon
        };
    });

    // 2. Transformasi 'products' dari 'items'
    const products = order.items.map(item => ({
        id: item.id,
        name: item.name,
        category: item.product.categories[0]?.name.toUpperCase() || 'PRODUK',
        price: item.formattedPrice.price || '0',
        qty: item.qtyOrdered,
        subtotal: item.formattedPrice.total || '0',
        imageUrl: item.product.images[0]?.url || 'https://placehold.co/100x100' // Placeholder
    }));

    // 3. Kembalikan data yang sudah ditransformasi
    return {
        id: order.incrementId || order.id,
        placedOn: new Date(order.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        total: order.formattedPrice.grandTotal || 'Rp 0',
        expectedDelivery: '...',
        status: order.statusLabel || 'Unknown',
        activities: activities.reverse(),
        products: products,
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
        notes: "Catatan tidak tersedia dari API"
    };
}


type DetailPesananPageProps = {
    params: { id: string };
};

// Jadikan komponen 'async' untuk 'await'
export default async function DetailPesananPage({ params }: DetailPesananPageProps) {
    
    let orderData;
    let fetchError: string | null = null;

    try {
        // 3. PEMANGGILAN FUNGSI
        // Panggil "pelayan" (getCustomerOrderDetail) di server
        const orderResult = await getCustomerOrderDetail(params.id);

        if (!orderResult) {
            throw new Error("Pesanan tidak ditemukan.");
        }
        
        // Ubah data backend (orderResult) menjadi format UI
        orderData = transformOrderData(orderResult);

    } catch (e: any) {
        fetchError = e.message || "Gagal memuat detail pesanan.";
    }

    // Tampilkan pesan error jika fetch gagal
    if (fetchError || !orderData) {
        return (
            <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h1 className="text-xl font-semibold text-red-500">Terjadi Kesalahan</h1>
                    <p className="text-gray-600 mt-2">{fetchError}</p>
                    <Link href="/dashboard/RiwayatPesanan" className="text-blue-600 mt-4 inline-block">
                        &larr; Kembali ke Riwayat Pesanan
                    </Link>
                </div>
            </div>
        );
    }
    
    // Jika berhasil, 'orderData' akan berisi data yang sudah ditransformasi
    // Kita ganti semua 'order.' menjadi 'orderData.'
    const order = orderData; 
    const productCount = order.products.length;

    return (
        // Latar belakang abu-abu
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li><a href="#" className="text-blue-600 hover:underline">Beranda</a></li>
                    <li><span>&gt;</span></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Akun Pengguna</a></li>
                    <li><span>&gt;</span></li>
                    <li><Link href="/dashboard/RiwayatPesanan" className="text-blue-600 hover:underline">Dasbor</Link></li>
                    <li><span>&gt;</span></li>
                    <li className="text-gray-700">Detail Pesanan</li>
                </ol>
            </nav>

            {/* Kotak Putih Utama (Section) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

                {/* Header Detail Pesanan */}
                <div className="flex justify-between items-center mb-6">
                    <Link href="/dashboard/RiwayatPesanan" className="flex items-center text-lg font-medium text-gray-800 hover:text-blue-600 group">
                        <ArrowLeftIcon className="h-5 w-5 mr-3 transition-transform group-hover:-translate-x-1" />
                        <span className="uppercase">Detail Pesanan</span>
                    </Link>
                    <a href="#" className="text-sm text-orange-500 font-medium hover:text-orange-600">
                        Beri Penilaian +
                    </a>
                </div>

                <hr className="mb-6" />

                {/* Kotak Info Pesanan */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">#{order.id}</h2>
                        <p className="text-sm text-gray-600">{`${productCount} Produk • Dipesan pada ${order.placedOn}`}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">{order.total}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-8">
                    Status Pesanan Saat Ini: <span className="font-semibold">{order.status}</span>
                </p>

                {/* Timeline Status (Ini masih statis, perlu logika status nanti) */}
                <div className="w-full mb-8">
                    {/* ... (kode timeline Anda) ... */}
                </div>

                {/* Order Activity (Sekarang dinamis dari 'order.comments') */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-6">Order Activity</h3>
                    <div className="relative">
                        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200" style={{ zIndex: 0 }}></div>
                        <ul className="space-y-8">
                            {order.activities.length === 0 ? (
                                <p className="text-sm text-gray-500 pl-16">Tidak ada aktivitas pesanan.</p>
                            ) : (
                                order.activities.map((activity, index) => (
                                    <li key={index} className="relative pl-16">
                                        <ActivityIcon iconName={activity.icon} completed={activity.completed} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                {/* Daftar Produk (Sekarang dinamis dari 'order.items') */}
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

                {/* Info Alamat (Sekarang dinamis) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-md font-semibold mb-2">Alamat Penagihan</h4>
                        <address className="text-sm text-gray-600 not-italic">
                            <strong>{order.billingAddress.firstName} {order.billingAddress.lastName}</strong><br />
                            {order.billingAddress.address}<br />
                            {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postcode}<br />
                            {order.billingAddress.country}<br />
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
                            <strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong><br />
                            {order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postcode}<br />
                            {order.shippingAddress.country}<br />
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