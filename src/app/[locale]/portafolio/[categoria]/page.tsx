import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { categorySlugs, getCategoryKeyFromSlug, portfolioCatalog } from "@/data/portfolio";

type Props = {
  params: Promise<{ categoria: string }>;
};

type CategoryCopy = { label: string; description: string };

export function generateStaticParams() {
  return Object.values(categorySlugs).map((categoria) => ({ categoria }));
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const categoryKey = getCategoryKeyFromSlug(categoria);

  if (!categoryKey) {
    notFound();
  }

  const t = await getTranslations("portfolioPage");
  const nav = await getTranslations("portfolioNav");
  const category = t.raw(`categories.${categoryKey}`) as CategoryCopy;
  const companies = portfolioCatalog[categoryKey];

  return (
    <div className="bg-white text-brand-black">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[120px]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <Link
            href="/portafolio"
            className="text-xs font-semibold tracking-[0.15em] text-white/60 hover:text-white"
          >
            {nav("backToPortfolio")}
          </Link>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {category.label}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/70 sm:text-base">
            {category.description}
          </p>
        </div>
      </section>

      {/* Empresas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-xl font-extrabold sm:text-2xl">
          {nav("companiesHeading")}
        </h2>

        {companies.length === 0 ? (
          <p className="mt-6 text-sm text-brand-muted">{nav("emptyCategory")}</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => {
              const coverPhoto = company.jobs[0]?.cover;

              return (
                <Link
                  key={company.id}
                  href={`/portafolio/${categoria}/${company.id}`}
                  className="group overflow-hidden rounded-2xl bg-brand-ink ring-1 ring-black/10 transition-transform hover:scale-[1.02]"
                >
                  {coverPhoto && (
                    <div className="relative aspect-video w-full">
                      <Image src={coverPhoto} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-white">{company.name}</h3>
                    <p className="mt-2 text-xs font-semibold tracking-wide text-brand-blue">
                      {nav("jobCount", { count: company.jobs.length })} →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
