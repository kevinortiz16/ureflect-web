import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const individualKeys = [
  "brandSession",
  "progressPhoto",
  "finalPhoto",
  "reel",
  "corporateVideo",
  "transformationVideo",
  "website",
  "drone",
] as const;

const planKeys = ["cimiento", "estructura", "acabado"] as const;

export default async function ServiciosPage() {
  const t = await getTranslations("servicesPage");

  return (
    <div className="bg-white text-brand-black">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[120px]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {t("headlineStart")}
            <span className="text-brand-blue">{t("headlineHighlight")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/70 sm:text-base">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Individual services */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          {t("individualHeading")}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {individualKeys.map((key) => (
            <div
              key={key}
              className="flex items-start justify-between gap-4 rounded-2xl border border-black/5 bg-brand-surface p-5"
            >
              <div>
                <h3 className="font-display text-base font-bold">
                  {t(`individual.${key}.title`)}
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  {t(`individual.${key}.description`)}
                </p>
              </div>
              <span className="shrink-0 whitespace-nowrap font-display text-lg font-extrabold text-brand-blue-dark">
                {t(`individual.${key}.price`)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly plans */}
      <section className="bg-brand-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            {t("plansHeading")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-brand-muted">
            {t("plansIntro")}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {planKeys.map((key, index) => {
              const isFeatured = index === 1;
              return (
                <div
                  key={key}
                  className={
                    isFeatured
                      ? "relative flex flex-col rounded-2xl bg-brand-ink p-7 text-white ring-2 ring-brand-blue"
                      : "relative flex flex-col rounded-2xl border border-black/5 bg-white p-7"
                  }
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-brand-blue px-3 py-1 text-[10px] font-bold tracking-wide text-brand-black">
                      MÁS POPULAR
                    </span>
                  )}
                  <h3
                    className={
                      isFeatured
                        ? "font-display text-xl font-extrabold text-white"
                        : "font-display text-xl font-extrabold"
                    }
                  >
                    {t(`plans.${key}.name`)}
                  </h3>
                  <p
                    className={
                      isFeatured
                        ? "mt-4 text-3xl font-extrabold text-brand-blue"
                        : "mt-4 text-3xl font-extrabold text-brand-blue-dark"
                    }
                  >
                    {t(`plans.${key}.price`)}
                    <span
                      className={
                        isFeatured
                          ? "ml-1 text-sm font-medium text-white/60"
                          : "ml-1 text-sm font-medium text-brand-muted"
                      }
                    >
                      {t(`plans.${key}.period`)}
                    </span>
                  </p>
                  <p
                    className={
                      isFeatured
                        ? "mt-3 text-sm text-white/70"
                        : "mt-3 text-sm text-brand-muted"
                    }
                  >
                    {t(`plans.${key}.subtitle`)}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {t.raw(`plans.${key}.features`).map((feature: string) => (
                      <li
                        key={feature}
                        className={
                          isFeatured
                            ? "flex items-start gap-2 text-sm text-white/90"
                            : "flex items-start gap-2 text-sm text-brand-black/80"
                        }
                      >
                        <span
                          className={
                            isFeatured
                              ? "mt-0.5 text-brand-blue"
                              : "mt-0.5 text-brand-blue-dark"
                          }
                        >
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contacto"
                    className={
                      isFeatured
                        ? "mt-7 rounded-full bg-brand-blue px-5 py-2.5 text-center text-sm font-semibold text-brand-black transition-transform hover:scale-[1.03]"
                        : "mt-7 rounded-full border border-brand-black/20 px-5 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-brand-black hover:text-white"
                    }
                  >
                    {t("ctaButton")}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-display text-xl font-bold sm:text-2xl">{t("ctaText")}</p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-brand-blue-dark px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          {t("ctaButton")} →
        </Link>
      </section>
    </div>
  );
}
