"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Small ES | EN toggle. It reuses the current pathname and just swaps
 * the locale segment, so switching language never sends the visitor
 * back to the homepage.
 */
export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-white/30">|</span>}
          <Link
            href={pathname}
            locale={locale}
            className={
              locale === activeLocale
                ? "text-white"
                : "text-white/50 hover:text-white transition-colors"
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
