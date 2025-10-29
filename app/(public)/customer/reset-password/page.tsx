import ResetPasswordForm from "@/components/customer/login/reset-password-form";


export default function ResetPasswordPage() {
  return (
    // Menggunakan h-screen (atau min-h-screen) dan justify-center untuk pemusatan vertikal
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50"> 
      <ResetPasswordForm />
    </div>
  );
}