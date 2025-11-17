import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import DashboardContent from '@/components/customer/dashboard/dashboard-page'; 
import { getDashboardSummary } from '@/lib/bagisto';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard Pelanggan',
  description: 'Ringkasan aktivitas akun Anda di Fashionix.'
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  if (!user) {
    redirect('/customer/login');
  }

  try {
    const summaryResult = await getDashboardSummary();

    const summaryData = summaryResult || {
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      defaultAddress: null,
      totalWishlist: 0,
      latestOrders: [],
    };

    return (
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <h1 className="text-3xl font-bold mb-8">Halo, {user.firstName || 'Pelanggan'}!</h1>
        <DashboardContent user={user} summary={summaryData as any} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch dashboard summary:", error);
    redirect('/customer/login');
  }
}