"use client";

import { useLayout } from "./layout-context";
import TopNav from "./navbar/top-nav";
import DeskNav from "./navbar/desk-nav";
import BottomNav from "./navbar/bottom-nav";
import MobileNav from "./navbar/mobile-nav";
import type { BagistoCollectionMenus } from "@/lib/bagisto/types";

type NavbarWrapperProps = {
  categories?: BagistoCollectionMenus[];
};

export default function NavbarWrapper({ categories = [] }: NavbarWrapperProps) {
  const { config } = useLayout();

  return (
    <div>
      {config.showTopNav && <TopNav />}
      {config.showDeskNav && <DeskNav />}
      {config.showBottomNav && <BottomNav categories={categories} />}
      {config.showMobileNav && <MobileNav categories={categories} />}
    </div>
  );
}
