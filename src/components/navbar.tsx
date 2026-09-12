"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/logo";
import LocaleSwitcher from "@/components/locale-switcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/servicios", label: t("services") },
    { href: "/portafolio", label: t("portfolio") },
    { href: "/nosotros", label: t("about") },
    { href: "/contacto", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-black/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          <Link
            href="/contacto"
            className="rounded-full border border-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue hover:text-brand-black"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="border-t border-white/10 px-4 pb-6 md:hidden">
          <nav className="flex flex-col gap-1 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <LocaleSwitcher />
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="rounded-full border border-brand-blue px-4 py-2 text-sm font-semibold text-white"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
