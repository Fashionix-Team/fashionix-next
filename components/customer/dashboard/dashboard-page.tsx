// components/customer/dashboard/dashboard-page.tsx
'use client';

import Link from "next/link"; 
import { useMemo } from "react";
// Impor ikon yang dibutuhkan (EditIcon, MapIcon, RightArrowIcon)
import { EditIcon } from "@/components/icons/edit-icon"; 
import { MapIcon } from "@/components/icons/map-icon";
import  RightArrow  from "@/components/icons/right-arrow"; // Asumsi ikon panah ada di sini
import  EarphoneIcon from "@/components/icons/service/earphone-icon";
import { ShoppingCartIcon } from "@/components/icons/shopping-cart";
import CheckSign from "@/components/icons/check-sign";
import { LeftArrow } from "@/components/icons/service/left-arrow";

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
    status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
    total: string;
    link: string;
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
const SummaryListCard = ({ title, value, linkHref, icon }: { title: string, value: string | number, linkHref: string, icon: React.ReactNode }) => (
    <Link 
        href={linkHref} 
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:shadow-lg transition duration-200"
    >
        <div className="flex items-center space-x-3">
            <div className="text-blue-600 dark:text-blue-400">{icon}</div>
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">{title}</p>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </Link>
);

// ✅ KOMPONEN BARU: Menampilkan Daftar Pesanan Terbaru
const LatestOrdersSection = () => {
    // Data Dummy untuk Pesanan
    const latestOrders: LatestOrder[] = useMemo(() => [
        { id: '1', orderId: '#1001', date: '25 Okt 2025', status: 'In Progress', total: 'Rp 450.000', link: '/customer/orders/1001' },
        { id: '2', orderId: '#1000', date: '20 Okt 2025', status: 'Completed', total: 'Rp 210.000', link: '/customer/orders/1000' },
        { id: '3', orderId: '#0999', date: '15 Okt 2025', status: 'Pending', total: 'Rp 60.000', link: '/customer/orders/0999' },
    ], []);

    // Fungsi untuk mendapatkan warna status
    const getStatusColor = (status: LatestOrder['status']) => {
        switch (status) {
            case 'Completed': return 'text-green-600 bg-green-100 dark:bg-green-800';
            case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-800';
            case 'In Progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-800';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4 border-b pb-2 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
                <Link 
                    href="/customer/orders" 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                >
                    Lihat Semua Pesanan
                    <RightArrow className="w-4 h-4 ml-1.5" />
                </Link>
            </div>

            {/* Header Tabel */}
            <div className="hidden md:grid grid-cols-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-2 border-b dark:border-gray-700">
                <p className="col-span-2">ID Pesanan</p>
                <p>Status</p>
                <p>Tanggal</p>
                <p className="text-right">Total</p>
                <p className="text-right">Tindakan</p>
            </div>

            {/* Isi Tabel */}
            <div className="divide-y dark:divide-gray-700">
                {latestOrders.map((order) => (
                    <div
                        key={order.id}
                        className="grid grid-cols-2 md:grid-cols-6 items-center py-4"
                    >
                        {/* Nomor Pesanan & Link */}
                        <div className="col-span-2 text-gray-900 dark:text-white font-medium flex items-center">
                            <Link href={order.link} className="flex items-center hover:text-blue-600 transition">
                                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                                {order.orderId}
                            </Link>
                        </div>

                        {/* Status */}
                        <div className="text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}> 
                                {order.status}
                            </span>
                        </div>
                        
                        {/* Tanggal */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block"> 
                            {order.date}
                        </p>
                        
                        {/* Total */}
                        <p className="text-sm font-semibold text-right text-gray-900 dark:text-white"> 
                            {order.total}
                        </p>

                        {/* Tindakan */}
                        <div className="text-right hidden md:block">
                            <Link 
                                href={order.link}
                                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                            >
                                Lihat Detail
                                <RightArrow className="w-3 h-3 ml-1" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Jika tidak ada pesanan */}
            {latestOrders.length === 0 && (
                <p className="py-4 text-center text-gray-500 dark:text-gray-400">Anda belum memiliki pesanan.</p>
            )}
        </div>
    );
};


export default function DashboardContent({ user, summary }: DashboardContentProps) {
  const enhancedSummary = useMemo(() => ({
        ...summary,
        completedOrders: summary.totalOrders - summary.pendingOrders > 0 ? summary.totalOrders - summary.pendingOrders : 0, // Data dummy
    }), [summary]);

    // Data untuk 3 Kartu Ringkasan Pesanan
    const orderSummaryCards = useMemo(() => [
        {
            title: 'Total Pesanan',
            value: enhancedSummary.totalOrders, 
            linkHref: '/customer/orders',
            icon: <ShoppingCartIcon className="w-6 h-20" />
        },
        {
            title: 'Pesanan Tertunda',
            value: enhancedSummary.pendingOrders, 
            linkHref: '/customer/orders?status=pending',
            icon: <ShoppingCartIcon className="w-6 h-20 text-yellow-500" />
        },
        {
            title: 'Pesanan Selesai',
            value: enhancedSummary.completedOrders, 
            linkHref: '/customer/orders?status=completed',
            icon: <CheckSign className="w-6 h-20 text-green-500" /> // Menggunakan CheckSign untuk Selesai
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
                    
                    {/* 1. Baris: Foto & Nama Lengkap */}
                    <div className="flex items-center space-x-4 pb-2 border-b dark:border-gray-700">
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
                title="Alamat"
                linkHref="/customer/addresses"
                linkText="Edit Alamat"
            >
                <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300 flex items-start">
                        <MapIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                        <span>
                            {summary.defaultAddress || 'Belum ada alamat default'}
                        </span>
                    </p>
                </div>
            </DashboardCard>

        {/* ✅ SECTION 3: Ringkasan Pesanan (KOLOM 3 - STACKED) */}
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