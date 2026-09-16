import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import YouTubeEmbed from "@/components/youtube-embed";
import { getCategoryKeyFromSlug, getCompany } from "@/data/portfolio";

type Props = {
  params: Promise<{ categoria: string; empresa: string }>;
};

type CategoryCopy = { label: string; description: string };
type JobCopy = { title: string; description: string };

export default async function EmpresaPage({ params }: Props) {
  const { categoria, empresa } = await params;
  const categoryKey = getCategoryKeyFromSlug(categoria);
  const company = categoryKey ? getCompany(categoryKey, empresa) : undefined;

  if (!categoryKey || !company) {
    notFound();
  }

  const t = await getTranslations("portfolioPage");
  const nav = await getTranslations("portfolioNav");
  const category = t.raw(`categories.${categoryKey}`) as CategoryCopy;

  const jobsT = await getTranslations("portfolioJobs");
  const jobsCopy = (jobsT.raw(`${categoryKey}.${company.id}`) as Record<string, JobCopy>) ?? {};

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
            href={`/portafolio/${categoria}`}
            className="text-xs font-semibold tracking-[0.15em] text-white/60 hover:text-white"
          >
            {nav("backToCategory", { category: category.label })}
          </Link>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {company.name}
          </h1>
        </div>
      </section>

      {/* Trabajos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-xl font-extrabold sm:text-2xl">
          {nav("jobsHeading")}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {company.jobs.map((job) => {
            const copy = jobsCopy[job.id];
            const heroVideoId = job.youtubeIds?.[0];
            const strip = [job.cover, ...(job.photos ?? [])];
            const extraPhotos = heroVideoId ? strip : strip.slice(1);

            return (
              <div
                key={job.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-brand-ink ring-1 ring-black/10"
              >
                {heroVideoId ? (
                  <YouTubeEmbed youtubeId={heroVideoId} title={copy?.title ?? company.name} />
                ) : (
                  <div className="relative aspect-video w-full">
                    <Image src={job.cover} alt="" fill className="object-cover" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  {copy?.title && (
                    <h3 className="font-display text-lg font-bold text-white">{copy.title}</h3>
                  )}
                  {copy?.description && (
                    <p className="mt-2 text-sm text-white/70">{copy.description}</p>
                  )}

                  {extraPhotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {extraPhotos.slice(0, 4).map((src) => (
                        <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
                          <Image src={src} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
