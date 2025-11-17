import Link from 'next/link';
import { CustomerOrder } from '@/lib/bagisto/types/order';
import StatusBadge from './status-badge';
import Pagination from './pagination';

interface OrdersTableProps {
    orders: CustomerOrder[];
    currentPage: number;
    lastPage: number;
    fetchError?: string | null;
}

export default function OrdersTable({ 
    orders, 
    currentPage, 
    lastPage, 
    fetchError 
}: OrdersTableProps) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID Pesanan
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tanggal
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tindakan
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {fetchError ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-red-500">
                                    {fetchError}
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    Anda belum memiliki riwayat pesanan.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.incrementId || order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusBadge status={order.statusLabel || order.status || 'N/A'} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString('id-ID', { 
                                            day: 'numeric', 
                                            month: 'short', 
                                            year: 'numeric' 
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {order.formattedPrice?.grandTotal || `Rp ${order.grandTotal?.toLocaleString('id-ID')}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link 
                                            href={`/dashboard/detail-pesanan/${order.id}`} 
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

            {/* Tampilkan paginasi */}
            {lastPage > 1 && !fetchError && (
                <Pagination 
                    currentPage={currentPage}
                    lastPage={lastPage}
                />
            )}
        </>
    );
}
