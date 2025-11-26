import Link from "next/link";
import Image from "next/image";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8">
          <Image
            src="/image/404.png"
            alt="Product Not Found"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Maaf, produk yang Anda cari tidak tersedia atau telah dihapus dari katalog kami.
        </p>
        <div className="flex gap-4">
          <Link
            href="/search"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Lihat Semua Produk
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
