// app/(public)/customer/reset-password/page.tsx

export const dynamic = 'force-dynamic';
import { ResetPasswordForm } from "@/components/customer/login/reset-password-form";
import AuthLayout from "@/components/auth/auth-layout";

// Set properti dinamis ke 'force-dynamic' untuk memastikan searchParams selalu segar
// Namun, karena menggunakan useSearchParams di Client Component, ini mungkin tidak mutlak perlu.
// Mari kita pastikan form dipanggil dalam tata letak yang benar.

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      {/* Komponen Client yang menangani URL params */}
      <ResetPasswordForm /> 
    </AuthLayout>
  );
}