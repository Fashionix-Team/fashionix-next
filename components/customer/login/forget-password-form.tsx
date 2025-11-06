// components/customer/login/forget-password-form.tsx

"use client";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "./loading-button";
import InputText from "@/components/checkout/cart/input";
import forgotPasswordAction from "@/lib/forgot-password-action";
import { useFormState } from "react-dom";

// Definisikan state awal untuk useFormState
const initialState = {
    message: "",
    success: false,
};

export default function ForgetPasswordForm() {
    // Hubungkan action dengan state form
    const [state, formAction] = useFormState(forgotPasswordAction, initialState);

    return (
        <div className="flex w-full items-center justify-center py-10">
            <div className={clsx(
                "relative flex w-full max-w-md flex-col bg-white p-8 rounded-xl shadow-xl",
                "gap-y-8"
            )}>

                <div className="font-outfit text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Lupa Kata Sandi
                    </h2>
                    <p className="mt-1 text-sm font-normal text-gray-500 px-4">
                        Masukkan alamat email atau nomor ponsel yang terhubung dengan akun Clicon Anda.
                    </p>
                </div>

                <form
                    noValidate
                    className="flex flex-col gap-y-6"
                    action={formAction} // Gunakan formAction sebagai handler
                >
                    {/* Input Alamat Email/Nomor Ponsel */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="emailOrPhone">
                            Alamat Email
                        </label>
                        <InputText
                            label="Email"
                            typeName="email"
                            name="emailOrPhone" // Pastikan name sesuai dengan yang diambil di action
                            placeholder="Masukkan email atau nomor ponsel"
                            size="lg"
                        />
                    </div>

                    {/* Tampilkan pesan feedback dari Server Action */}
                    {state.message && (
                        <p className={clsx(
                            "text-sm font-medium text-center p-2 rounded",
                            state.success ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
                        )}>
                            {state.message}
                        </p>
                    )}

                    {/* Tombol Kirim Kode */}
                    <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        title="KIRIM KODE"
                        type="submit"
                        // Komponen Button Anda kemungkinan sudah menangani status loading
                    />

                    {/* Link Masuk dan Daftar */}
                    <div className="flex flex-col gap-y-2 text-sm text-gray-700 mt-4">
                        <p>
                            Sudah Memiliki Akun?{" "}
                            <Link className="font-medium text-blue-600 hover:text-blue-700 transition" href="/customer/login">
                                Masuk
                            </Link>
                        </p>
                        <p>
                            Belum Memiliki Akun?{" "}
                            <Link className="font-medium text-blue-600 hover:text-blue-700 transition" href="/customer/register">
                                Daftar
                            </Link>
                        </p>
                    </div>

                    {/* Teks Bantuan Pelanggan */}
                    <p className="mt-6 text-xs text-gray-500 text-center">
                        Anda dapat menghubungi Layanan Pelanggan untuk membantu memulihkan akses ke akun Anda.
                    </p>
                </form>
            </div>
        </div>
    );
}