import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact-form";
import { LocationIcon, MailIcon, WhatsAppIcon } from "@/components/contact-icons";

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
            <span className="flex items-center gap-2 font-display text-lg font-bold text-brand-blue-dark">
              <WhatsAppIcon className="h-6 w-6 shrink-0 text-whatsapp" />
              {t("whatsappLabel")}
            </span>
            <span className="mt-2 font-display text-xl font-bold">
              {t("whatsappValue")}
            </span>
            <a
              href="https://wa.me/12024316197"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-whatsapp px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              {t("whatsappCta")} →
            </a>
          </div>

          <div className="flex flex-col rounded-2xl border border-black/5 bg-brand-surface p-7">
            <span className="flex items-center gap-2 font-display text-lg font-bold text-brand-blue-dark">
              <MailIcon className="h-6 w-6 shrink-0" />
              {t("emailLabel")}
            </span>
            <span className="mt-2 font-display text-xl font-bold break-all">
              {t("emailValue")}
            </span>
            <a
              href="mailto:contact@ureflect.net"
              className="mt-6 inline-block rounded-full bg-brand-black px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-black/85"
            >
              {t("emailCta")} →
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-brand-ink p-6">
          {/* Azul de marca por decisión de diseño. Ojo: sobre brand-ink
              da 2.67:1, por debajo del mínimo WCAG para títulos (3:1) —
              ver la nota de contraste pendiente en CLAUDE.md. */}
          <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-brand-blue sm:text-2xl">
            <LocationIcon className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
            {t("areaLabel")}
          </h2>
          <p className="mt-3 text-sm text-white/80 sm:text-base">{t("areaValue")}</p>
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
