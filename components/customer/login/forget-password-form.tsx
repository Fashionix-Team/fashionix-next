// components/auth/ForgetPasswordForm.tsx

"use client";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "./loading-button"; 
import InputText from "@/components/checkout/cart/input"; 
import { LockClosedIcon } from "@heroicons/react/24/outline"; 


export default function ForgetPasswordForm() {
    
    return (
        <div className="flex w-full items-center justify-center py-10">
            <div className={clsx(
                "relative flex w-full max-w-md flex-col bg-white p-8 rounded-xl shadow-xl", 
                "gap-y-8"
            )}>
                
                <div className="font-outfit text-center">
                    
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 mb-3">
                        <LockClosedIcon className="h-5 w-5 text-blue-600" /> 
                    </div>

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
                >
                    {/* Input Alamat Email/Nomor Ponsel */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="emailOrPhone">
                            Alamat Email
                        </label>
                        <InputText
                            typeName="email"
                            name="emailOrPhone"
                            placeholder="Masukkan email atau nomor ponsel"
                            size="lg"
                        />
                    </div>

                    {/* Tombol Kirim Kode */}
                    <Button
                        className="bg-orange-500 hover:bg-orange-600" 
                        title="KIRIM KODE"
                        type="submit"
                        arrow={true} 
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