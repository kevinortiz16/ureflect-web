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

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/10 bg-brand-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-white/60">{t("tagline")}</p>
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

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Ureflect LLC. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
