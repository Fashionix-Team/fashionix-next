// app/dashboard/RiwayatPesanan/page.tsx

import Link from 'next/link';
import React from 'react';
// Impor ikon untuk panah paginasi
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// --- Data Dummy (ganti dengan data asli dari API) ---
const mockOrders = [
    { id: '#96459761', status: 'IN PROGRESS', date: 'Dec 30, 2019 05:18', total: '$1,500 (5 Products)' },
    { id: '#71667167', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$60 (10 Products)' },
    { id: '#95214362', status: 'CANCELED', date: 'Mar 20, 2019 23:14', total: '$160 (3 Products)' },
    { id: '#51749385', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$2,300 (2 Products)' },
    { id: '#67397174', status: 'COMPLETED', date: 'Dec 7, 2019 23:26', total: '$220 (1 Products)' },
];
// ----------------------------------------------------

// Komponen kecil untuk Status Badge (Tidak berubah)
const StatusBadge = ({ status }: { status: string }) => {
    let classes = '';
    switch (status.toUpperCase()) {
        case 'IN PROGRESS':
            classes = 'text-yellow-500';
            break;
        case 'COMPLETED':
            classes = 'text-green-500';
            break;
        case 'CANCELED':
            classes = 'text-red-500';
            break;
        default:
            classes = 'bg-gray-100 text-gray-600';
    }
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
            {status}
        </span>
    );
};

// Komponen Paginasi
const Pagination = () => (
    <nav className="flex justify-center items-center mt-6" aria-label="Pagination">
        <ul className="flex items-center space-x-2">
            {/* Tombol Panah Kiri */}
            <li>
                <a 
                    href="#" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-orange-500 border border-orange-500 bg-white hover:bg-orange-50 transition-colors"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" />
                </a>
            </li>
            
            {/* Halaman Aktif */}
            <li>
                <a 
                    href="#" 
                    aria-current="page" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium text-white bg-orange-500 border border-orange-500"
                >
                    01
                </a>
            </li>
            
            {/* Halaman Tidak Aktif */}
            <li>
                <a 
                    href="#" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    02
                </a>
            </li>
            <li>
                <a 
                    href="#" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    03
                </a>
            </li>
            <li>
                <a 
                    href="#" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    04
                </a>
            </li>
            <li>
                <a 
                    href="#" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    05
                </a>
            </li>
            <li>
                <a 
                    href="#" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    06
                </a>
            </li>
            
            {/* Tombol Panah Kanan */}
            <li>
                <a 
                    href="#" 
                    className="flex items-center justify-center h-9 w-9 rounded-full text-orange-500 border border-orange-500 bg-white hover:bg-orange-50 transition-colors"
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" />
                </a>
            </li>
        </ul>
    </nav>
);

export default function RiwayatPesananPage() {
    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Breadcrumbs (Tidak berubah) */}
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li><a href="#" className="text-blue-600 hover:underline">Beranda</a></li>
                    <li><span>&gt;</span></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Akun Pengguna</a></li>
                    <li><span>&gt;</span></li>
                    <li className="text-gray-700">Dasbor</li>
                </ol>
            </nav>

            {/* Kontainer Utama (Tidak berubah) */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                
                {/* Header Tabel (Tidak berubah) */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Pesanan Terbaru</h2>
                        <a href="#" className="text-sm text-orange-500 font-medium hover:text-orange-600">
                            Lihat Semua &rarr;
                        </a>
                </div>

                {/* Tabel Pesanan (Tidak berubah) */}
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
                            {mockOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/dashboard/DetailPesanan/${order.id.replace('#', '')}`} className="text-blue-600 hover:underline">
                                            Lihat Detail &rarr;
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginasi */}
                <Pagination />
            </div>
        </div>
    );
}