"use client";

import React from "react";
import Link from "next/link";

type AuthLayoutProps = {
  title?: string;
  subtitle?: string;
  rightTitle?: string;
  rightText?: string;
  rightCtaText?: string;
  rightCtaHref?: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title = "Masuk",
  subtitle = "Masuk Dengan email & password",
  rightTitle = "Hallo, Selamat Datang!",
  rightText = "Daftar dengan detail Anda Untuk memulai perjalanan bersama kami.",
  rightCtaText = "Daftar",
  rightCtaHref = "/register",
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-12">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: form area */}
        <div className="p-10 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="mt-4 text-sm text-gray-500">{subtitle}</p>

          <div className="mt-4 flex items-center gap-3">
            <button type="button" aria-label="google" className="p-2 border rounded-md bg-white hover:shadow">
              <img src="/image/logo/google-circle.png" alt="Google" className="w-5 h-5" />
            </button>
            <button type="button" aria-label="facebook" className="p-2 border rounded-md bg-white hover:shadow">
              <img src="/image/logo/facebook.png" alt="Facebook" className="w-5 h-5" />
            </button>
            <button type="button" aria-label="github" className="p-2 border rounded-md bg-white hover:shadow">
              <img src="/image/logo/github.png" alt="GitHub" className="w-5 h-5" />
            </button>
            <button type="button" aria-label="linkedin" className="p-2 border rounded-md bg-white hover:shadow">
              <img src="/image/logo/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6">{children}</div>
        </div>

        {/* Right: purple panel */}
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8">
          <div className="z-10 max-w-md text-center">
            <h3 className="text-3xl font-extrabold">{rightTitle}</h3>
            <p className="mt-3 text-sm text-purple-100">{rightText}</p>

            <Link href={rightCtaHref} className="mt-6 inline-block rounded-md border border-white/40 px-6 py-2 text-sm font-medium hover:bg-white/10">
              {rightCtaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
