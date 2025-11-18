'use client';

import Link from "next/link"; 
import { useMemo } from "react";

import { MapIcon } from "@/components/icons/map-icon";
import  EarphoneIcon from "@/components/icons/service/earphone-icon";
// ShoppingCartIcon is no longer needed here; OrdersTable provides row-level UI
import { RocketIcon } from "@/components/icons/roket";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CubeIcon } from "@/components/icons/cube";
import { OrdersTable } from '@/components/customer/orders';
import type { CustomerOrder } from '@/lib/bagisto/types/order';

// Interface tetap sama
interface DashboardUser {
  id: string;
  name?: string | null;
  email?: string | null;
  firstName: string;
  lastName: string;
  accessToken?: string;
  role?: string;
phone?: string;
}

interface DashboardContentProps {
 user: DashboardUser; 
 summary: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    defaultAddress: { address: string } | null;
    totalWishlist: number;
    latestOrders: LatestOrder[];
   };
}

/**
 * Mengubah label status dari backend agar sesuai dengan UI.
 * (Fungsi ini diambil dari kode baru Anda)
 */
const transformOrderLabel = (order: CustomerOrder): CustomerOrder => {
  let uiStatusLabel = order.statusLabel || 'Unknown';
  
  if (order.status === 'pending') {
      uiStatusLabel = 'Sedang Dikemas'; 
  } else if (order.status === 'processing') {
      uiStatusLabel = 'Dalam Pengiriman';
  } else if (order.status === 'completed' || order.status === 'closed') {
      uiStatusLabel = 'Terkirim';
  }

  return {
    ...order,
    statusLabel: uiStatusLabel 
  };
};

// Interface Pesanan Terbaru
interface LatestOrder {
    id: string;
    orderId: string;
    date: string; // Ubah dari Date ke string
    status: 'PENDING' | 'IN PROGRESS' | 'COMPLETED' | 'CANCELED';
    total: string;
    link?: string; // Jadikan opsional karena tidak lagi digunakan secara langsung
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
                       px-4 py-2 rounded-lg transition duration-200 ease-in-out"
        >
            {linkText}
        </Link>
    </div>
);

// Komponen Kartu Ringkasan
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

// Komponen Menampilkan Daftar Pesanan Terbaru

const LatestOrdersSection = ({ latestOrders }: { latestOrders: LatestOrder[] }) => {
    // Convert LatestOrder[] to CustomerOrder[] for re-usable OrdersTable
    const mapToCustomerOrders = (items: LatestOrder[]): CustomerOrder[] => {
        return items.map((o) => ({
            id: o.id,
            incrementId: o.orderId,
            status: o.status,
            statusLabel:
                o.status === 'PENDING'
                    ? 'Sedang Dikemas'
                    : o.status === 'IN PROGRESS'
                    ? 'Dalam Pengiriman'
                    : o.status === 'COMPLETED'
                    ? 'Terkirim'
                    : o.status === 'CANCELED'
                    ? 'Dibatalkan'
                    : o.status,
            createdAt: o.date,
            formattedPrice: { grandTotal: o.total },
            grandTotal: undefined,
            totalQtyOrdered: o.productCount,
        } as unknown as CustomerOrder));
    };

    const transformedOrders = mapToCustomerOrders(latestOrders).map(transformOrderLabel);
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between px-6 py-4 items-center mb-2 pb-2 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">PESANAN TERBARU</h2>
                    <Link 
                    href="/customer/dashboard/order-history" 
                    className="text-orange-400 dark:text-blue-400 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                >
                    Lihat Semua
                </Link>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                {/* Use shared OrdersTable component for consistency */}
                <OrdersTable
                    orders={transformedOrders}
                    currentPage={1}
                    lastPage={1}
                    total={latestOrders.length}
                />
                {/* OrdersTable includes header, body and pagination */}
            </div>
            
            {/* OrdersTable already displays an empty state; no duplicate message here */}
        </div>
    );
};
// Komponen untuk menampilkan info kontak (email & telepon)
const ContactInfo = ({ email, phone }: { email?: string | null, phone?: number | string | null }) => (
    <>
        <p className="text-gray-700 dark:text-gray-300 flex items-center">
            {/* Ikon Email */}
            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span>
                {email || 'Email tidak tersedia'}
            </span>
        </p>

        <p className="text-gray-700 dark:text-gray-300 flex items-center">
            {/* Ikon Telepon */}
            <EarphoneIcon className="w-5 h-5 mr-3 text-gray-500" />
            <span>
                {phone || 'Telepon tidak tersedia'}
            </span>
        </p>
    </>
);


export default function DashboardContent({ user, summary }: DashboardContentProps) {
    // Data untuk 3 Kartu Ringkasan Pesanan
    const orderSummaryCards = useMemo(() => [
        {
            title: 'Total Pesanan',
            value: summary.totalOrders, 
            linkHref: '/customer/orders',
            icon: <RocketIcon className="w-6 h-20" />,
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Pesanan Tertunda',
            value: summary.pendingOrders, 
            linkHref: '/customer/orders?status=PENDING',
            icon: <EnvelopeIcon className="w-6 h-20 text-yellow-500" />,
            bgColor: "bg-orange-100"
        },
        {
            title: 'Pesanan Selesai',
            value: summary.completedOrders, 
            linkHref: '/customer/orders?status=COMPLETED',
            icon: <CubeIcon className="w-6 h-20 text-green-500" />,
            bgColor: "bg-green-100"
        },
    ], [summary]);

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
                    <ContactInfo email={user.email} phone={user.phone} />
                </div>
            </DashboardCard>

            {/* 2. SECTION: Alamat Default */}
            <DashboardCard
                title="ALAMAT"
                linkHref="/customer/account"
                linkText="Edit Alamat"
            >
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {user.firstName} {user.lastName || ''}
                            </p>

                    <p className="text-gray-700 dark:text-gray-300 flex items-start">
                        <MapIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                        <span>
                            {summary.defaultAddress?.address || 'Belum ada alamat default'}
                        </span>
                    </p>

                    <ContactInfo email={user.email} phone={user.phone} />
                </div>
            </DashboardCard>

        {/* SECTION 3: Ringkasan Pesanan*/}
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    {orderSummaryCards.map((card, index) => (
                        <SummaryListCard key={index} {...card} />
                    ))}
                </div>
            </div>
        <LatestOrdersSection latestOrders={summary.latestOrders || []} />
    </div>
  );
}