import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const caseKeys = ["construccion", "belleza", "realEstate"] as const;

export default async function PortafolioPage() {
  const t = await getTranslations("portfolioPage");

  return (
    <div className="bg-white text-brand-black">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[120px]"
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

      {/* Cases */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {caseKeys.map((key) => {
            const comingSoon = t.raw(`cases.${key}.comingSoon`) as boolean;
            const hasClient = key === "construccion";

            return (
              <div
                key={key}
                className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl bg-brand-ink p-6 ring-1 ring-black/10"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-blue/20 blur-2xl"
                />

                <div className="relative">
                  <p className="text-xs font-semibold tracking-[0.15em] text-brand-blue">
                    {t(`cases.${key}.category`)}
                  </p>
                  {hasClient && (
                    <p className="mt-2 font-display text-lg font-bold text-white">
                      {t(`cases.${key}.client`)}
                    </p>
                  )}
                </div>

                <div className="relative mt-6 flex flex-1 flex-col justify-end">
                  <p className="text-sm text-white/70">
                    {t(`cases.${key}.description`)}
                  </p>

                  {hasClient ? (
                    <p className="mt-4 text-xs font-semibold tracking-wide text-white/50">
                      {t(`cases.${key}.tags`)}
                    </p>
                  ) : null}

                  {comingSoon && (
                    <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/40 px-3 py-1 text-xs font-semibold text-brand-blue">
                      {t("mediaComingSoon")}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-surface py-16 text-center sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xl font-bold sm:text-2xl">{t("cta")}</p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-full bg-brand-blue-dark px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            {t("ctaButton")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
