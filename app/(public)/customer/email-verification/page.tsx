// app/customer/email-verification/page.tsx 
// (Mengikuti konvensi App Router Next.js)

import EmailVerificationForm from "@/components/customer/login/email-verification-form";

export default function EmailVerificationPage() {
  return (
    // Menggunakan h-screen untuk pemusatan vertikal yang tepat
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <EmailVerificationForm />
    </div>
  );
}