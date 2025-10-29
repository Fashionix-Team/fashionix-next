// components/auth/ResetPasswordForm.tsx

"use client";

import clsx from "clsx";
import Link from "next/link";
import { Button } from "./loading-button";
import { LockClosedIcon } from "@heroicons/react/24/outline"; 
import PasswordInput from "@/components/password-input";


export default function ResetPasswordForm() {
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
                        Atur Ulang Kata Sandi
                    </h2>
                    <p className="mt-1 text-sm font-normal text-gray-500">
                        Buat kata sandi baru untuk akun Anda.
                    </p>
                </div>

                <form
                    noValidate
                    className="flex flex-col gap-y-4"
                >
                    <div className="flex flex-col gap-y-3">
                        
                        <PasswordInput
                            label="Kata Sandi Baru"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Minimal 8 karakter"
                        />

                        <PasswordInput
                            label="Konfirmasi Kata Sandi"
                            labelPlacement="outside"
                            name="passwordConfirmation"
                            placeholder="Ulangi kata sandi baru"
                        />
                    </div>

                    <div className="flex flex-col gap-y-2 pt-2">
                        <Button
                            className="bg-orange-600 hover:bg-orange-700" 
                            title="Selesaikan Reset Kata Sandi"
                            type="submit"
                        />
                        <span className="font-outfit text-center text-sm">
                            <Link className="font-medium text-gray-600 hover:text-blue-600 transition" href="/customer/login">
                                Batalkan dan Kembali ke Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}