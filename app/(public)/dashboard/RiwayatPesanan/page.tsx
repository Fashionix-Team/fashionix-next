// app/dashboard/RiwayatPesanan/RiwayatPesananpage.tsx

import Link from 'next/link';
import React from 'react';

// --- Data Dummy (ganti dengan data asli dari API) ---
const mockOrders = [
    { id: '#96459761', status: 'IN PROGRESS', date: 'Dec 30, 2019 05:18', total: '$1,500 (5 Products)' },
    { id: '#71667167', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$60 (10 Products)' },
    { id: '#95214362', status: 'CANCELED', date: 'Mar 20, 2019 23:14', total: '$160 (3 Products)' },
    { id: '#51749385', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$2,300 (2 Products)' },
    { id: '#67397174', status: 'COMPLETED', date: 'Dec 7, 2019 23:26', total: '$220 (1 Products)' },
];
// ----------------------------------------------------

// Komponen kecil untuk Status Badge
const StatusBadge = ({ status }: { status: string }) => {
    let classes = '';
    switch (status.toUpperCase()) {
        case 'IN PROGRESS':
            classes = 'bg-yellow-100 text-yellow-700';
            break;
        case 'COMPLETED':
            classes = 'bg-green-100 text-green-700';
            break;
        case 'CANCELED':
            classes = 'bg-red-100 text-red-700';
            break;
        default:
            classes = 'bg-gray-100 text-gray-700';
    }
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
            {status}
        </span>
    );
};

// Komponen Paginasi Sederhana
const Pagination = () => (
    <nav className="flex justify-between items-center mt-6" aria-label="Pagination">
        <div className="text-sm text-gray-500">
            {/* Teks info (opsional) */}
        </div>
        <ul className="flex items-center space-x-1">
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                    &larr; {/* Panah Kiri */}
                </a>
            </li>
            <li><a href="#" aria-current="page" className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-md">01</a></li>
            <li><a href="#" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">02</a></li>
            <li><a href="#" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">03</a></li>
            <li><a href="#" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">04</a></li>
            <li><a href="#" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">05</a></li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                    &rarr; {/* Panah Kanan */}
                </a>
            </li>
        </ul>
    </nav>
);

export default function RiwayatPesananPage() {
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
                
                {/* Header Tabel */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Pesanan Terbaru</h2>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Lihat Semua</a>
                </div>

                {/* Tabel Pesanan */}
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
                                        <Link href={`/dashboard/DetailPesanan/${order.id.replace('id', '')}`} className="text-blue-600 hover:underline">
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