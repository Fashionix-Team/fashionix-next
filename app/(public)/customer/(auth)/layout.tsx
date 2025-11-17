import { ReactNode } from "react";
import AuthLayout from "@/components/auth/auth-layout";
import { HideLayout } from "@/components/custom-layout";

export default function CustomerAuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HideLayout hideBottomNav hideTopNav hideFooter />
      <AuthLayout>{children}</AuthLayout>;
    </>
  )
}
