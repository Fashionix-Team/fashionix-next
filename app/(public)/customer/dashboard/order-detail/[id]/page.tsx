"use client";

import React, { ElementType, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CustomerOrderDetail } from '@/lib/bagisto/types/order';
import { NOT_IMAGE } from '@/lib/constants';
import {
    CheckCircleIcon, UserIcon, MapPinIcon, MapIcon,
    ClipboardDocumentCheckIcon, ClipboardIcon,
    ArchiveBoxIcon, TruckIcon, CheckBadgeIcon, ArrowLeftIcon
} from '@heroicons/react/24/outline';
import RatingModal from '@/components/customer/rating-modal';
import { fetchOrderDetail } from './actions';

/**
 * Interface untuk transformed order data
 */
interface TransformedActivity {
    text: string;
    time: string;
    completed: boolean;
    icon: string;
}

interface TransformedProduct {
    id: string;
    productId: string;
    name: string;
    category: string;
    price: string;
    qty: number;
    subtotal: string;
    imageUrl: string;
}

interface TransformedAddress {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
    email: string;
}

interface TransformedOrderData {
    id: string;
    placedOn: string;
    total: string;
    statusKey: string;
    expectedDelivery: string;
    statusLabel: string;
    activities: TransformedActivity[];
    products: TransformedProduct[];
    billingAddress: TransformedAddress;
    shippingAddress: TransformedAddress;
    notes: string;
}


/**
 * Komponen ActivityIcon
 * (Diambil dari kode baru karena memiliki lebih banyak ikon)
 */
const ActivityIcon = ({ iconName, completed }: { iconName: string, completed: boolean }) => {
    let IconComponent: ElementType; 
    let iconColorClass = completed ? 'text-green-600' : 'text-blue-600';
    let bgColorClass = completed ? 'bg-green-100' : 'bg-blue-100';

    switch (iconName) {
        case 'UserIcon': IconComponent = UserIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
        case 'ArchiveBoxIcon': IconComponent = ArchiveBoxIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
        case 'MapPinIcon': IconComponent = MapPinIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
        case 'MapIcon': IconComponent = MapIcon; iconColorClass = 'text-blue-600'; bgColorClass = 'bg-blue-100'; break;
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
 * Fungsi "Adapter" transformOrderData
 * (Diambil dari kode baru karena lebih canggih, DENGAN perbaikan NOT_IMAGE)
 */
function transformOrderData(order: CustomerOrderDetail): TransformedOrderData {
    
    // 1. Transformasi 'activities' dari 'comments' (Logika baru)
    const activities = order.comments.map(comment => {
        let icon = 'ClipboardIcon';
        const lowerCaseComment = comment.comment.toLowerCase();

        if (lowerCaseComment.includes('kurir kami')) {
            icon = 'UserIcon';
        } else if (lowerCaseComment.includes('sedang dikemas')) {
            icon = 'ArchiveBoxIcon';
        } else if (lowerCaseComment.includes('distribusi')) {
            icon = 'MapPinIcon';
        } else if (lowerCaseComment.includes('perjalanan')) {
            icon = 'MapIcon';
        } else if (lowerCaseComment.includes('dikonfirmasi')) {
            icon = 'ClipboardDocumentCheckIcon';
        } else if (lowerCaseComment.includes('diverifikasi')) {
            icon = 'CheckCircleIcon';
        } else if (lowerCaseComment.includes('telah dikirim')) {
            icon = 'CheckCircleIcon';
        }

        return {
            text: comment.comment,
            time: new Date(comment.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            completed: true, 
            icon: icon
        };
    });

    // 2. Transformasi 'products' dari 'items'
    const products = order.items.map(item => ({
        id: item.id,
        productId: item.product.id,
        name: item.name,
        category: item.product.categories[0]?.name.toUpperCase() || 'PRODUK',
        price: item.formattedPrice.price || '0',
        qty: item.qtyOrdered,
        subtotal: item.formattedPrice.total || '0',
        imageUrl: item.product.images[0]?.url || NOT_IMAGE, // Menggunakan NOT_IMAGE dari file asli
    }));
    
    const formatAddress = (addr: any) => ({
        ...addr,
        address: addr.address 
    });

    // 3. Transformasi label status (Fitur dari kode baru)
    let uiStatusLabel = order.statusLabel || 'Unknown';
    
    if (order.status === 'pending') {
        uiStatusLabel = 'Sedang Dikemas';
    } else if (order.status === 'processing') {
        uiStatusLabel = 'Dalam Pengiriman'; 
    } else if (order.status === 'completed' || order.status === 'closed') {
        uiStatusLabel = 'Terkirim';
    }

    // 4. Kembalikan data yang sudah ditransformasi
    return {
        id: order.incrementId || order.id,
        placedOn: new Date(order.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        total: order.formattedPrice.grandTotal || 'Rp 0',
        statusKey: order.status, // Dari kode baru (penting untuk stepper)
        expectedDelivery: '...', 
        statusLabel: uiStatusLabel, // Dari kode baru
        activities: activities.reverse(),
        products: products,
        billingAddress: formatAddress(order.billingAddress), 
        shippingAddress: formatAddress(order.shippingAddress), 
        notes: "Catatan tidak tersedia dari API"
    };
}


type DetailPesananPageProps = {
    params: Promise<{ id: string }>;
};

// --- Komponen Halaman Utama (Client Component) ---
export default function DetailPesananPage({ params }: DetailPesananPageProps) {
    const [orderData, setOrderData] = useState<TransformedOrderData | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    useEffect(() => {
        async function loadOrderData() {
            try {
                setIsLoading(true);
                // Await params before accessing its properties (Next.js 15+)
                const resolvedParams = await params;
                
                // Call server action to fetch order detail
                const result = await fetchOrderDetail(resolvedParams.id);
                
                if (result.error || !result.data) {
                    throw new Error(result.error || "Pesanan tidak ditemukan.");
                }
                
                // Panggil fungsi transformOrderData
                const transformedData = transformOrderData(result.data);
                setOrderData(transformedData);
            } catch (e: any) {
                setFetchError(e.message || "Gagal memuat detail pesanan.");
            } finally {
                setIsLoading(false);
            }
        }

        loadOrderData();
    }, [params]);

    // Loading state
    if (isLoading) {
        return (
            <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat detail pesanan...</p>
                </div>
            </div>
        );
    }

    // Tampilkan pesan error jika fetch gagal
    // (Diambil dari kode baru, karena link 'Kembali' sudah update)
    if (fetchError || !orderData) {
        return (
            <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex space-x-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Beranda</a></li>
                        <li><span>&gt;</span></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Akun Pengguna</a></li>
                        <li><span>&gt;</span></li>
                        <li><Link href="/customer/dashboard/order-history" className="text-blue-600 hover:underline">Dashboard</Link></li>
                        <li><span>&gt;</span></li>
                        <li className="text-gray-700">Detail Pesanan</li>
                    </ol>
                </nav>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h1 className="text-xl font-semibold text-red-500">Terjadi Kesalahan</h1>
                    <p className="text-gray-600 mt-2">{fetchError}</p>
                    <Link href="/customer/dashboard/order-history" className="text-blue-600 mt-4 inline-block">
                        &larr; Kembali ke Riwayat Pesanan
                    </Link>
                </div>
            </div>
        );
    }
    
    // --- Variabel untuk state sukses (diambil dari kode baru) ---
    const order = orderData; 
    const productCount = order.products.length;

    const statusLevels: { [key: string]: number } = {
        'pending': 1,    
        'processing': 2,
        'shipping': 2,   
        'completed': 3,    
        'closed': 3,
        'canceled': -1,
    };
    
    const currentStatusLevel = statusLevels[order.statusKey] || 0;

    const getStepClasses = (stepLevel: number) => {
        const isActive = currentStatusLevel >= stepLevel;
        return {
            iconWrapper: isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400',
            icon: isActive ? 'text-white' : 'text-gray-400',
            line: isActive ? 'border-orange-500' : 'border-gray-300',
            text: isActive ? 'text-gray-800' : 'text-gray-400',
        };
    };

    const step1 = getStepClasses(1);
    const step2 = getStepClasses(2);
    const step3 = getStepClasses(3);

    // --- Render JSX untuk state sukses ---
    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            
            {/* Breadcrumb (Diambil dari file asli, tapi link di-update) */}
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li><Link href="/" className="text-blue-600 hover:underline">Beranda</Link></li>
                    <li><span>&gt;</span></li>
                    <li><Link href="/customer/account" className="text-blue-600 hover:underline">Akun Pengguna</Link></li>
                    <li><span>&gt;</span></li>
                    {/* Link ini di-update ke /dashboard... dari kode baru */}
                    <li><Link href="/customer/dashboard" className="text-blue-600 hover:underline">Dashboard</Link></li>
                    <li><span>&gt;</span></li>
                    <li className="text-gray-700">Detail Pesanan</li>
                </ol>
            </nav>

            {/* Kotak Putih Utama (Section) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

                {/* Header Detail Pesanan (Link di-update ke /dashboard...) */}
                <div className="flex justify-between items-center mb-6">
                    <Link href="/customer/dashboard/order-history" className="flex items-center text-lg font-medium text-gray-800 hover:text-blue-600 group">
                        <ArrowLeftIcon className="h-5 w-5 mr-3 transition-transform group-hover:-translate-x-1" />
                        <span className="uppercase">Detail Pesanan</span>
                    </Link>
                    <button
                        onClick={() => setIsRatingModalOpen(true)}
                        className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors hover:cursor-pointer"
                    >
                        Beri Penilaian +
                    </button>
                </div>

                <hr className="mb-6" />

                {/* Kotak Info Pesanan (Identik) */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">#{order.id}</h2>
                        <p className="text-sm text-gray-600">{`${productCount} Produk • Dipesan pada ${order.placedOn}`}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">{order.total}</span>
                    </div>
                </div>

                {/* Status Pesanan (Menggunakan order.statusLabel dari kode baru) */}
                <p className="text-sm text-gray-600 mb-8">
                    Status Pesanan Saat Ini: <span className="font-semibold">{order.statusLabel}</span>
                </p>

                {/* Timeline Status (Stepper dinamis dari kode baru) */}
                <div className="w-full mb-8">
                    <div className="flex items-center">
                        
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full ${step1.iconWrapper} flex items-center justify-center`}>
                                <ArchiveBoxIcon className={`h-6 w-6 ${step1.icon}`} />
                            </div>
                            <p className={`text-xs mt-2 font-medium ${step1.text}`}>Pengemasan</p>
                        </div>

                        <div className={`flex-auto border-t-2 ${step2.line} mx-2`}></div>

                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full ${step2.iconWrapper} flex items-center justify-center`}>
                                <TruckIcon className={`h-6 w-6 ${step2.icon}`} />
                            </div>
                            <p className={`text-xs mt-2 font-medium ${step2.text}`}>Dalam Pengiriman</p>
                        </div>

                        <div className={`flex-auto border-t-2 ${step3.line} mx-2`}></div>

                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full ${step3.iconWrapper} flex items-center justify-center`}>
                                <CheckBadgeIcon className={`h-6 w-6 ${step3.icon}`} />
                            </div>
                            <p className={`text-xs mt-2 font-medium ${step3.text}`}>Terkirim</p>
                        </div>
                    </div>
                </div>

                {/* Order Activity (Identik, diambil dari file asli) */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-6">Aktivitas Pesanan</h3>
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

                {/* Daftar Produk (Identik, diambil dari file asli) */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Produk ({productCount})</h3>
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

                {/* Info Alamat (Identik, diambil dari file asli) */}
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

            {/* Rating Modal */}
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                orderId={order.id}
                products={order.products.map((p) => ({
                    id: p.productId,
                    name: p.name,
                    category: p.category,
                    imageUrl: p.imageUrl,
                }))}
            />
        </div>
    );
}