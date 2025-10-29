"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/login' || pathname === '/';
  const isRegister = pathname === '/register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email atau password salah');
        return;
      }

      router.push('/success/login');
      router.refresh();
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex border-b">
          <Link
            href="/login"
            className={`flex-1 text-center py-4 font-semibold ${isLogin ? 'text-gray-800 border-b-4 border-orange-400' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className={`flex-1 text-center py-4 font-semibold ${isRegister ? 'text-gray-800 border-b-4 border-orange-400' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Daftar
          </Link>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Alamat Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-700">Kata Sandi</label>
                <Link href="#" className="text-sm text-orange-500">Lupa Kata Sandi</Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3"
            >
              <span className="uppercase">{loading ? 'Memproses...' : 'Masuk'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="px-3 text-sm text-gray-400">atau</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button type="button" className="w-full inline-flex items-center justify-center rounded border border-gray-200 px-4 py-2 bg-white">
              <img src="/image/logo/google-circle.png" alt="Google" className="w-5 h-5 mr-3" />
              <span className="text-sm text-gray-700">Masuk dengan Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}