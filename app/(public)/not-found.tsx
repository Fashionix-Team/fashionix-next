'use client';

import { useRouter } from 'next/navigation';

export default function NotFoundSection() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] bg-white px-4 font-sans pb-30">

      <img
        src="/image/not-found/error.png"
        alt="Error"
        className="w-72 mb-6"
      />
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-500 mb-2">
        404, Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 max-w-lg mb-8 leading-relaxed">
        Terjadi kesalahan. Tampaknya permintaan Anda tidak dapat ditemukan.
        Kemungkinan tautannya rusak atau halamannya telah dihapus.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleGoBack}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition-colors"
        >
          ← KEMBALI
        </button>
        <button
          onClick={handleGoHome}
          className="bg-orange-100 hover:bg-orange-200 text-orange-600 border border-orange-400 font-medium px-6 py-2 rounded-md transition-colors"
        >
          ⟳ KEMBALI KE BERANDA
        </button>
      </div>
    </div>
  );
}

