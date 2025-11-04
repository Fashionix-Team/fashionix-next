import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import DashboardContent from '@/components/customer/dashboard/dashboard-page'; 

const dummySummary = {
  totalOrders: 5,
  PENDINGOrders: 1,
  defaultAddress: 'Jl. Contoh No. 123, Jakarta, 12345',
  totalWishlist: 8,
};

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

  const summaryData = dummySummary;

  return (
    <div className="container mx-auto px-4 py-10 lg:py-16">
      <h1 className="text-3xl font-bold mb-8">Halo, {user.name || 'Pelanggan'}!</h1>
      <DashboardContent user={user} summary={summaryData} />
    </div>
  );
}