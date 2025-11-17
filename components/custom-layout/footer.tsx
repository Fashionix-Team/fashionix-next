import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      {/* Footer Section Start */}
      <div className="bg-gray-900 py-18">
        <div className="container px-12 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-3 sm:col-span-1">
              <div>
                <div className="pb-6">
                  <Link href="/">
                    <Image
                      src="/image/logo/logo-primary.png"
                      alt="logo"
                      width={150}
                      height={50}
                    />
                  </Link>
                </div>
                <div className="space-y-2">
                  <span className="block text-sm text-gray-500">Dukuangan pelanggan:</span>
                  <span className="block text-lg font-medium text-white">(+62) 895-3418-8824-4</span>
                  <span className="block text-base text-gray-300">
                    Palembang <br /> Sumsel, Indonesia
                  </span>
                  <Link 
                    href="mailto:info@fashionix.com" 
                    className="block text-base font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    info@fashionix.com
                  </Link>
                </div>
              </div>
            </div>

            {/* Top Category */}
            <div className="lg:col-span-2 sm:col-span-1">
              <div>
                <h2 className="text-base font-medium text-white uppercase pb-3">Kategori Teratas</h2>
                <ul className="space-y-1">
                  {['Pakaian Wanita', 'Pakaian Pria', 'Aksesoris & Perhiasan'].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="block py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:pl-8 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0.5 before:bg-warning-300 before:rounded-full hover:before:w-6 transition-all duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm text-warning-500 group relative before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-px before:bg-warning-500 hover:before:w-full before:transition-all before:duration-300"
                    >
                      Jelajahi Semua Produk
                      <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.125 10H16.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 sm:col-span-1">
              <div>
                <h2 className="text-base font-medium text-white uppercase pb-3">Tautan Cepats</h2>
                <ul className="space-y-1">
                  {['Belanja Produk', 'Keranjang Belanja', 'Daftar Keinginan', 'Bandingkan', 'Lacak Pesanan', 'Bantuan Pelanggan', 'Tentang Kami'].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="block py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:pl-8 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0.5 before:bg-warning-300 before:rounded-full hover:before:w-6 transition-all duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="lg:col-span-3 sm:col-span-1">
              <div>
                <h2 className="text-base font-medium text-white uppercase pb-3">Popular Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Daster',
                    'Kemeja',
                    'Pulsa',
                    'Hijab',
                    'Sneakers',
                    'Tas',
                    'Aksesoris',
                    'Kalung',
                    'Blazer',
                    'Hoodie',
                    'Rok',
                    'Cutewear',
                  ].map((tag) => (
                    <Link
                      key={tag}
                      href="#"
                      className="px-2.5 py-1.5 text-sm font-medium text-white border border-gray-800 rounded hover:bg-gray-800 hover:border-white transition-colors duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-900 py-6 text-center border-t border-[#303639]">
        <p className="text-sm text-gray-300">
          Fashionix - eCommerce Fashion © 2025. Design by{' '}
          <a
            href="https://github.com/winterestingwithyou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            winterestingwithyou
          </a>
        </p>
      </div>
    </>
  );
};
