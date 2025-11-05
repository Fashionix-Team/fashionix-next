'use client';

import Link from "next/link"; 
import { useMemo } from "react";

import { MapIcon } from "@/components/icons/map-icon";
import  EarphoneIcon from "@/components/icons/service/earphone-icon";
import ShoppingCartIcon from "@/components/icons/shopping-cart"; 
import { RocketIcon } from "@/components/icons/roket";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CubeIcon } from "@/components/icons/cube";

// Interface tetap sama
interface DashboardUser {
  id: string;
  name?: string | null;
  email?: string | null;
  firstName: string;
  lastName: string;
  accessToken?: string;
  role?: string;
phone?: number;
}

interface DashboardContentProps {
 user: DashboardUser; 
 summary: {
    totalOrders: number;
    pendingOrders: number;
    defaultAddress: string;
    totalWishlist: number;
   };
}

// Interface Pesanan Terbaru
interface LatestOrder {
    id: string;
    orderId: string;
    date: string;
    status: 'PENDING' | 'IN PROGRESS' | 'COMPLETED' | 'CANCELED';
    total: string;
    link: string;
    productCount: number;
}

// Komponen Card yang dapat digunakan kembali untuk konsistensi visual
const DashboardCard = ({ title, children, linkHref, linkText }: { title: string, children: React.ReactNode, linkHref: string, linkText: string }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-between">
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                {title}
            </h2>
            {children}
        </div>
        <Link 
            href={linkHref}
            className="w-50 flex justify-center text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white 
                       border border-blue-600 dark:border-blue-400 
                       hover:bg-blue-600 dark:hover:bg-blue-400 
                       text-sm font-medium mt-4 items-center 
                       px-4 py-2 rounded-lg transition duration-200 ease-in-out" // Tambahkan padding & rounded-lg
        >
            {linkText}
        </Link>
    </div>
);

// ✅ Komponen Kartu Ringkasan
const SummaryListCard = ({ title, value, linkHref, icon, bgColor }: { title: string, value: string | number, linkHref: string, icon: React.ReactNode, bgColor: string }) => (
    <Link 
        href={linkHref} 
        className={`${bgColor} p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition duration-200`}
    >
        <div className="flex items-center space-x-3">
            <div className="text-blue-400 dark:text-blue-400">{icon}</div>
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">{title}</p>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </Link>
);

// ✅ KOMPONEN BARU: Menampilkan Daftar Pesanan Terbaru (SESUAI GAMBAR)
const LatestOrdersSection = () => {
    // Data Dummy untuk Pesanan (SESUAI GAMBAR)
    const latestOrders: LatestOrder[] = useMemo(() => [
        { 
            id: '1', 
            orderId: '#96459761', 
            date: 'Dec 30, 2019 05:18', 
            status: 'IN PROGRESS', 
            total: '$1,500', 
            productCount: 5,
            link: '/customer/orders/96459761' 
        },
        { 
            id: '2', 
            orderId: '#96459760', 
            date: 'Dec 29, 2019 12:45', 
            status: 'COMPLETED', 
            total: '$850', 
            productCount: 3,
            link: '/customer/orders/96459760' 
        },
        { 
            id: '3', 
            orderId: '#96459759', 
            date: 'Dec 28, 2019 09:30', 
            status: 'CANCELED', 
            total: '$320', 
            productCount: 2,
            link: '/customer/orders/96459759' 
        },
        { 
            id: '4', 
            orderId: '#96459758', 
            date: 'Dec 27, 2019 16:20', 
            status: 'COMPLETED', 
            total: '$1,200', 
            productCount: 4,
            link: '/customer/orders/96459758' 
        },
    ], []);

    // Fungsi untuk mendapatkan warna status (SESUAI GAMBAR)
    const getStatusColor = (status: LatestOrder['status']) => {
        switch (status) {
            case 'COMPLETED': return 'text-green-400';
            case 'PENDING': return 'text-yellow-400';
            case 'IN PROGRESS': return 'text-orange-400';
            case 'CANCELED': return 'text-red-400';
            default: return 'text-gray-800';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between px-6 py-4 items-center mb-2 pb-2 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">PESANAN TERBARU</h2>
                    <Link 
                    href="/customer/orders" 
                    className="text-orange-400 dark:text-blue-400 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                >
                    Lihat Semua
                </Link>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Table Header */}
                    <thead className="bg-gray-200 dark:bg-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                ID Pesanan
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Tanggal
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Tindakan
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {latestOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                {/* Order ID */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                            <ShoppingCartIcon />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {order.orderId}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {order.date}
                                </td>

                                {/* Total */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {order.total} ({order.productCount} Products)
                                </td>

                                {/* Action */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link 
                                        href={order.link}
                                        className="text-blue-400 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Lihat Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Jika tidak ada pesanan */}
            {latestOrders.length === 0 && (
                <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Anda belum memiliki pesanan.
                </div>
            )}
        </div>
    );
};


export default function DashboardContent({ user, summary }: DashboardContentProps) {
  const enhancedSummary = useMemo(() => ({
        ...summary,
        COMPLETEDOrders: summary.totalOrders - summary.pendingOrders > 0 ? summary.totalOrders - summary.pendingOrders : 0, // Data dummy
    }), [summary]);

    // Data untuk 3 Kartu Ringkasan Pesanan
    const orderSummaryCards = useMemo(() => [
        {
            title: 'Total Pesanan',
            value: enhancedSummary.totalOrders, 
            linkHref: '/customer/orders',
            icon: <RocketIcon className="w-6 h-20" />,
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Pesanan Tertunda',
            value: enhancedSummary.pendingOrders, 
            linkHref: '/customer/orders?status=PENDING',
            icon: <EnvelopeIcon className="w-6 h-20 text-yellow-500" />,
            bgColor: "bg-orange-100"
        },
        {
            title: 'Pesanan Selesai',
            value: enhancedSummary.COMPLETEDOrders, 
            linkHref: '/customer/orders?status=COMPLETED',
            icon: <CubeIcon className="w-6 h-20 text-green-500" />,
            bgColor: "bg-green-100"
        },
    ], [enhancedSummary]);

  return (

    <div className="space-y-10">
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl">
            Dari dasbor akun Anda, Anda dapat dengan mudah memeriksa dan melihat Pesanan Terbaru, mengelola Alamat Pengiriman dan Penagihan serta mengedit Kata Sandi dan Detail Akun Anda.
        </p>
        
        {/* Kontainer untuk 2 Section Info Akun dan Alamat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. SECTION: Informasi Akun */}
           <DashboardCard
                title="Informasi Akun"
                linkHref="/customer/account"
                linkText="Edit Akun"
            >
                <div className="space-y-4">
                    
                    <div className="flex items-center space-x-4 pb-2">
                        {/* Foto Profil (Placeholder Circle/Avatar) */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {/* Ikon User Placeholder */}
                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        {/* Nama Lengkap */}
                        <div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {user.firstName} {user.lastName || ''}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Status: Pelanggan
                            </p>
                        </div>
                    </div>

                    {/* 2. Baris: Email */}
                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        {/* Ikon Email */}
                        <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <span>
                            {user.email || 'Email tidak tersedia'}
                        </span>
                    </p>

                    {/* 3. Baris: Telepon */}
                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        {/* Ikon Telepon */}
                        <EarphoneIcon className="w-5 h-5 mr-3 text-gray-500" />
                        <span>
                            {user.phone || 'Telepon tidak tersedia'}
                        </span>
                    </p>
                </div>
            </DashboardCard>

            {/* 2. SECTION: Alamat Default */}
            <DashboardCard
                title="ALAMAT"
                linkHref="/customer/addresses"
                linkText="Edit Alamat"
            >
                <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {user.firstName} {user.lastName || ''}
                            </p>

                    <p className="text-gray-700 dark:text-gray-300 flex items-start">
                        <MapIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                        <span>
                            {summary.defaultAddress || 'Belum ada alamat default'}
                        </span>
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        {/* Ikon Telepon */}
                        <EarphoneIcon className="w-5 h-5 mr-3 text-gray-500" />
                        <span>
                            {user.phone || 'Telepon tidak tersedia'}
                        </span>
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        {/* Ikon Email */}
                        <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <span>
                            {user.email || 'Email tidak tersedia'}
                        </span>
                    </p>
                </div>
            </DashboardCard>

        {/* ✅ SECTION 3: Ringkasan Pesanan*/}
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    {orderSummaryCards.map((card, index) => (
                        <SummaryListCard key={index} {...card} />
                    ))}
                </div>
            </div>
        <LatestOrdersSection />
    </div>
  );
}