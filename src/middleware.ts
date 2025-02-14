import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard", "/report", "/student"],
};
