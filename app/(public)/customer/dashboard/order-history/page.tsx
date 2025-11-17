import Link from 'next/link';
import React from 'react';
import { getCustomerOrders, CustomerOrder } from '@/lib/bagisto/index';
import { OrdersTable, OrdersBreadcrumb } from '@/components/customer/orders';

// --- Komponen Halaman Utama (Server Component) ---
export default async function RiwayatPesananPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string }> 
}) {
    
    // 1. Dapatkan halaman saat ini dari URL (misal: ...?page=2)
    const params = await searchParams;
    const currentPage = parseInt(params?.page || '1');

    // 2. Panggil "pelayan" (getCustomerOrders) langsung di server
    let fetchError: string | null = null;
    let orders: CustomerOrder[] = [];
    let currentPageNum = 1;
    let lastPageNum = 1;

    try {
        const response = await getCustomerOrders(currentPage, 10);
        orders = response.data;
        currentPageNum = response.paginatorInfo.currentPage;
        lastPageNum = response.paginatorInfo.lastPage;
    } catch (e: any) {
        fetchError = e.message || "Gagal memuat pesanan. Pastikan Anda sudah login.";
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Breadcrumbs */}
            <OrdersBreadcrumb />

            {/* Kontainer Utama */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Pesanan Terbaru</h2>
                    <Link href="#" className="text-sm text-blue-600 hover:underline">
                        Lihat Semua
                    </Link>
                </div>

                {/* Tabel Pesanan */}
                <OrdersTable
                    orders={orders}
                    currentPage={currentPageNum}
                    lastPage={lastPageNum}
                    fetchError={fetchError}
                />
            </div>
        </div>
    );
}