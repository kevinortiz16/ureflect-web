"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  serviceCategoryOrder,
  nichoOrder,
  empresaServicios,
  websiteTypes,
  disenoGrupoOrder,
  disenoServicios,
  marketingServicios,
  nichoImages,
  categoryImages,
  type ServiceCategoryKey,
  type NichoKey,
} from "@/data/services";

/**
 * Todo /servicios en un solo componente de cliente: el banner de
 * arriba (título, reseña breve e imagen de fondo) y el catálogo de
 * abajo (selectores + tarjetas) comparten el mismo estado de
 * categoría/nicho, así que el banner cambia en cuanto se elige algo
 * en los desplegables de más abajo — por eso viven juntos aquí en vez
 * de partir el banner como una sección server-side aparte.
 *
 * Los textos vienen de messages/{es,en}.json → servicesPage /
 * servicesCatalog. Las imágenes de fondo por categoría/nicho viven en
 * public/services/ (ver src/data/services.ts y ese LEEME.md) y son
 * opcionales: si un archivo todavía no existe, el banner cae de vuelta
 * al degradado de marca sin romperse.
 */
export default function ServicesExplorer() {
  const t = useTranslations("servicesPage");
  const c = useTranslations("servicesCatalog");

  const [category, setCategory] = useState<ServiceCategoryKey>("empresas");
  const [nicho, setNicho] = useState<NichoKey>("construccion");

  const heroTitle =
    category === "empresas" ? t(`nichos.${nicho}.label`) : t(`categories.${category}.label`);
  const heroDescription =
    category === "empresas"
      ? t(`nichos.${nicho}.description`)
      : t(`categories.${category}.description`);
  const heroImage = category === "empresas" ? nichoImages[nicho] : categoryImages[category];

  const serviceIds = useMemo(() => {
    if (category === "empresas") return empresaServicios[nicho];
    if (category === "websites") return [...websiteTypes];
    if (category === "marketing") return [...marketingServicios];
    return [];
  }, [category, nicho]);

  return (
    <div>
      {/* Banner dinámico: título, reseña e imagen según la categoría/
          nicho elegido en los desplegables de abajo. */}
      <section className="relative overflow-hidden bg-brand-ink">
        <HeroBackground src={heroImage} />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/70 sm:text-base">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Catálogo: selectores de categoría/nicho + tarjetas de servicio */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Marca de agua del isotipo sobre el fondo blanco — puramente
            decorativa. */}
        <Image
          src="/brand/logo-mark-black.png"
          alt=""
          aria-hidden="true"
          width={427}
          height={500}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-auto -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.04] sm:h-[34rem]"
        />

        <div className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <label className="flex-1">
              <span className="block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                {t("categoryLabel")}
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategoryKey)}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-black focus:border-brand-blue-dark focus:outline-none sm:max-w-sm"
              >
                {serviceCategoryOrder.map((key) => (
                  <option key={key} value={key}>
                    {t(`categories.${key}.label`)}
                  </option>
                ))}
              </select>
            </label>

            {category === "empresas" && (
              <label className="flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  {t("nichoLabel")}
                </span>
                <select
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value as NichoKey)}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-black focus:border-brand-blue-dark focus:outline-none sm:max-w-sm"
                >
                  {nichoOrder.map((key) => (
                    <option key={key} value={key}>
                      {t(`nichos.${key}.label`)}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {/* "Diseño Gráfico" se agrupa por tipo de pieza en vez de una
              sola grilla plana, porque hay demasiadas piezas distintas
              (identidad, animación 2D, 3D, motion) para mezclarlas. */}
          {category === "diseno" ? (
            <div className="mt-10 space-y-10">
              {disenoGrupoOrder.map((grupoKey) => (
                <div key={grupoKey}>
                  <h3 className="font-display text-lg font-bold">
                    {c(`diseno.${grupoKey}.groupLabel`)}
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {disenoServicios[grupoKey].map((serviceId) => (
                      <ServiceCard
                        key={serviceId}
                        title={c(`diseno.${grupoKey}.${serviceId}.title`)}
                        description={c(`diseno.${grupoKey}.${serviceId}.description`)}
                        price={c(`diseno.${grupoKey}.${serviceId}.price`)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceIds.map((serviceId) => {
                const key =
                  category === "empresas"
                    ? `empresas.${nicho}.${serviceId}`
                    : `${category}.${serviceId}`;
                return (
                  <ServiceCard
                    key={serviceId}
                    title={c(`${key}.title`)}
                    description={c(`${key}.description`)}
                    price={c(`${key}.price`)}
                  />
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-brand-surface p-8 text-center sm:p-10">
            <p className="font-display text-lg font-bold sm:text-xl">{t("ctaText")}</p>
            <Link
              href="/contacto"
              className="mt-5 inline-block rounded-full bg-brand-blue-dark px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {t("ctaButton")} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Fondo del banner: intenta cargar la foto de public/services/ que le
 * corresponde a la categoría/nicho actual. Si el archivo todavía no
 * existe (Kevin no la ha subido) o falla al cargar, se queda solo con
 * el degradado azul de respaldo — nunca rompe el banner.
 *
 * La `key={src}` fuerza que React monte una instancia nueva de este
 * componente cada vez que cambia la imagen, así el estado de error se
 * reinicia solo en vez de quedar "pegado" de una selección anterior.
 */
function HeroBackground({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/25 blur-[120px]"
      />
      {src && !failed && (
        <>
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-brand-ink/90 via-brand-ink/70 to-brand-ink"
          />
        </>
      )}
    </>
  );
}

function ServiceCard({
  title,
  description,
  price,
}: {
  title: string;
  description: string;
  price: string;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-brand-black via-brand-ink to-brand-black p-5">
      {/* brillo azul sutil en la esquina, puramente decorativo — el
          mismo tratamiento oscuro que ya usan las tarjetas de
          categoría en el inicio, para que el catálogo se sienta
          consistente con el resto del sitio. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-blue/20 blur-2xl"
      />
      <h3 className="relative font-display text-base font-bold text-brand-blue">{title}</h3>
      <p className="relative mt-2 flex-1 text-sm text-white/70">{description}</p>
      {/* Precio: oculto por defecto, aparece al pasar el cursor, en
          la esquina inferior derecha de la tarjeta, a 2x el tamaño
          del párrafo (text-sm = 0.875rem → 1.75rem). */}
      <span
        aria-hidden="true"
        className="relative mt-3 self-end text-[1.75rem] font-extrabold leading-none text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        {price}
      </span>
    </div>
  );
}
