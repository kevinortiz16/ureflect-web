import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getCategoryCover } from "@/data/portfolio";

export default function HeroSection() {
  const t = useTranslations("hero");

  const construccionCover = getCategoryCover("construccion");
  const realEstateCover = getCategoryCover("realEstate");
  const productoCover = getCategoryCover("producto");

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

        {/* Visual side: category cards. Categorías con trabajos ya
            cargados muestran su foto "portada" real; las que todavía
            no tienen material (por ejemplo Real Estate) muestran el
            degradado de respaldo. */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 h-40 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-48">
            {construccionCover ? (
              <Image
                src={construccionCover}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            ) : null}
            <div
              aria-hidden="true"
              className={
                construccionCover
                  ? "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  : "absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-blue/5"
              }
            />
            <div className="absolute inset-0 flex items-end p-4">
              <span className="text-xs font-semibold tracking-wide text-white/90">
                {t("tagConstruccion")}
              </span>
            </div>
          </div>

          <div className="relative h-32 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-40">
            {realEstateCover ? (
              <Image
                src={realEstateCover}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            ) : null}
            <div
              aria-hidden="true"
              className={
                realEstateCover
                  ? "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  : "absolute inset-0 bg-white/5"
              }
            />
            <div className="absolute inset-0 flex items-end p-4">
              <span className="text-xs font-semibold tracking-wide text-white/80">
                {t("tagRealEstate")}
              </span>
            </div>
          </div>

          <div className="relative h-32 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-40">
            {productoCover ? (
              <Image
                src={productoCover}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            ) : null}
            <div
              aria-hidden="true"
              className={
                productoCover
                  ? "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  : "absolute inset-0 bg-white/5"
              }
            />
            <div className="absolute inset-0 flex items-end p-4">
              <span className="text-xs font-semibold tracking-wide text-white/80">
                {t("tagProducto")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
