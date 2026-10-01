import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import CategorySlider, { type CategorySlide } from "@/components/sections/category-slider";
import {
  categorySlugs,
  getCategoryCover,
  portfolioCatalog,
  type PortfolioCategoryKey,
} from "@/data/portfolio";

// Mismo orden que el grid "bento" de /portafolio: Construcción
// primero (más peso estratégico y más portafolio real), Belleza al
// final (todavía sin proyectos cargados).
const categoryOrder: PortfolioCategoryKey[] = ["construccion", "producto", "realEstate", "belleza"];

export default function PortfolioSection() {
  const t = useTranslations("portfolio");
  const pages = useTranslations("portfolioPage");
  const nav = useTranslations("portfolioNav");

  const slides: CategorySlide[] = categoryOrder.map((key) => {
    const companies = portfolioCatalog[key];
    const jobCount = companies.reduce((total, company) => total + company.jobs.length, 0);
    const isEmpty = companies.length === 0;

    return {
      key,
      href: `/portafolio/${categorySlugs[key]}`,
      label: pages(`categories.${key}.label`),
      description: pages(`categories.${key}.description`),
      meta: isEmpty
        ? nav("comingSoon")
        : `${nav("companyCount", { count: companies.length })} · ${nav("jobCount", { count: jobCount })}`,
      cover: getCategoryCover(key),
    };
  });

  return (
    <section className="bg-brand-surface py-20 text-brand-black sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
              <span className="h-px w-6 bg-brand-blue-dark" />
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              {t("headlineStart")}
              <span className="text-brand-blue-dark">{t("headlineHighlight")}</span>
            </h2>
          </div>
          <Link
            href="/portafolio"
            className="text-sm font-semibold text-brand-blue-dark underline underline-offset-4 hover:text-brand-black"
          >
            {t("viewAll")} →
          </Link>
        </div>

        {/* Slider automático: pasa solo entre categorías cada pocos
            segundos, pero se pausa si el usuario pasa el cursor o
            toca la pantalla, y siempre se puede mover a mano con las
            flechas o los puntos de abajo. */}
        <div className="mt-12">
          <CategorySlider slides={slides} />
        </div>
      </div>
    </section>
  );
}
