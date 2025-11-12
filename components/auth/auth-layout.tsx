"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { AuthProvider, useAuthMode } from "./auth-context";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayoutContent({ children }: AuthLayoutProps) {
  const { isLogin, isRegister } = useAuthMode();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex border-b">
          <Link
            href="/customer/login"
            className={`flex-1 text-center py-4 font-semibold ${
              isLogin
                ? "text-gray-800 border-b-4 border-orange-400"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Masuk
          </Link>
          <Link
            href="/customer/register"
            className={`flex-1 text-center py-4 font-semibold ${
              isRegister
                ? "text-gray-800 border-b-4 border-orange-400"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Daftar
          </Link>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthProvider>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </AuthProvider>
  );
}
