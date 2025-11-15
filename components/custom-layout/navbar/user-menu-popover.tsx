"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCustomToast } from "@/components/hooks/use-toast";

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function UserMenuPopover() {
  const { data: session, status } = useSession();
  const { showToast } = useCustomToast();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...data,
        callbackUrl: "/",
      });

      if (result?.ok) {
        showToast("Selamat datang! Berhasil masuk", "success");
        setIsOpen(false);
        // Use window.location for full reload to get fresh session
        window.location.href = "/";
      } else {
        const errorMessage = result?.error || "Email atau password salah.";
        if (process.env.NODE_ENV === 'development') {
          console.error("Login error:", errorMessage);
          console.error("Login result:", result);
        }
        showToast(errorMessage, "warning");
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Login exception:", error);
      }
      showToast("Terjadi kesalahan. Silakan coba lagi.", "danger");
    }
  };

  // Toggle popover untuk authenticated dan unauthenticated
  const handleUserClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut({ 
        redirect: false,
        callbackUrl: "/" 
      });
      
      showToast("Berhasil keluar dari akun", "success");
      setIsOpen(false);
      
      // Force full page reload to clear all state
      window.location.href = "/";
    } catch (error) {
      showToast("Gagal keluar. Silakan coba lagi.", "danger");
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      offset={12}
    >
      <PopoverTrigger>
        <button
          className="rounded-md p-1.5 text-white/90 hover:text-white transition cursor-pointer"
          onClick={handleUserClick}
          aria-label="User menu"
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
              d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M3.875 27.0001C5.10367 24.8716 6.87104 23.104 8.99944 21.875C11.1278 20.646 13.5423 19.999 16 19.999C18.4577 19.999 20.8722 20.646 23.0006 21.875C25.129 23.104 26.8963 24.8716 28.125 27.0001"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </PopoverTrigger>

      <PopoverContent className={`${status === "authenticated" ? "w-[280px]" : "w-[360px]"} rounded-xl border border-black/10 bg-white shadow-2xl overflow-hidden`}>
        {status === "authenticated" ? (
          <div className="p-4">
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-base shadow-md flex-shrink-0">
                  {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {session?.user?.name || "Pengguna"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session?.user?.email || ""}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <Link
                href="/customer/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-600 group-hover:text-orange-600 transition-colors duration-200"
                  >
                    <path
                      d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M2.42188 18.75C3.44042 16.9286 4.91940 15.4494 6.74073 14.4305C8.56206 13.4116 10.6514 12.8867 12.7769 12.8867C14.9024 12.8867 16.9917 13.4116 18.8131 14.4305C20.6344 15.4494 22.1134 16.9286 23.1319 18.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">Lihat Profil</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-600 group-hover:text-red-600 transition-colors duration-200"
                  >
                    <path
                      d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.3333 14.1667L17.5 10L13.3333 5.83334"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 10H7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">Keluar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Masuk ke akun Anda
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                {...register("username", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Masukkan email yang valid.",
                  },
                })}
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-gray-700 placeholder-[#25373F]/70 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Masukkan email Anda"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Kata Sandi
                </label>
                <Link
                  href="/customer/forget-password"
                  className="text-sm font-medium text-[#1B6392] hover:underline"
                >
                  Lupa Kata Sandi
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan kata sandi"
                  {...register("password", {
                    required: "Kata sandi wajib diisi",
                    minLength: {
                      value: 8,
                      message: "Minimal 8 karakter",
                    },
                  })}
                  className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 pr-10 text-gray-700 outline-none placeholder-[#25373F]/70 focus:ring-2 focus:ring-orange-400"
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <i className="far fa-eye" />
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#191C1F] hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
              {!isSubmitting && (
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.625 10H17.375"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.75 4.375L17.375 10L11.75 15.625"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              )}
            </button>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Belum punya akun?</p>
              <Link
                href="/customer/register"
                className="inline-flex w-full items-center justify-center rounded-md border border-orange-500 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50"
              >
                Buat Akun
              </Link>
            </div>
          </form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
