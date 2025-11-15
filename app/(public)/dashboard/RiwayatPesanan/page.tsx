// app/dashboard/RiwayatPesanan/page.tsx
// (Nama file Anda yang benar seharusnya 'page.tsx' di dalam folder 'RiwayatPesanan')

import Link from 'next/link';
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Impor fungsi "pelayan" dan tipe data dari index.ts
import { getCustomerOrders, CustomerOrder, PaginatorInfo } from '@/lib/bagisto/index';

// Komponen StatusBadge (Tidak berubah)
const StatusBadge = ({ status }: { status: string }) => {
    let classes = '';
    switch (status?.toUpperCase()) {
        case 'IN PROGRESS': classes = 'bg-yellow-100 text-yellow-700'; break;
        case 'COMPLETED': classes = 'bg-green-100 text-green-700'; break;
        case 'PROCESSING': classes = 'bg-blue-100 text-blue-700'; break;
        case 'CANCELED': classes = 'bg-red-100 text-red-700'; break;
        default: classes = 'bg-gray-100 text-gray-700';
    }
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
            {status || 'N/A'}
        </span>
    );
};

// Komponen Paginasi (Diperbarui untuk Server Component)
const Pagination = ({ currentPage, lastPage }: { currentPage: number, lastPage: number }) => {
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
    
    // Fungsi helper untuk membuat link
    const getPageLink = (page: number) => {
        if (page < 1 || page > lastPage) return '#';
        return `/dashboard/RiwayatPesanan?page=${page}`;
    };

    return (
        <nav className="flex justify-center items-center mt-6" aria-label="Pagination">
            <ul className="flex items-center space-x-2">
                {/* Tombol Panah Kiri */}
                <li>
                    <Link 
                        href={getPageLink(currentPage - 1)}
                        // nonaktifkan jika halaman pertama
                        className={`flex items-center justify-center h-9 w-9 rounded-full text-orange-500 border border-orange-500 bg-white hover:bg-orange-50 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </Link>
                </li>
                
                {/* Tombol Halaman */}
                {pages.map(page => (
                    <li key={page}>
                        <Link 
                            href={getPageLink(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium ${
                                page === currentPage
                                ? 'text-white bg-orange-500 border border-orange-500'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}
                
                {/* Tombol Panah Kanan */}
                <li>
                    <Link 
                        href={getPageLink(currentPage + 1)}
                        // nonaktifkan jika halaman terakhir
                        className={`flex items-center justify-center h-9 w-9 rounded-full text-orange-500 border border-orange-500 bg-white hover:bg-orange-50 ${currentPage === lastPage ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};


// --- Komponen Halaman Utama (Server Component) ---
export default async function RiwayatPesananPage({ 
    searchParams 
}: { 
    searchParams: { page?: string } 
}) {
    
    // 1. Dapatkan halaman saat ini dari URL (misal: ...?page=2)
    const currentPage = parseInt(searchParams?.page || '1');

    // 2. Panggil "pelayan" (getCustomerOrders) langsung di server
    let fetchError: string | null = null;
    let orders: CustomerOrder[] = [];
    let paginatorInfo: PaginatorInfo | null = null;

    try {
        const response = await getCustomerOrders(currentPage, 10);
        orders = response.data;
        paginatorInfo = response.paginatorInfo;
    } catch (e: any) {
        // Ini akan menangkap error dari 'console.error' di 'index.ts'
        fetchError = e.message || "Gagal memuat pesanan. Pastikan Anda sudah login.";
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li><a href="#" className="text-blue-600 hover:underline">Beranda</a></li>
                    <li><span>&gt;</span></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Akun Pengguna</a></li>
                    <li><span>&gt;</span></li>
                    <li className="text-gray-700">Dasbor</li>
                </ol>
            </nav>

            {/* Kontainer Utama */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Pesanan Terbaru</h2>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Lihat Semua</a>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pesanan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            
                            {fetchError ? (
                                <tr><td colSpan={2} className="text-center py-10 text-red-500">{fetchError}</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={2} className="text-center py-10 text-gray-500">Anda belum memiliki riwayat pesanan.</td></tr>
                            ) : (
                                // Mapping data sederhana
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order.incrementId || order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link href={`/dashboard/DetailPesanan/${order.id}`} className="text-blue-600 hover:underline">
                                                Lihat Detail &rarr;
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tampilkan paginasi */}
                {paginatorInfo && paginatorInfo.lastPage > 1 && !fetchError && (
                    <Pagination 
                        currentPage={paginatorInfo.currentPage}
                        lastPage={paginatorInfo.lastPage}
                    />
                )}
            </div>
        </div>
    );
}