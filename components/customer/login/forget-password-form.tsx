"use client";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "./loading-button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCustomToast } from "@/components/hooks/use-toast";
import { forgotPasswordAction } from "../lib/action";

type ForgetPasswordInputs = {
  email: string;
};

export default function ForgetPasswordForm() {
  const { showToast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgetPasswordInputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("emailOrPhone", data.email);

      const initialState = {
        message: "",
        success: false,
      };

      const result = await forgotPasswordAction(initialState, formData);

      if (result.success) {
        showToast(result.message, "success");
      } else {
        showToast(result.message, "warning");
      }
    } catch (error) {
      showToast("Terjadi kesalahan. Silakan coba lagi.", "danger");
    }
  };

  return (
    <div className="flex w-full items-center justify-center py-10">
      <div
        className={clsx(
          "relative flex w-full max-w-md flex-col bg-white p-8 rounded-xl shadow-xl",
          "gap-y-8"
        )}
      >
        <div className="font-outfit text-center">
          <h2 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi</h2>
          <p className="mt-1 text-sm font-normal text-gray-500 px-4">
            Masukkan alamat email yang terhubung dengan akun
            Fashionix Anda.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-y-6"
        >
          {/* Input Alamat Email */}
          <div className="flex flex-col gap-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
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
              className={`block w-full rounded border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`}
              placeholder="Masukkan email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Tombol Kirim Kode */}
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            title="KIRIM KODE"
            type="submit"
            disabled={isSubmitting}
          />

          {/* Link Masuk dan Daftar */}
          <div className="flex flex-col gap-y-2 text-sm text-gray-700 mt-4">
            <p>
              Sudah Memiliki Akun?{" "}
              <Link
                className="font-medium text-blue-600 hover:text-blue-700 transition"
                href="/customer/login"
              >
                Masuk
              </Link>
            </p>
            <p>
              Belum Memiliki Akun?{" "}
              <Link
                className="font-medium text-blue-600 hover:text-blue-700 transition"
                href="/customer/register"
              >
                Daftar
              </Link>
            </p>
          </div>

          {/* Teks Bantuan Pelanggan */}
          <p className="mt-6 text-xs text-gray-500 text-center">
            Anda dapat menghubungi Layanan Pelanggan untuk membantu memulihkan
            akses ke akun Anda.
          </p>
        </form>
      </div>
    </div>
  );
}