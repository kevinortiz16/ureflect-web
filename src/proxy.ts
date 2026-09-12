import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Runs on every request: figures out which locale (es/en) to serve,
// based on the URL prefix, a cookie from a previous visit, or the
// browser's Accept-Language header, in that order.
export default createMiddleware(routing);

export const config = {
  // Apply to every route except Next.js internals, API routes, and
  // files that look like they have an extension (favicon.ico, etc.)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
