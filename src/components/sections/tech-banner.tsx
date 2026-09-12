import { useTranslations } from "next-intl";

export default function TechBanner() {
  const t = useTranslations("techBanner");

  return (
    <section className="relative overflow-hidden bg-brand-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand-blue/20 to-transparent"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className="shrink-0 rounded-xl border border-brand-blue/40 p-2 text-brand-blue"
            aria-hidden="true"
          >
            <rect x="6" y="6" width="12" height="12" rx="2" />
            <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" strokeLinecap="round" />
          </svg>
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            {t("headline")}
          </h2>
        </div>
        <p className="max-w-xl text-sm text-white/70 lg:border-l lg:border-white/15 lg:pl-8">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
