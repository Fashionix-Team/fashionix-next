import { ReactNode } from "react";
import Navbar from "@/components/custom-layout/navbar";
import Footer from "@/components/custom-layout/footer";
import { LayoutProvider } from "@/components/custom-layout/layout-context";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LayoutProvider>
      <Navbar />
      <main className="mx-auto w-full max-w-screen-2xl px-4 md:px-8 lg:px-16 xl:px-28 3xl:px-0">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
