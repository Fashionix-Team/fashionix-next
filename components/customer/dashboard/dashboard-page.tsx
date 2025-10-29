// components/customer/dashboard/dashboard-page.tsx
'use client';

import Link from "next/link"; 
import { useMemo } from "react";
// Impor ikon yang dibutuhkan (EditIcon, MapIcon, RightArrowIcon)
import { EditIcon } from "@/components/icons/edit-icon"; 
import { MapIcon } from "@/components/icons/map-icon";
import  RightArrow  from "@/components/icons/right-arrow"; // Asumsi ikon panah ada di sini
import  EarphoneIcon from "@/components/icons/service/earphone-icon";

// Interface tetap sama
interface DashboardUser {
  id: string;
  name?: string | null;
  email?: string | null;
  firstName: string;
  lastName: string;
  accessToken?: string;
  role?: string;
phone?: number; // Tambahkan properti phone
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
             // ✅ MODIFIKASI: Menambahkan styling untuk membuat tombol stroke biru
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


export default function DashboardContent({ user, summary }: DashboardContentProps) {
  // Logika useMemo untuk summary cards (dipertahankan)
  // const summaryCards = useMemo(() => [ ... ], [summary]);

  return (
    // Kontainer yang sebelumnya hanya "space-y-10"
    // Sekarang kita implementasikan tata letak 2 kolom di dalamnya
    <div className="space-y-10">
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl">
            Dari dasbor akun Anda, Anda dapat dengan mudah memeriksa dan melihat Pesanan Terbaru, mengelola Alamat Pengiriman dan Penagihan serta mengedit Kata Sandi dan Detail Akun Anda.
        </p>
        
        {/* Kontainer untuk 2 Section Info Akun dan Alamat */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
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

        </div>

        {/* Anda bisa menambahkan area lain di sini (misalnya Pesanan Terbaru, dll) */}

    </div>
  );
}