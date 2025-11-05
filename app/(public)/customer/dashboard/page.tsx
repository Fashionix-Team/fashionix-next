import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import DashboardContent from '@/components/customer/dashboard/dashboard-page'; 
import { getDashboardSummary } from '@/lib/bagisto';

export const metadata = {
  title: 'Dashboard Pelanggan',
  description: 'Ringkasan aktivitas akun Anda di Fashionix.'
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const dummyUser = {
    id: 'dummy-user-123',
    name: 'Rafly',
    email: 'rafly@example.com',
    firstName: 'Rafly',
    lastName: 'User',
    role: 'customer',
    accessToken: 'dummy-token',
    phone: '081234567890'
  };

  const user = session?.user || dummyUser;

  const summaryResult = await getDashboardSummary();

  //Data fallback jika API gagal atau tidak mengembalikan data
  const summaryData = summaryResult ? {
    totalOrders: summaryResult.totalOrders || 0,
    pendingOrders: summaryResult.pendingOrders || 0,
    defaultAddress: summaryResult.defaultAddress?.address || 'Alamat belum diatur',
    totalWishlist: summaryResult.totalWishlist || 0,
  } : { totalOrders: 0, pendingOrders: 0, defaultAddress: 'Gagal memuat alamat', totalWishlist: 0 };

  return (
    <div className="container mx-auto px-4 py-10 lg:py-16">
      <h1 className="text-3xl font-bold mb-8">Halo, {user.name || 'Pelanggan'}!</h1>
      <DashboardContent user={user} summary={summaryData} />
    </div>
  );
}