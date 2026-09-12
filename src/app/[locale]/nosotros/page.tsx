import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const stepKeys = ["contact", "visit", "delivery"] as const;

export default async function NosotrosPage() {
  const t = await getTranslations("aboutPage");
  const storyParagraphs = t.raw("storyParagraphs") as string[];

  return (
    <div className="bg-white text-brand-black">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[120px]"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {t("headline")}
          </h1>
        </div>
      </section>

      {/* Founder story */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
          {t("founderLabel")}
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          {t("founderName")}
        </h2>

        <div className="mt-6 space-y-5">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-brand-black/80 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-brand-surface py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">
            {t("equipmentHeading")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
            {t("equipmentText")}
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          {t("valuesHeading")}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stepKeys.map((key, index) => (
            <div key={key} className="rounded-2xl border border-black/5 bg-white p-6">
              <span className="font-display text-3xl font-extrabold text-brand-blue/30">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-bold">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                {t(`steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-ink py-16 text-center sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xl font-bold text-white sm:text-2xl">
            {t("cta")}
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-brand-black transition-transform hover:scale-[1.03]"
          >
            {t("ctaButton")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
