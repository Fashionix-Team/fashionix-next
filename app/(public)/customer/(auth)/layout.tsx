import { ReactNode } from "react";
import AuthLayout from "@/components/auth/auth-layout";

export default function CustomerAuthLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
