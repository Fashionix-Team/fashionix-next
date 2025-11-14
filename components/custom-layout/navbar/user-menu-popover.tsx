"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
        router.refresh();
      } else {
        showToast(result?.error || "Email atau password salah.", "warning");
      }
    } catch (error) {
      showToast("Terjadi kesalahan. Silakan coba lagi.", "danger");
    }
  };

  // Jika sudah login, redirect ke profil
  const handleUserClick = () => {
    if (status === "authenticated") {
      router.push("/customer/account");
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Popover
      isOpen={status === "unauthenticated" ? isOpen : false}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      offset={12}
    >
      <PopoverTrigger>
        <button
          className="rounded-md p-1.5 text-white/90 hover:text-white transition"
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

      <PopoverContent className="w-[360px] rounded-xl border border-black/10 bg-white p-5 shadow-2xl">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
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
      </PopoverContent>
    </Popover>
  );
}
