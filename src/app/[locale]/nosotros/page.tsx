import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import TeamPhoto from "@/components/sections/team-photo";

const stepKeys = ["contact", "visit", "delivery"] as const;

// Fotos en public/team/ (ver el LEEME.md de esa carpeta) — no hace
// falta que existan todavía: si falta un archivo, la tarjeta muestra
// las iniciales de esa persona en su lugar. La de Kevin se deja
// pendiente a propósito (antes apuntaba a kevin-ortiz.jpg) hasta la
// próxima sesión de fotos del equipo (con las camisetas de marca) —
// así los 3 muestran iniciales por ahora, de forma consistente, en
// vez de que solo él tenga foto real y los otros dos no.
const teamMembers = [
  { id: "kevin", image: "/team/kevin-pending.jpg", initials: "KO" },
  { id: "catherine", image: "/team/catherine-aragon.jpg", initials: "CA" },
  { id: "sebastian", image: "/team/sebastian-ortiz.jpg", initials: "SO" },
] as const;

export default async function NosotrosPage() {
  const t = await getTranslations("aboutPage");
  const storyParagraphs = t.raw("storyParagraphs") as string[];

  return (
    <div className="bg-white text-brand-black">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[120px]"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {t("headline")}
          </h1>
        </div>
      </section>

      {/* Historia/misión de la empresa — a propósito sin nombres de
          personas: el logo grande a la derecha ya deja claro que se
          habla de Ureflect, así que el eyebrow + título hablan de la
          marca, no de quién la fundó. Mismos márgenes que Team
          (max-w-6xl + px-4/sm:px-6/lg:px-8 + py-16/sm:py-20) para que
          las dos secciones se alineen visualmente. El logo completo
          (isotipo + wordmark + tagline) va a la derecha en escritorio,
          con un ancho pensado para quedar cerca de la altura del
          bloque de texto. En celular pasa arriba del texto, centrado y
          más chico. */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col-reverse gap-10 sm:flex-row sm:items-center sm:gap-14">
          <div className="sm:flex-1">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
              {t("storyEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
              {t("storyHeading")}
            </h2>

            <div className="mt-6 space-y-5">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-brand-black/80 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-center sm:w-2/5 sm:flex-shrink-0 sm:justify-end">
            <Image
              src="/brand/logo-wordmark-tagline.png"
              alt="Ureflect — Content. Digital. Growth."
              width={5589}
              height={5318}
              className="h-auto w-40 sm:w-full sm:max-w-xs lg:max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Team — fondo brand-surface a propósito: crea una
          transición visible respecto a la sección del fundador (que
          es blanca) en vez de que las dos se vean como un solo
          bloque vacío sin separación. */}
      <section className="bg-brand-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
          {t("team.eyebrow")}
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          {t("team.heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
          {t("team.intro")}
        </p>

        {/* Lista compacta (avatar circular chico + texto), sin
            zigzag: los 3 miembros reciben el mismo peso visual sin
            importar si tienen foto real o solo iniciales — con fotos
            grandes, el hueco de las fotos que todavía faltan
            (Catherine, Sebastian) se notaba demasiado. Con un avatar
            chico esa diferencia deja de ser tan visible y se ve más
            como un directorio de equipo. */}
        <div className="mt-10 divide-y divide-black/10 border-t border-black/10">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center gap-5 py-7 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left"
            >
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full bg-brand-ink ring-1 ring-black/5 sm:h-24 sm:w-24">
                <TeamPhoto
                  src={member.image}
                  alt={t(`team.members.${member.id}.name`)}
                  initials={member.initials}
                  fit="cover"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold sm:text-xl">
                  {t(`team.members.${member.id}.name`)}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-blue-dark">
                  {t(`team.members.${member.id}.role`)}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-black/80 sm:text-base">
                  {t(`team.members.${member.id}.bio`)}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-brand-surface py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">
            {t("equipmentHeading")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
            {t("equipmentText")}
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          {t("valuesHeading")}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stepKeys.map((key, index) => (
            <div key={key} className="rounded-2xl border border-black/5 bg-white p-6">
              <span className="font-display text-3xl font-extrabold text-brand-blue/30">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-bold">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                {t(`steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-ink py-16 text-center sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xl font-bold text-white sm:text-2xl">
            {t("cta")}
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-brand-black transition-transform hover:scale-[1.03]"
          >
            {t("ctaButton")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
