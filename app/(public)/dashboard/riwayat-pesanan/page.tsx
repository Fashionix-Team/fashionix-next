import React from "react";
import { getCustomerOrders } from "@/lib/bagisto/helpers/order";
import { OrdersTable, OrdersBreadcrumb } from "@/components/customer/orders";

export default async function RiwayatPesananPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Get page from URL query params
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const limit = 10;

  // Fetch orders dari Bagisto backend
  const ordersData = await getCustomerOrders(currentPage, limit, {});

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <OrdersBreadcrumb />

      {/* Kontainer Utama */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Header Tabel */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Pesanan Terbaru
          </h2>
          {ordersData.paginatorInfo.total > limit && (
            <p className="text-sm text-gray-500">
              Menampilkan {ordersData.data.length} dari{" "}
              {ordersData.paginatorInfo.total} pesanan
            </p>
          )}
        </div>

        {/* Tabel dengan Client Component */}
        <OrdersTable
          orders={ordersData.data}
          currentPage={ordersData.paginatorInfo.currentPage}
          lastPage={ordersData.paginatorInfo.lastPage}
          total={ordersData.paginatorInfo.total}
        />
      </div>
    </div>
  );
}