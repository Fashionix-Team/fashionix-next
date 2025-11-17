"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCartDetail } from "@/components/hooks/use-cart-detail";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import type { BagistoCollectionMenus } from "@/lib/bagisto/types";

type MobileNavProps = {
  categories?: BagistoCollectionMenus[];
};

export default function MobileNav({ categories = [] }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  useCartDetail();
  const cartDetail = useAppSelector((state) => state.cartDetail);
  const cart = cartDetail?.cart;

  // Calculate total items quantity
  const totalItemsQty = useMemo(() => {
    if (!cart?.items || cart.items.length === 0) return 0;
    return cart.items.reduce(
      (total, item) => total + parseInt(item.quantity?.toString() || "0", 10),
      0
    );
  }, [cart?.items]);

  return (
    <div className="lg:hidden">
      {/* Top Bar */}
      <div className="bg-[#1B6392] px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-1"
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/image/logo/logo-white.png"
              alt="logo"
              width={100}
              height={28}
              className="h-7 w-auto"
            />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link href="/cart" className="relative p-1 text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 29C11.1046 29 12 28.1046 12 27C12 25.8954 11.1046 25 10 25C8.89543 25 8 25.8954 8 27C8 28.1046 8.89543 29 10 29Z"
                  fill="currentColor"
                />
                <path
                  d="M23 29C24.1046 29 25 28.1046 25 27C25 25.8954 24.1046 25 23 25C21.8954 25 21 25.8954 21 27C21 28.1046 21.8954 29 23 29Z"
                  fill="currentColor"
                />
                <path
                  d="M5.2875 9H27.7125L24.4125 20.55C24.2948 20.9692 24.0426 21.3381 23.6948 21.6001C23.3471 21.862 22.9229 22.0025 22.4875 22H10.5125C10.0771 22.0025 9.65293 21.862 9.30515 21.6001C8.95738 21.3381 8.70524 20.9692 8.5875 20.55L4.0625 4.725C4.0027 4.51594 3.8764 4.33207 3.70271 4.20125C3.52903 4.07042 3.31744 3.99977 3.1 4H1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {totalItemsQty > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-orange-500 px-1 text-[9px] font-semibold text-white">
                  {totalItemsQty}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              href={session ? "/customer/dashboard" : "/customer/login"}
              className="p-1 text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.875 26.9999C5.10367 24.8713 6.87104 23.1037 8.99944 21.8747C11.1278 20.6458 13.5423 19.9988 16 19.9988C18.4577 19.9988 20.8722 20.6458 23.0006 21.8747C25.129 23.1037 26.8963 24.8713 28.125 26.9999"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b border-gray-200 bg-white px-4 py-2">
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Cari apa saja..."
          />
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
            >
              <path
                d="M9.5625 15.625C13.1869 15.625 16.125 12.6869 16.125 9.0625C16.125 5.43813 13.1869 2.5 9.5625 2.5C5.93813 2.5 3 5.43813 3 9.0625C3 12.6869 5.93813 15.625 9.5625 15.625Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.2031 13.7031L18 17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-[#1B6392] px-4 py-4">
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white"
                  aria-label="Close menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-2">
                  {/* User Section */}
                  <div className="border-b border-gray-200 px-4 py-3">
                    {session ? (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {session.user?.name || "User"}
                          </p>
                          <Link
                            href="/customer/dashboard"
                            className="text-xs text-orange-600 hover:text-orange-700"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Lihat Akun
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Link
                          href="/customer/login"
                          className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Masuk / Daftar
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  {categories && categories.length > 0 && (
                    <div className="border-b border-gray-200 py-2">
                      <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Kategori
                      </h3>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Main Links */}
                  <div className="py-2">
                    <Link
                      href="/"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Beranda
                    </Link>
                    <Link
                      href="/about-us"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Tentang Kami
                    </Link>
                    <Link
                      href="/cart"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Keranjang Belanja
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#1B6392]"
                    aria-label="Facebook"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M22 12.07C22 6.49 17.52 2 11.94 2 6.36 2 1.88 6.49 1.88 12.07c0 5.02 3.66 9.19 8.44 9.99v-7.06H7.9v-2.93h2.42V9.41c0-2.4 1.43-3.73 3.63-3.73 1.05 0 2.15.19 2.15.19v2.38h-1.21c-1.19 0-1.57.74-1.57 1.5v1.8h2.67l-.43 2.93h-2.24v7.06c4.77-.8 8.44-4.97 8.44-9.99z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#1B6392]"
                    aria-label="Twitter"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M19.633 7.997c.013.18.013.362.013.544 0 5.545-4.221 11.94-11.94 11.94-2.37 0-4.573-.693-6.427-1.885.33.04.648.053.99.053a8.46 8.46 0 0 0 5.244-1.806 4.227 4.227 0 0 1-3.946-2.929c.258.04.514.066.785.066.38 0 .759-.053 1.113-.146a4.219 4.219 0 0 1-3.387-4.14v-.053c.56.31 1.21.5 1.899.526A4.213 4.213 0 0 1 2.86 6.7c0-.785.21-1.5.58-2.128a12.001 12.001 0 0 0 8.705 4.417 4.758 4.758 0 0 1-.106-.968 4.216 4.216 0 0 1 7.296-2.883 8.3 8.3 0 0 0 2.673-1.02 4.23 4.23 0 0 1-1.853 2.33 8.447 8.447 0 0 0 2.43-.65 9.075 9.075 0 0 1-2.351 2.215z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#1B6392]"
                    aria-label="Instagram"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
