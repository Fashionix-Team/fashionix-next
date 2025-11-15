"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCustomToast } from "@/components/hooks/use-toast";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { showToast } = useCustomToast();
  const router = useRouter();

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
        username: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (result?.ok) {
        showToast("Login Berhasil", "success");
        window.location.href = "/";
      } else {
        showToast(result?.error || "Email atau password salah", "warning");
      }
    } catch (error) {
      showToast("Terjadi kesalahan. Silakan coba lagi.", "danger");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="block text-sm text-gray-700">
          Alamat Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email.",
            },
          })}
          id="email"
          type="email"
          className={`mt-1 block w-full rounded border ${
            errors.email ? "border-red-500" : "border-gray-200"
          } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm text-gray-700">
            Kata Sandi
          </label>
          <Link
            href="/customer/forget-password"
            className="text-sm text-orange-500 hover:text-orange-600"
          >
            Lupa Kata Sandi
          </Link>
        </div>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 2,
              message: "Be at least 2 characters long",
            },
            validate: (value) => {
              if (!/[0-9]/.test(value))
                return "Contain at least one number.";
              return true;
            },
          })}
          id="password"
          type="password"
          className={`mt-1 block w-full rounded border ${
            errors.password ? "border-red-500" : "border-gray-200"
          } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 inline-flex items-center justify-center rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="uppercase">
          {isSubmitting ? "Memproses..." : "Masuk"}
        </span>
        {!isSubmitting && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="px-3 text-sm text-gray-400">atau</div>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <button
        type="button"
        className="w-full inline-flex items-center justify-center rounded border border-gray-200 px-4 py-2 bg-white hover:bg-gray-50"
      >
        <img
          src="/image/logo/google-circle.png"
          alt="Google"
          className="w-5 h-5 mr-3"
        />
        <span className="text-sm text-gray-700">
          Masuk dengan Google
        </span>
      </button>
    </form>
  );
}
