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
                    <h2 className="text-2xl font-bold text-gray-900"> 
                        Atur Ulang Kata Sandi
                    </h2>
                    <p className="mt-1 text-sm font-normal text-gray-500">
                        Duis sagittis molestie tellus, at eleifend sapien pellque quis
                        . Fusce lorem nunc, fringilla sit amet nunc.
                    </p>
                </div>

                <form
                    noValidate
                    className="flex flex-col gap-y-4"
                >
                    <div className="flex flex-col gap-y-3">
                    <form>
                        <label htmlFor="password">Kata Sandi Baru</label>
                        <PasswordInput id="password" placeholder="  8+ karakter" name="password" />
                    </form>

                    <form>
                        <label htmlFor="konfirmasi">Konfirmasi Sandi Baru</label>
                        <PasswordInput id="konfirmasi" name="konfirmasi" />
                    </form> 
                    </div>

                    <div className="flex flex-col gap-y-2 pt-2">
                        <Button
                            className="bg-orange-600 hover:bg-orange-700" 
                            title="ATUR ULANG KATA SANDI"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}