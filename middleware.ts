import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const checkAuthPages = (pathName: string) => {
  return (
    pathName.includes("/login") ||
    pathName.includes("/forget-password") ||
    pathName.includes("/register") ||
    pathName.includes("/reset-password") ||
    pathName.includes("/email-verification")
  );
};

export const config = {
  matcher: ["/customer/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const pathName = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    const token = req.nextauth.token;

    // If user is logged in and tries to access auth pages, redirect to home
    if (token && checkAuthPages(pathName)) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // If user is not logged in and tries to access protected pages, redirect to login
    if (!token && !checkAuthPages(pathName)) {
      url.pathname = "/customer/login";
      url.search = `callbackUrl=${encodeURIComponent(pathName)}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        const pathName = req.nextUrl.pathname;

        // Allow access to auth pages without token
        if (checkAuthPages(pathName)) {
          return true;
        }

        // Protected pages require token
        return !!token;
      },
    },
  }
);
