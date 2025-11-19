import { ReactNode } from "react";
import Navbar from "@/components/custom-layout/navbar";
import { LayoutProvider } from "@/components/custom-layout/layout-context";
import { FooterWrapper } from "@/components/custom-layout";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LayoutProvider>
      <Navbar />
        <main className="mx-auto min-h-[calc(100vh-580px)] w-full max-w-screen-2xl px-[15px] xss:px-7.5">
          {children}
        </main>
      <FooterWrapper />
    </LayoutProvider>
  );
}
