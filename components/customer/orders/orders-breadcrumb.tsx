import Link from "next/link";

export default function OrdersBreadcrumb() {
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
          <Link href="/customer/account" className="text-blue-600 hover:underline">
            Akun Pengguna
          </Link>
        </li>
        <li>
          <span>&gt;</span>
        </li>
        <li className="text-gray-700">Dasbor</li>
      </ol>
    </nav>
  );
}
