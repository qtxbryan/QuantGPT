import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const authPaths = ["/login", "/register"];
  const { pathname } = request.nextUrl;

  //  if no token and accessing protected route
  if (!token && !authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if token exist and try to access login/register, redirect to home
  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
