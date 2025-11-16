"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

interface LayoutConfig {
  showTopNav: boolean;
  showDeskNav: boolean;
  showBottomNav: boolean;
  showMobileNav: boolean;
  showFooter: boolean;
}

interface LayoutContextType {
  config: LayoutConfig;
  setConfig: (_newConfig: Partial<LayoutConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: LayoutConfig = {
  showTopNav: true,
  showDeskNav: true,
  showBottomNav: true,
  showMobileNav: true,
  showFooter: true,
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<LayoutConfig>(defaultConfig);

  const setConfig = useCallback((newConfig: Partial<LayoutConfig>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(defaultConfig);
  }, []);

  return (
    <LayoutContext.Provider value={{ config, setConfig, resetConfig }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

// Hook untuk mengatur layout dari child component
export function useLayoutConfig(layoutConfig: Partial<LayoutConfig>) {
  const { setConfig, resetConfig } = useLayout();

  useEffect(() => {
    setConfig(layoutConfig);

    return () => {
      resetConfig();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
