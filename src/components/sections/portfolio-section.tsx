import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { categorySlugs } from "@/data/portfolio";

const portfolioKeys = ["construction", "beauty", "realEstate", "product"] as const;

// El teaser del home usa sus propias keys en inglés (legado); el catálogo
// real usa otras keys internas. Este mapa conecta cada tarjeta con la
// categoría/slug de página correcta en /portafolio/[categoria].
const teaserKeyToCategorySlug = {
  construction: categorySlugs.construccion,
  beauty: categorySlugs.belleza,
  realEstate: categorySlugs.realEstate,
  product: categorySlugs.producto,
} as const;

export default function PortfolioSection() {
  const t = useTranslations("portfolio");

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioKeys.map((key) => (
            <Link
              key={key}
              href={`/portafolio/${teaserKeyToCategorySlug[key]}`}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl bg-brand-ink p-6 ring-1 ring-black/10 transition-transform hover:scale-[1.02]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90"
              />
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand-blue/20 blur-2xl"
              />
              <div className="relative">
                <h3 className="font-display text-lg font-bold text-white">
                  {t(`items.${key}`)}
                </h3>
                <p className="mt-1 text-xs text-white/60">{t("servicesTag")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
