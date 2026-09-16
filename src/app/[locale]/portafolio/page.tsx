import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import YouTubeEmbed from "@/components/youtube-embed";
import { portfolioMedia, type PortfolioCaseKey } from "@/data/portfolio";

const caseKeys: PortfolioCaseKey[] = ["construccion", "belleza", "realEstate"];

type CaseCopy = {
  category: string;
  client?: string;
  description: string;
  tags?: string;
  comingSoon?: boolean;
};

export default async function PortafolioPage() {
  const t = await getTranslations("portfolioPage");
  const cases = t.raw("cases") as Record<PortfolioCaseKey, CaseCopy>;

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
            const copy = cases[key];
            const media = portfolioMedia[key];
            const heroVideoId = media.youtubeIds?.[0];
            const photos = media.photos ?? [];
            const extraPhotos = heroVideoId ? photos : photos.slice(1);
            const heroPhoto = heroVideoId ? undefined : photos[0];
            const hasMedia = Boolean(heroVideoId) || photos.length > 0;

            // Sin fotos ni video todavía: la tarjeta de siempre, con el
            // aviso de "Galería en camino". En cuanto un caso tenga
            // contenido real en src/data/portfolio.ts, cae directo en la
            // rama de abajo (con video/foto de portada real).
            if (!hasMedia) {
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
                      {copy.category}
                    </p>
                    {copy.client && (
                      <p className="mt-2 font-display text-lg font-bold text-white">
                        {copy.client}
                      </p>
                    )}
                  </div>

                  <div className="relative mt-6 flex flex-1 flex-col justify-end">
                    <p className="text-sm text-white/70">{copy.description}</p>

                    {copy.tags && (
                      <p className="mt-4 text-xs font-semibold tracking-wide text-white/50">
                        {copy.tags}
                      </p>
                    )}

                    {copy.comingSoon && (
                      <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/40 px-3 py-1 text-xs font-semibold text-brand-blue">
                        {t("mediaComingSoon")}
                      </span>
                    )}
                  </div>
                </div>
              );
            }

            // Caso con contenido real: video (prioridad) o foto de
            // portada arriba, info abajo, y una franja de fotos extra si
            // hay más de una.
            return (
              <div
                key={key}
                className="flex flex-col overflow-hidden rounded-2xl bg-brand-ink ring-1 ring-black/10"
              >
                {heroVideoId ? (
                  <YouTubeEmbed youtubeId={heroVideoId} title={copy.category} />
                ) : (
                  <div className="relative aspect-video w-full">
                    <Image src={heroPhoto!} alt="" fill className="object-cover" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-[0.15em] text-brand-blue">
                    {copy.category}
                  </p>
                  {copy.client && (
                    <p className="mt-2 font-display text-lg font-bold text-white">
                      {copy.client}
                    </p>
                  )}

                  <p className="mt-3 text-sm text-white/70">{copy.description}</p>

                  {extraPhotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {extraPhotos.slice(0, 4).map((src) => (
                        <div
                          key={src}
                          className="relative aspect-square overflow-hidden rounded-lg"
                        >
                          <Image src={src} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {copy.tags && (
                    <p className="mt-4 text-xs font-semibold tracking-wide text-white/50">
                      {copy.tags}
                    </p>
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
