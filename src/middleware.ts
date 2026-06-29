import { NextResponse, type NextRequest } from "next/server";

// Reads the country Vercel attaches at the edge (`x-vercel-ip-country`) and
// forwards it to the page as `x-user-country` so server components can
// personalize content with no client-side flash. Locally this header is absent,
// so pages fall back to neutral copy automatically.
export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-country", country);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  // Expose to the client for static-page personalization (see geo-client.tsx).
  // Intentionally NOT httpOnly — the homepage hero reads it in the browser so the
  // page can stay statically cached. The value is a non-sensitive ISO country
  // code; `secure` keeps it HTTPS-only in production.
  if (country) {
    response.cookies.set("user-country", country, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}

export const config = {
  // Run on pages, skip static assets and files with extensions.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
