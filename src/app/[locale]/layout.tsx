import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "../globals.css";

// Self-hosted fonts (via the @fontsource npm packages) instead of
// next/font/google. Two reasons: (1) this dev environment's network
// is sandboxed and can't reach fonts.googleapis.com, and (2)
// self-hosting is generally the better choice for production anyway —
// no external request to Google at all, so it's faster and avoids
// sending visitor IPs to a third party.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

export const metadata: Metadata = {
  title: "Ureflect | Content · Digital · Growth",
  description:
    "Contenido visual, presencia digital y estrategia para negocios que quieren crecer en el DMV.",
};

// Pre-render /es and /en at build time instead of on first request.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Guard against a locale that isn't es/en slipping through, e.g. /fr
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Lets every Server Component below know which locale it's rendering,
  // so static rendering / caching works correctly per-locale.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col bg-white text-brand-black antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
