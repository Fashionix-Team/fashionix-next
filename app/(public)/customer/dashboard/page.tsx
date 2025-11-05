import { getServerSession } from 'next-auth';
// Pastikan path ini benar. Jika auth.ts mengekspor getAuthOptions, gunakan ini.
import { authOptions } from '@/auth';

// UBAH: Sesuaikan path impor komponen DashboardContent
import DashboardContent from '@/components/customer/dashboard/dashboard-page'; 

// Data Dummy untuk Ringkasan Dashboard (Ganti dengan data fetching aktual)
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
  // UBAH: Panggil fungsi getAuthOptions()
  const session = await getServerSession(authOptions);

  // Untuk pengembangan: Buat pengguna dummy jika tidak ada sesi login
  const dummyUser = {
    id: 'dummy-user-123',
    name: 'Rafly',
    email: 'rafly@example.com',
    firstName: 'Rafly',
    lastName: 'User',
    role: 'customer',
    accessToken: 'dummy-token',
    phone: '081234567890' // Tambahkan properti phone jika diperlukan
  };

  // Gunakan pengguna dari sesi jika ada, jika tidak, gunakan pengguna dummy
  const user = session?.user || dummyUser;

  // Di sini Anda mungkin akan melakukan fetching data ringkasan dashboard
  // const summaryData = await getDashboardSummary(session.user.id);
  const summaryData = dummySummary;

  return (
    <div className="container mx-auto px-4 py-10 lg:py-16">
      <h1 className="text-3xl font-bold mb-8">Halo, {user.name || 'Pelanggan'}!</h1>
      <DashboardContent user={user} summary={summaryData} />
    </div>
  );
}