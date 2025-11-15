import Link from "next/link";

interface OrdersBreadcrumbProps {
  currentPage?: string;
}

export default function OrdersBreadcrumb({ currentPage = "Riwayat Pesanan" }: OrdersBreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Beranda
          </Link>
        </li>
        <li>
          <span>&gt;</span>
        </li>
        <li>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Akun Pengguna
          </Link>
        </li>
        <li>
          <span>&gt;</span>
        </li>
        <li className="text-gray-700">{currentPage}</li>
      </ol>
    </nav>
  );
}
