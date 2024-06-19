import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const verify = req.cookies.get("isLoggedIn")?.value;
  const url = req.nextUrl.pathname;

  const redirectToLogin = NextResponse.redirect(new URL("/login", req.url));
  if (!verify && (url == "/wishlist" || url.startsWith("/account"))) {
    return redirectToLogin;
  }
  if (
    verify &&
    ["/login", "/register", "/forgot-password", "/reset-password"].includes(url)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

/**
 * Add all the protected routes here in the matcher.
 */
export const config = {
  matcher: [
    "/wishlist",
    "/account/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
