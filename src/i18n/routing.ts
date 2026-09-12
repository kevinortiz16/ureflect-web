import { defineRouting } from "next-intl/routing";

// Single source of truth for which languages the site supports.
// Spanish is the default because Ureflect's primary market is the
// DMV's Spanish-speaking business community; English is the second
// audience (e.g. English-speaking clients, recruiters reviewing this
// portfolio piece).
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always", // always show /es or /en in the URL
});
