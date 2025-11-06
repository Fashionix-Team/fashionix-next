"use server";

import { recoverUserLogin } from "@/lib/bagisto";

// Tentukan tipe data untuk state form
interface ForgotPasswordState {
  message: string;
  success: boolean;
}

// State awal untuk useFormState
const initialState: ForgotPasswordState = {
    message: "",
    success: false,
};

export default async function forgotPasswordAction(
  prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = formData.get("emailOrPhone") as string;

  if (!email) {
    return {
      message: "Alamat Email wajib diisi.",
      success: false,
    };
  }

  try {
    // Memanggil fungsi dari lib/bagisto/index.ts
    const response = await recoverUserLogin({ email });

    // Memeriksa respons dari Bagisto
    if (response?.body?.data?.forgotPassword?.success) {
      return {
        message: response.body.data.forgotPassword.message || "Tautan pemulihan kata sandi telah dikirim ke email Anda.",
        success: true,
      };
    } 
    
    // Menangani respons error
    const errorMessage = response?.message || response?.error?.message || "Gagal mengirim permintaan pemulihan kata sandi. Email tidak terdaftar atau terjadi kesalahan server.";
    
    return {
        message: errorMessage,
        success: false,
    };

  } catch (e: any) {
    // Menangani error umum
    const errorMessage = e.message || "Terjadi kesalahan yang tidak diketahui saat mengirim permintaan.";
    return {
      message: errorMessage,
      success: false,
    };
  }
}