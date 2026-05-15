import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Allowlist-based route guard.
 * Only paths that match the app's actual routes are allowed through.
 * Everything else returns HTTP 404 immediately, so Google deindexes
 * spam/injected URLs automatically without needing to enumerate them.
 */

// All valid route prefixes in this app (add new routes here as the app grows)
const ALLOWED_PREFIXES = [
  "/",
  "/ve-chung-toi",
  "/tuyen-dung",
  "/tin-noi-bo",
  "/truyen-thong",
  "/lien-he",
];

function isAllowed(pathname: string): boolean {
  // Exact root
  if (pathname === "/") return true;

  return ALLOWED_PREFIXES.some(
    (prefix) => prefix !== "/" && pathname.startsWith(prefix + "/") || pathname === prefix
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAllowed(pathname)) {
    // Rewrite to Next.js built-in not-found page so it uses the app's layout
    // and returns a proper HTTP 404 status.
    const url = request.nextUrl.clone();
    url.pathname = "/_not-found";
    return NextResponse.rewrite(url, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT Next.js internals and static files.
     */
    "/((?!_next/static|_next/image|favicon\\.ico|favicon\\.png|images|fa|robots\\.txt|sitemap\\.xml|api/).*)",
  ],
};
