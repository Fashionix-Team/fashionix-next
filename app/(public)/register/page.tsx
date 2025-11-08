"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const isRegister = pathname === '/register';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push('/login');
        return;
      }

      const text = await res.text().catch(() => null);
      setError(text || 'Registration failed. Please try again.');
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
            className={`flex-1 text-center py-4 font-semibold ${!isRegister ? 'text-gray-800 border-b-4 border-orange-400' : 'text-gray-500 hover:text-gray-800'}`}
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
              <label className="block text-sm text-gray-700">Nama Lengkap</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

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
              <label className="block text-sm text-gray-700">Kata Sandi</label>
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

            <div>
              <label className="block text-sm text-gray-700">Konfirmasi Kata Sandi</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3"
            >
              <span className="uppercase">{loading ? 'Memproses...' : 'DAFTAR'}</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="px-3 text-sm text-gray-400">atau</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button type="button" className="w-full inline-flex items-center justify-center rounded border border-gray-200 px-4 py-2 bg-white">
              <img src="/image/logo/google-circle.png" alt="Google" className="w-5 h-5 mr-3" />
              <span className="text-sm text-gray-700">Daftar dengan Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
