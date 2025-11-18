import { LayoutProvider } from "@/components/custom-layout";
import Navbar from "@/components/custom-layout/navbar";
import { ReactNode } from "react";
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LayoutProvider>
      <main>
        <Navbar />
        <div className="mx-auto min-h-[calc(100vh-580px)] w-full max-w-screen-2xl px-[15px] xss:px-7.5">
          {children}
        </div>
      </main>
    </LayoutProvider>
  );
}
