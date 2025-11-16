"use client";

import { useEffect } from "react";
import { useLayout } from "./layout-context";

interface HideLayoutProps {
  hideTopNav?: boolean;
  hideDeskNav?: boolean;
  hideBottomNav?: boolean;
  hideMobileNav?: boolean;
  hideFooter?: boolean;
}

/**
 * Component untuk menyembunyikan bagian layout tertentu.
 * Gunakan di dalam page component untuk mengontrol tampilan layout.
 * 
 * @example
 * ```tsx
 * export default function CheckoutPage() {
 *   return (
 *     <>
 *       <HideLayout hideTopNav hideFooter />
 *       <div>Checkout content...</div>
 *     </>
 *   );
 * }
 * ```
 */
export default function HideLayout({
  hideTopNav = false,
  hideDeskNav = false,
  hideBottomNav = false,
  hideMobileNav = false,
  hideFooter = false,
}: HideLayoutProps) {
  const { setConfig, resetConfig } = useLayout();

  useEffect(() => {
    setConfig({
      showTopNav: !hideTopNav,
      showDeskNav: !hideDeskNav,
      showBottomNav: !hideBottomNav,
      showMobileNav: !hideMobileNav,
      showFooter: !hideFooter,
    });

    // Reset saat component unmount
    return () => {
      resetConfig();
    };
    // Dependencies hanya props yang bisa berubah
    // setConfig dan resetConfig sudah di-memoize dengan useCallback
  }, [hideTopNav, hideDeskNav, hideBottomNav, hideMobileNav, hideFooter, setConfig, resetConfig]);

  return null;
}
