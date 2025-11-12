"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";

type AuthMode = "login" | "register";

interface AuthContextType {
  mode: AuthMode;
  isLogin: boolean;
  isRegister: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Support both /login, /register and /customer/login, /customer/register
  const mode: AuthMode =
    pathname === "/register" || pathname === "/customer/register"
      ? "register"
      : "login";
  const isLogin = mode === "login";
  const isRegister = mode === "register";

  return (
    <AuthContext.Provider value={{ mode, isLogin, isRegister }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthMode() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthMode must be used within an AuthProvider");
  }
  return context;
}
