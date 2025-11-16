"use client";

import { useLayout } from "./layout-context";
import Footer from "./footer";

export default function FooterWrapper() {
  const { config } = useLayout();

  if (!config.showFooter) return null;

  return <Footer />;
}
