import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PortfolioHeroCarousel from "@/components/portfolio-hero-carousel";
import CategoryCover from "@/components/sections/category-cover";
import {
  categorySlugs,
  getAllCovers,
  getCategoryCover,
  portfolioCatalog,
  type PortfolioCategoryKey,
  type PortfolioCompany,
} from "@/data/portfolio";

// Orden del grid "bento": Construcción primero porque es la
// categoría con más peso estratégico (ver 03_Marketing/Estrategia
// lanzamiento Raleigh) y se lleva la tarjeta grande; Belleza al
// final porque todavía no tiene proyectos cargados y se lleva la
// tarjeta chica. En celular se apilan en este mismo orden (ver
// CategoryCard más abajo: el HTML ya sale en el orden correcto, así
// que no hace falta reordenar nada con CSS para mobile).
const bigCategoryKeys: PortfolioCategoryKey[] = ["construccion"];
const mediumCategoryKeys: PortfolioCategoryKey[] = ["producto", "realEstate"];
const smallCategoryKeys: PortfolioCategoryKey[] = ["belleza"];

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

      {/* Categorías — grid "bento": una tarjeta grande (Construcción)
          + dos medianas (Producto, Real Estate) + una chica y ancha
          (Belleza, sin proyectos todavía). El tamaño de cada tarjeta
          comunica cuánto portafolio real hay detrás, en vez de que
          las 4 se vean igual de "llenas" aunque no lo estén. */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr] sm:grid-rows-2">
          {bigCategoryKeys.map((key) => (
            <CategoryCard
              key={key}
              categoryKey={key}
              copy={categories[key]}
              companies={portfolioCatalog[key]}
              nav={nav}
              size="big"
              className="sm:row-span-2"
            />
          ))}
          {mediumCategoryKeys.map((key) => (
            <CategoryCard
              key={key}
              categoryKey={key}
              copy={categories[key]}
              companies={portfolioCatalog[key]}
              nav={nav}
              size="medium"
            />
          ))}
        </div>
        <div className="mt-4 grid gap-4">
          {smallCategoryKeys.map((key) => (
            <CategoryCard
              key={key}
              categoryKey={key}
              copy={categories[key]}
              companies={portfolioCatalog[key]}
              nav={nav}
              size="small"
            />
          ))}
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

/**
 * Una tarjeta del grid "bento" de categorías. `size` controla altura
 * mínima y el tamaño del título/descripción — "big" y "medium"
 * muestran descripción, "small" (Belleza, sin proyectos aún) se
 * queda solo con el título y el estado, para que se sienta liviana
 * en vez de forzar contenido que no existe todavía.
 */
function CategoryCard({
  categoryKey,
  copy,
  companies,
  nav,
  size,
  className = "",
}: {
  categoryKey: PortfolioCategoryKey;
  copy: CategoryCopy;
  companies: PortfolioCompany[];
  nav: Awaited<ReturnType<typeof getTranslations>>;
  size: "big" | "medium" | "small";
  className?: string;
}) {
  const jobCount = companies.reduce((total, company) => total + company.jobs.length, 0);
  const isEmpty = companies.length === 0;
  const cover = getCategoryCover(categoryKey);

  const minHeight =
    size === "big"
      ? "min-h-[20rem] sm:min-h-0"
      : size === "medium"
        ? "min-h-[11rem] sm:min-h-0"
        : "min-h-[8rem]";

  return (
    <Link
      href={`/portafolio/${categorySlugs[categoryKey]}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-black/10 transition-transform duration-300 hover:scale-[1.015] ${minHeight} ${className}`}
    >
      <CategoryCover src={cover} />

      <div className={`relative ${size === "big" ? "p-7" : size === "medium" ? "p-5" : "p-5"}`}>
        <h2
          className={`font-display font-bold text-white ${
            size === "big" ? "text-2xl" : size === "medium" ? "text-lg" : "text-base"
          }`}
        >
          {copy.label}
        </h2>
        {size !== "small" && (
          <p
            className={`mt-2 text-white/75 ${size === "big" ? "max-w-md text-sm sm:text-base" : "text-sm"}`}
          >
            {copy.description}
          </p>
        )}
        <p className="relative mt-3 text-xs font-semibold tracking-wide text-brand-blue">
          {isEmpty
            ? `${nav("comingSoon")} →`
            : `${nav("companyCount", { count: companies.length })} · ${nav("jobCount", { count: jobCount })} →`}
        </p>
      </div>
    </Link>
  );
}
