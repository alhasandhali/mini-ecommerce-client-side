import { NextResponse } from "next/server";

export function proxy(request) {
  const url = request.nextUrl.clone();

  const token = request.cookies.get("next-auth.session-token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-product/:path*", "/manage-products/:path*"],
};
