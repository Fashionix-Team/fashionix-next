"use client"; // Diambil dari kode baru

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Dari kode baru
import { CustomerOrder } from "@/lib/bagisto/types/order";
import { useRouter, useSearchParams } from "next/navigation"; // Dari kode baru


// --- Interface Props (Digabungkan) ---
interface OrdersTableProps {
  orders: CustomerOrder[];
  currentPage: number;
  lastPage: number;
  total: number; // Dari kode baru
  fetchError?: string | null; // Dari file asli
}

// --- Komponen Helper Lokal (Diambil dari kode baru) ---

// Komponen StatusBadge 
const StatusBadge = ({ status }: { status: string }) => {
  let classes = '';
  
  // 'status' adalah label yang sudah diubah (misal: "Sedang Dikemas")
  switch (status) {
    case 'Sedang Dikemas':
      classes = 'text-gray-500'; 
      break;
    case 'Dalam Pengiriman':
      classes = 'text-yellow-500'; 
      break;
    case 'Terkirim':
      classes = 'text-green-500'; 
      break;
    case 'Canceled':
      classes = 'text-red-500';
      break;
    default:
      classes = 'text-gray-500'; 
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-l font-semibold ${classes}`}>
      {status || 'N/A'}
    </span>
  );
};

// Format tanggal
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// --- Komponen Utama ---
export default function OrdersTable({
  orders,
  currentPage,
  lastPage,
  total,
  fetchError, // Prop 'fetchError' ditambahkan
}: OrdersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Logika 'handlePageChange' diambil dari kode baru
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {/* Tabel Pesanan */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {/* Header tabel (identik) */}
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID Pesanan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tanggal
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tindakan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Logika rendering tbody digabungkan:
              1. Cek 'fetchError' (dari file asli)
              2. Cek 'orders.length' (dari kedua file)
              3. Render 'orders.map' (dari kode baru, karena lebih detail)
            */}
            {fetchError ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-red-500">
                  {fetchError}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-gray-500" // Styling dari kode baru
                >
                  Anda belum memiliki riwayat pesanan.
                </td>
              </tr>
            ) : (
              // Konten baris diambil dari kode baru (lebih detail)
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.incrementId || order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge
                      status={order.statusLabel || order.status || "Unknown"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.formattedPrice?.grandTotal || `Rp ${order.grandTotal?.toLocaleString('id-ID')}`} (
                    {order.totalQtyOrdered || 0} Produk)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      // Link URL diambil dari kode baru
                      href={`/customer/dashboard/order-detail/${order.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Lihat Detail &rarr;
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginasi (Diambil dari kode baru, dengan tambahan cek !fetchError) */}
      {lastPage > 1 && !fetchError && (
        <nav
          className="flex justify-center items-center mt-6"
          aria-label="Pagination"
        >
          <ul className="flex items-center space-x-2">
            {/* Tombol Panah Kiri */}
            <li>
              <button
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className={`flex items-center justify-center h-9 w-9 rounded-full border transition-colors ${
                  currentPage === 1
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-orange-500 border-orange-500 bg-white hover:bg-orange-50"
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </li>

            {/* Nomor Halaman */}
            {Array.from({ length: Math.min(lastPage, 6) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <li key={pageNum}>
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={`flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "text-white bg-orange-500 border border-orange-500"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {String(pageNum).padStart(2, "0")}
                  </button>
                </li>
              );
            })}

            {/* Tombol Panah Kanan */}
            <li>
              <button
                onClick={() =>
                  currentPage < lastPage && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === lastPage}
                className={`flex items-center justify-center h-9 w-9 rounded-full border transition-colors ${
                  currentPage === lastPage
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-orange-500 border-orange-500 bg-white hover:bg-orange-50"
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </li>
          </ul>

          {/* Info halaman (dari kode baru) */}
          <div className="ml-4 text-sm text-gray-600">
            Halaman {currentPage} dari {lastPage} ({total} total pesanan)
          </div>
        </nav>
      )}
    </>
  );
}