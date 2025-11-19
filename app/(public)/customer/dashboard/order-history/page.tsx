import React from "react";
import { getCustomerOrders } from "@/lib/bagisto/helpers/order"; // Diambil dari kode baru
import { OrdersTable, OrdersBreadcrumb } from "@/components/customer/orders";
import { CustomerOrder } from "@/lib/bagisto/types/order"; // Diambil dari kode baru

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

// --- Komponen Halaman Utama (Server Component) ---
export default async function RiwayatPesananPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // 1. Dapatkan halaman saat ini (logika digabungkan)
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const limit = 10;

  // 2. Panggil "pelayan" (getCustomerOrders)
  // (Menggunakan try...catch dari file asli untuk penanganan error)
  let fetchError: string | null = null;
  let orders: CustomerOrder[] = [];
  let currentPageNum = 1;
  let lastPageNum = 1;
  let totalOrders = 0;

  try {
    // Menggunakan panggilan fungsi dari kode baru
    const response = await getCustomerOrders(currentPage, limit, {});
    
    // Menggunakan transformasi dari kode baru
    orders = response.data.map(transformOrderLabel);
    
    // Mengambil data paginasi
    currentPageNum = response.paginatorInfo.currentPage;
    lastPageNum = response.paginatorInfo.lastPage;
    totalOrders = response.paginatorInfo.total;

  } catch (e: any) {
    // Menggunakan penanganan error dari file asli
    fetchError = e.message || "Gagal memuat pesanan. Pastikan Anda sudah login.";
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <OrdersBreadcrumb />

      {/* Kontainer Utama */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        
        {/* Header (Diambil dari kode baru) */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Pesanan Terbaru
          </h2>
          {/* Menampilkan jumlah, bukan link "Lihat Semua" */}
          {!fetchError && totalOrders > limit && (
            <p className="text-sm text-gray-500">
              Menampilkan {orders.length} dari{" "}
              {totalOrders} pesanan
            </p>
          )}
        </div>

        {/* Tabel Pesanan (Props digabungkan) */}
        <OrdersTable
          orders={orders}
          currentPage={currentPageNum}
          lastPage={lastPageNum}
          total={totalOrders} // Prop dari kode baru
          fetchError={fetchError} // Prop dari file asli
        />
      </div>
    </div>
  );
}