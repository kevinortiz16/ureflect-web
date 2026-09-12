import { useTranslations } from "next-intl";

const serviceIcons: Record<string, string> = {
  content: "M4 7h3l2-2h6l2 2h3v12H4V7Z M12 10a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z",
  social:
    "M8.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM22.5 5.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM22.5 18.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM8.2 13.6l7.1 3.8M15.3 6.7 8.2 10.5",
  presence: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.6 3.8 6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-6-3.8-9S9.5 5.6 12 3Z",
  web: "M3 5h18v14H3V5Z M3 9h18 M8 5v4",
};

const serviceKeys = ["content", "social", "presence", "web"] as const;

export default function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section className="bg-brand-surface py-20 text-brand-black sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
              <span className="h-px w-6 bg-brand-blue-dark" />
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              {t("headlineStart")}
              <span className="text-brand-blue-dark">{t("headlineHighlight")}</span>
            </h2>
          </div>
          <p className="mt-6 max-w-sm text-sm text-brand-muted lg:mt-0">{t("intro")}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceKeys.map((key) => (
            <div
              key={key}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="text-brand-blue-dark"
                aria-hidden="true"
              >
                <path d={serviceIcons[key]} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-5 font-display text-lg font-bold">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                {t(`items.${key}.description`)}
              </p>
              <span className="mt-4 inline-block text-brand-blue-dark opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
