"use client";

import Image from "next/image";
import UserMenuPopover from "./user-menu-popover";
import CartPopover from "./cart-popover";
import Link from "next/link";

export default function DeskNav() {

  return (
    <div className="hidden lg:block">
      {/* Shell */}
      <div className="bg-[#1B6392]">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/image/logo/logo-white.png"
                alt="logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            {/* Search */}
            <form
              action="#"
              className="relative w-full max-w-xl mx-6 hidden xl:block"
            >
              <input
                type="text"
                className="w-full rounded-md bg-white/95 text-[#191C1F] placeholder-[#25373F]/70 border border-black/10 pl-11 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Cari apa saja..."
              />
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#191C1F]"
                >
                  <path
                    d="M9.5625 15.625C13.1869 15.625 16.125 12.6869 16.125 9.0625C16.125 5.43813 13.1869 2.5 9.5625 2.5C5.93813 2.5 3 5.43813
                        3 9.0625C3 12.6869 5.93813 15.625 9.5625 15.625Z"
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
            </form>

            {/* Widgets */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <CartPopover />

              {/* Wishlist */}
              <button
                className="rounded-md p-1.5 text-white/90 hover:text-white transition"
                aria-label="Wishlist"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M16 27C16 27 3.5 20 3.5 11.5C3.5 9.99737 4.02062 8.54114 4.97328 7.37908C5.92593 6.21703 7.25178 5.42093 8.72525
                                        5.12624C10.1987 4.83154 11.7288 5.05646 13.0551 5.76272C14.3814 6.46898 15.4221 7.61296 16 9.00001C16.5779 7.61296
                                        17.6186 6.46898 18.9449 5.76272C20.2712 5.05646 21.8013 4.83154 23.2748 5.12624C24.7482 5.42093 26.0741 6.21703 27.0267
                                        7.37908C27.9794 8.54114 28.5 9.99737 28.5 11.5C28.5 20 16 27 16 27Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* User */}
              <UserMenuPopover />
            </div>
            {/* /widgets */}
          </div>
        </div>
      </div>
    </div>
  );
}