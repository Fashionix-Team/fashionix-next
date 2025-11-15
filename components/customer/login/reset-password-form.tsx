"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { resetUserPassword } from "@/lib/bagisto";

// Impor Heroicons (sesuai permintaan "HeroUI" untuk ikon)
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
}
 from '@heroicons/react/20/solid'; 
 
// Impor LoadingDots dari path yang terdeteksi di proyek Anda
import LoadingDots from "@/components/loading-dots"; 

// Asumsi tipe input form Anda
interface ResetPasswordFormInputs {
  password: string;
  password_confirmation: string;
}

interface AlertMessage {
  type: 'success' | 'error' | 'warning';
  message: string;
}

// Komponen Alert Sederhana menggunakan Heroicons dan Tailwind CSS
const Alert = ({ alert }: { alert: AlertMessage }) => {
  const baseClasses = "flex p-4 mb-4 rounded-lg text-sm items-start";
  let icon: JSX.Element;
  let classes: string;

  switch (alert.type) {
    case 'success':
      classes = "bg-green-100 border border-green-400 text-green-800";
      icon = <CheckCircleIcon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />;
      break;
    case 'error':
      classes = "bg-red-100 border border-red-400 text-red-800";
      icon = <XCircleIcon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />;
      break;
    case 'warning':
    default:
      classes = "bg-yellow-100 border border-yellow-400 text-yellow-800";
      icon = <ExclamationTriangleIcon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />;
      break;
  }

  return (
    <div className={`${baseClasses} ${classes}`} role="alert">
      {icon}
      <span className="font-medium flex-1">{alert.message}</span>
    </div>
  );
};

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formInput, setFormInput] = useState<ResetPasswordFormInputs>({
    password: "",
    password_confirmation: "",
  });
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const isReady = useMemo(() => !!email && !!token, [email, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const resetPasswordMutation = useMutation({
    mutationFn: (input: {
      email: string;
      password: string;
      password_confirmation: string;
      token: string;
    }) => resetUserPassword(input),
    onSuccess: (data) => {
      if (data?.status === true) {
        setAlert({
          type: 'success',
          message: data.message || "Password Anda berhasil direset. Anda akan diarahkan ke halaman login.",
        });
        setTimeout(() => {
          router.push("/customer/login");
        }, 3000);
      } else {
        // Asumsi pesan error dari Bagisto API ada di data.message
        setAlert({
          type: 'error',
          message: data?.message || "Gagal mereset password. Terjadi kesalahan. Silakan coba lagi.",
        });
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "Gagal melakukan reset password. Pastikan link sudah benar dan belum kadaluarsa.";
      setAlert({
        type: 'error',
        message: errorMessage,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null); 

    if (!isReady) {
      setAlert({
        type: 'error',
        message: "Link reset password tidak lengkap atau tidak valid. Periksa kembali URL Anda (missing email/token).",
      });
      return;
    }

    if (formInput.password.length < 8) {
        setAlert({
            type: 'warning',
            message: "Password minimal harus 8 karakter.",
        });
        return;
    }

    if (formInput.password !== formInput.password_confirmation) {
      setAlert({
        type: 'warning',
        message: "Konfirmasi password tidak cocok.",
      });
      return;
    }

    resetPasswordMutation.mutate({
      email: email as string,
      token: token as string,
      password: formInput.password,
      password_confirmation: formInput.password_confirmation,
    });
  };

  if (!isReady) {
    return (
      <div className="text-center p-8 max-w-lg mx-auto my-10 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Link Reset Password Tidak Valid</h2>
        <p className="mb-6">
          Mohon periksa kembali link yang Anda terima di email. Pastikan URL menyertakan parameter `email` dan `token`.
        </p>
        <button
          onClick={() => router.push("/customer/forget-password")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
        >
          Minta Link Baru
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-8 border rounded-lg shadow-xl bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Atur Ulang Password
      </h2>
      
      {/* Menggunakan komponen Alert Heroicons kustom */}
      {alert && <Alert alert={alert} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password Baru
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            value={formInput.password}
            onChange={handleChange}
            placeholder="Minimal 8 karakter"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Konfirmasi Password Baru
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            minLength={8}
            value={formInput.password_confirmation}
            onChange={handleChange}
            placeholder="Ketik ulang password baru"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={resetPasswordMutation.isPending || !formInput.password || !formInput.password_confirmation || formInput.password !== formInput.password_confirmation || formInput.password.length < 8}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {resetPasswordMutation.isPending ? (
            <div className="flex items-center">
              <LoadingDots className="bg-amber-50" />   
              <span className="ml-2">Memproses...</span>
            </div>
          ) : (
            "Simpan Password Baru"
          )}
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Ingat password Anda? 
            <button
                type="button"
                onClick={() => router.push("/customer/login")}
                className="text-blue-600 hover:text-blue-500 ml-1 font-medium"
            >
                Masuk
            </button>
        </p>
      </form>
    </div>
  );
};