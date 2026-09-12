import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-brand-ink">
      {/* soft blue glow, purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/25 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
            {t("headlineStart")}
            <span className="text-brand-blue">{t("headlineHighlight")}</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
            {t("subcopy")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-brand-black transition-transform hover:scale-[1.03]"
            >
              {t("primaryCta")} →
            </Link>
            <Link
              href="/portafolio"
              className="text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              {t("secondaryCta")} →
            </Link>
          </div>
        </div>

        {/* Visual side: stacked category cards, standing in for the
            photo collage in the reference mockup until we have final
            client photography approved for the public site. */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex h-40 items-end rounded-2xl bg-gradient-to-br from-brand-blue/30 to-brand-blue/5 p-4 ring-1 ring-white/10 sm:h-48">
            <span className="text-xs font-semibold tracking-wide text-white/80">
              {t("tagConstruccion")}
            </span>
          </div>
          <div className="flex h-32 items-end rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:h-40">
            <span className="text-xs font-semibold tracking-wide text-white/70">
              {t("tagBelleza")}
            </span>
          </div>
          <div className="flex h-32 items-end rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:h-40">
            <span className="text-xs font-semibold tracking-wide text-white/70">
              {t("tagRealEstate")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
