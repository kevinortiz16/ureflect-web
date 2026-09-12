import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware versions of Next.js's Link/useRouter/usePathname.
// Using these instead of the plain next/navigation versions means
// every internal link automatically keeps (or switches) the current
// language, without us having to prepend /es or /en by hand everywhere.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
