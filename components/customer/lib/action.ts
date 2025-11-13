"use server";

import { RecoverPasswordFormState } from "./types";

import { isObject } from "@/lib/type-guards";
import {
  createUserToLogin,
  recoverUserLogin,
  subsCribeUser,
} from "@/lib/bagisto";
import { RegisterInputs } from "../login/registration-form";

export type RegisterFormState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
    apiError?: string;
    agreement?: string[];
  };
};

export async function createUser(formData: RegisterInputs) {
  try {
    const { firstName, lastName, email, password, passwordConfirmation } =
      formData;

    const user = await createUserToLogin({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      agreement: true,
    });

    if (isObject(user?.error)) {
      return {
        error: { message: user?.error?.message },
        success: false,
        customerSignUp: {},
      };
    }

    return {
      error: {},
      success: true,
      customerSignUp: user?.customerSignUp,
    };
  } catch (err: any) {
    return {
      error: { message: err?.message },
      success: false,
      customerSignUp: {},
    };
  }
}

export async function recoverPassword(formData: {
  email: string;
}): Promise<RecoverPasswordFormState> {
  const data = { email: formData?.email };

  const result = await recoverUserLogin(data);

  if (isObject(result?.error)) {
    return {
      errors: {
        apiRes: {
          status: false,
          msg: result?.error?.message ?? "Something went wrong",
        },
      },
    };
  }

  return {
    errors: {
      apiRes: {
        status: true,
        msg:
          result?.body?.data?.forgotPassword?.success ??
          "Recovery email sent successfully.",
      },
    },
  };
}

// Action for subsribe
export async function userSubscribe(
  prevState: RecoverPasswordFormState,
  formData: FormData
): Promise<RecoverPasswordFormState> {
  const email = formData.get("email");

  const data = {
    email: typeof email === "string" ? email.trim() : "",
  };

  try {
    const result = await subsCribeUser(data);

    if (result?.error) {
      return {
        errors: {
          apiRes: {
            status: false,
            msg: result.error.message || "Something went wrong",
          },
        },
      };
    }

    return {
      errors: {
        apiRes: {
          status: true,
          msg: result?.body?.data?.message || "Subscription successful!",
        },
      },
    };
  } catch (error) {
    return {
      errors: {
        apiRes: {
          status: false,
          msg: "Unexpected error occurred. Please try again.",
        },
      },
    };
  }
}

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

export async function forgotPasswordAction(
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