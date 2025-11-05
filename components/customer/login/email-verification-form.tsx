// components/auth/EmailVerificationForm.tsx

"use client";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "./loading-button"; 
import { LockClosedIcon } from "@heroicons/react/24/outline"; // Menggunakan LockClosedIcon sebagai placeholder umum
import PasswordInput from "@/components/password-input";


export default function EmailVerificationForm() {
    
    return (
        <div className="flex w-full items-center justify-center py-10">
            <div className={clsx(
                "relative flex w-full max-w-md flex-col bg-white p-8 rounded-xl shadow-xl", 
                "gap-y-8"
            )}>
                
                <div className="font-outfit text-center">
                    <h2 className="text-2xl font-bold text-gray-900"> 
                        Verifikasi Alamat Email Anda
                    </h2>
                    <p className="mt-1 text-sm font-normal text-gray-500 px-4">
                        Nam ultricies lectus a risus blandit elementum. Quisque arcu arcu, tristique a eu in diam.
                    </p>
                </div>

                <form
                    noValidate
                    className="flex flex-col gap-y-4"
                >
                    {/* Input Kode Verifikasi dan Link Kirim Ulang */}
                    <div className="flex flex-col gap-y-3">
                        
                        <div className="flex justify-between items-end mb-1">
                            <label className="text-sm font-medium text-gray-700" htmlFor="verificationCode">
                                Kode Verifikasi
                            </label>
                            <button 
                                type="button" 
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                            >
                                Kirim Ulang Kode
                            </button>
                        </div>
                        <form>
                            <PasswordInput id="verfikasi" name="verifikasi" />
                        </form>
                    </div>

                    <div className="flex flex-col gap-y-2 pt-2">
                        <Button
                            className="bg-orange-600 hover:bg-orange-700" 
                            title="VERIFIKASI SAYA"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}