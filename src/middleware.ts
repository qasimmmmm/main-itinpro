import { NextResponse, type NextRequest } from "next/server";

// Reads the country Vercel attaches at the edge (`x-vercel-ip-country`) and
// forwards it to the page as `x-user-country` so server components can
// personalize content with no client-side flash. Locally this header is absent,
// so pages fall back to neutral copy automatically.
export function middleware(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.geo?.country ||
    "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-country", country);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  // Also expose to the client if ever needed.
  if (country) {
    response.cookies.set("user-country", country, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  // Run on pages, skip static assets and files with extensions.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
