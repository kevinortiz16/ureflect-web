import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PortfolioHeroCarousel from "@/components/portfolio-hero-carousel";
import {
  categorySlugs,
  getAllCovers,
  portfolioCatalog,
  type PortfolioCategoryKey,
} from "@/data/portfolio";

const categoryKeys: PortfolioCategoryKey[] = ["construccion", "belleza", "realEstate", "producto"];

type CategoryCopy = { label: string; description: string };

export default async function PortafolioPage() {
  const t = await getTranslations("portfolioPage");
  const nav = await getTranslations("portfolioNav");
  const categories = t.raw("categories") as Record<PortfolioCategoryKey, CategoryCopy>;
  const coverImages = getAllCovers();

  return (
    <div className="bg-white text-brand-black">
      {/* Header con carrusel de fotos "portada" de fondo */}
      <section className="relative overflow-hidden bg-brand-ink">
        <PortfolioHeroCarousel images={coverImages} />
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

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryKeys.map((key) => {
            const copy = categories[key];
            const companies = portfolioCatalog[key];
            const jobCount = companies.reduce((total, company) => total + company.jobs.length, 0);
            const isEmpty = companies.length === 0;

            return (
              <Link
                key={key}
                href={`/portafolio/${categorySlugs[key]}`}
                className="group relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-2xl bg-brand-ink p-6 ring-1 ring-black/10 transition-transform hover:scale-[1.02]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-blue/20 blur-2xl"
                />

                <div className="relative">
                  <h2 className="font-display text-lg font-bold text-white">{copy.label}</h2>
                  <p className="mt-2 text-sm text-white/70">{copy.description}</p>
                </div>

                <p className="relative mt-4 text-xs font-semibold tracking-wide text-brand-blue">
                  {isEmpty
                    ? `${nav("comingSoon")} →`
                    : `${nav("companyCount", { count: companies.length })} · ${nav("jobCount", { count: jobCount })} →`}
                </p>
              </Link>
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
