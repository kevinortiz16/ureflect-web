import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import TeamPhoto from "@/components/sections/team-photo";
import TeamPhotoGhost from "@/components/sections/team-photo-ghost";

const stepKeys = ["contact", "visit", "delivery"] as const;

// Fotos en public/team/ (ver el LEEME.md de esa carpeta) — no hace
// falta que existan todavía: si falta un archivo, la tarjeta muestra
// las iniciales de esa persona en su lugar.
const teamMembers = [
  { id: "kevin", image: "/team/kao.jpg", initials: "KO" },
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

      {/* Founder story */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
          {t("founderLabel")}
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          {t("founderName")}
        </h2>

        <div className="mt-6 space-y-5">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-brand-black/80 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
          {t("team.eyebrow")}
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          {t("team.heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
          {t("team.intro")}
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col">
              {/* Tarjeta que gira al pasar el cursor: de frente, la
                  foto; al girar, una descripción breve sobre un
                  fondo apenas más oscuro que el blanco de la página. */}
              <div className="group [perspective:1200px]">
                <div className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <TeamPhoto
                      src={member.image}
                      alt={t(`team.members.${member.id}.name`)}
                      initials={member.initials}
                    />
                    {/* Difuminado blanco (arriba, donde va el
                        rostro) a azul (abajo) sobre la foto,
                        transparente y siempre visible, para darle a
                        la foto real esa tonalidad de marca sin tapar
                        la cara. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-brand-blue/55"
                    />
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-2xl bg-brand-surface ring-1 ring-black/5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {/* Foto de fondo casi invisible, solo como
                        textura — la descripción tiene que leerse
                        bien por encima. */}
                    <TeamPhotoGhost src={member.image} alt="" />
                    <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
                      <h4 className="font-display text-lg font-bold text-brand-blue">
                        {t(`team.members.${member.id}.name`)}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-brand-black">
                        {t(`team.members.${member.id}.bio`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">
                {t(`team.members.${member.id}.name`)}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-blue-dark">
                {t(`team.members.${member.id}.role`)}
              </p>
            </div>
          ))}
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
