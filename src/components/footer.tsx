import { useTranslations } from "next-intl";
import Logo from "@/components/logo";

const icons = [
  {
    key: "photography",
    path: "M4 7h3l2-2h6l2 2h3v12H4V7Z M12 10a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z",
  },
  {
    key: "social",
    path: "M17 8a3 3 0 1 0-2.83-4H14a3 3 0 0 0 .09 5.9L9.1 12.8A3 3 0 1 0 9 17l5 2.9a3 3 0 1 0 1-1.73L10 15.3a3 3 0 0 0 0-2.6l5.1-2.9c.55.44 1.24.7 1.9.7Z",
  },
  {
    key: "web",
    path: "M3 5h18v14H3V5Z M3 9h18 M8 5v4",
  },
  {
    key: "ai",
    path: "M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2 M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z",
  },
];

// Redes de Ureflect (la marca del negocio). LinkedIn todavía no tiene
// perfil creado, así que su ícono se muestra apagado y sin enlace —
// en cuanto exista, solo hace falta agregarle un `href` aquí.
const socialLinks: { key: string; href: string | null; path: string }[] = [
  {
    key: "Instagram",
    href: "https://www.instagram.com/ureflect_media",
    path: "M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z M16.2 7.3h.01",
  },
  {
    key: "TikTok",
    href: "https://www.tiktok.com/@ureflect",
    path: "M14 4v9.5a3.5 3.5 0 1 1-2-3.16 M14 4a4 4 0 0 0 4 4",
  },
  {
    key: "YouTube",
    href: "https://www.youtube.com/@UreflectLLC",
    path: "M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z M10 9.3v5.4l5-2.7-5-2.7Z",
  },
  {
    key: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61552946596940",
    path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M14 8h-1.6c-.7 0-1.4.6-1.4 1.4V11H9.5v2H11v6h2v-6h1.6l.4-2H13V9.6c0-.3.2-.6.6-.6H14V8Z",
  },
  {
    key: "LinkedIn",
    href: null,
    path: "M4.5 4.5h15v15h-15v-15Z M8 10.5v6 M8 8v.01 M12 16.5v-3.2a1.8 1.8 0 0 1 3.6 0v3.2 M12 12.3v4.2",
  },
];

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/10 bg-brand-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-white/60">{t("tagline")}</p>

            {/* Contacto rápido: los mismos datos que /contacto, para
                que escribir no dependa de navegar hasta esa página. */}
            <div className="mt-5 flex flex-col gap-2 text-sm text-white/70">
              <a
                href="https://wa.me/12024316197"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-blue"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z M8.8 9.4c.4 1.8 1.7 3.6 3.6 4.4.5-.5.9-1 1.1-1.3.3-.4.6-.3.9-.1.4.3 1.3.9 1.6 1.1.2.2.3.9-.2 1.4-.6.6-1.8.9-3.4.2-1.9-.8-3.4-2.3-4.2-4.1-.6-1.4-.2-2.5.3-3 .3-.3.6-.2.8 0l.5 1.4Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                +1 (202) 431-6197
              </a>
              <a
                href="mailto:contact@ureflect.net"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-blue"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M4 6h16v12H4V6Z M4 6l8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                contact@ureflect.net
              </a>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
            {icons.map((icon) => (
              <li key={icon.key} className="flex flex-col items-center gap-2 text-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="text-brand-blue"
                  aria-hidden="true"
                >
                  <path d={icon.path} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                  {t(icon.key as "photography" | "social" | "web" | "ai")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Redes sociales + copyright, en la misma línea divisoria que
            ya usaba el copyright — así el bloque de arriba (el que a
            Kevin le gusta) queda intacto. */}
        <div className="mt-10 flex flex-col items-center gap-6 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <ul className="flex items-center gap-3">
            {socialLinks.map((social) =>
              social.href ? (
                <li key={social.key}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.key}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-brand-blue hover:text-brand-blue"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path d={social.path} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ) : (
                <li key={social.key} title={t("comingSoon")}>
                  <span
                    aria-label={`${social.key} — ${t("comingSoon")}`}
                    className="flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-white/5 text-white/25"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path d={social.path} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </li>
              )
            )}
          </ul>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Ureflect LLC. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
