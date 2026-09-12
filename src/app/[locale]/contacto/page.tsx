import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact-form";

export default async function ContactoPage() {
  const t = await getTranslations("contactPage");

  return (
    <div className="bg-white text-brand-black">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[120px]"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {t("headline")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/70 sm:text-base">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-black/5 bg-brand-surface p-7">
            <span className="text-xs font-semibold tracking-[0.15em] text-brand-blue-dark">
              {t("whatsappLabel")}
            </span>
            <span className="mt-2 font-display text-xl font-bold">
              {t("whatsappValue")}
            </span>
            <a
              href="https://wa.me/12024316197"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-brand-blue px-5 py-2.5 text-center text-sm font-semibold text-brand-black transition-transform hover:scale-[1.03]"
            >
              {t("whatsappCta")} →
            </a>
          </div>

          <div className="flex flex-col rounded-2xl border border-black/5 bg-brand-surface p-7">
            <span className="text-xs font-semibold tracking-[0.15em] text-brand-blue-dark">
              {t("emailLabel")}
            </span>
            <span className="mt-2 font-display text-xl font-bold break-all">
              {t("emailValue")}
            </span>
            <a
              href="mailto:kvv7794@gmail.com"
              className="mt-6 inline-block rounded-full border border-brand-black/20 px-5 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-brand-black hover:text-white"
            >
              {t("emailCta")} →
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-brand-ink p-6">
          <p className="text-xs font-semibold tracking-[0.15em] text-brand-blue">
            {t("areaLabel")}
          </p>
          <p className="mt-2 text-sm text-white/80">{t("areaValue")}</p>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-brand-muted">
          {t("formNote")}
        </p>

        {/* Formulario real: valida y guarda en base de datos, y envía
            notificación por correo (ver src/app/api/contact/route.ts). */}
        <div className="mt-10">
          <h2 className="mb-5 text-center font-display text-xl font-extrabold sm:text-2xl">
            {t("form.formHeading")}
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
