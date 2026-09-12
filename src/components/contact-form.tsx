"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contactPage.form");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      // Campo honeypot: invisible para personas, los bots suelen
      // rellenarlo igual. Ver src/app/api/contact/route.ts.
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand-blue/30 bg-brand-surface p-7 text-center">
        <p className="font-display text-lg font-bold text-brand-black">
          {t("successTitle")}
        </p>
        <p className="mt-2 text-sm text-brand-muted">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-brand-surface p-7">
      {/* Honeypot: oculto visualmente, no con display:none (algunos bots
          ignoran los campos con display:none pero igual rellenan los que
          solo están posicionados fuera de pantalla). */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-xs font-semibold text-brand-black">
            {t("nameLabel")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder={t("namePlaceholder")}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-blue-dark"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="text-xs font-semibold text-brand-black">
            {t("emailFieldLabel")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-blue-dark"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="phone" className="text-xs font-semibold text-brand-black">
            {t("phoneFieldLabel")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-blue-dark"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="service" className="text-xs font-semibold text-brand-black">
            {t("serviceLabel")}
          </label>
          <input
            id="service"
            name="service"
            type="text"
            placeholder={t("servicePlaceholder")}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-blue-dark"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-xs font-semibold text-brand-black">
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-blue-dark"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-brand-muted">{t("requiredNote")}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-brand-blue-dark px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? t("submittingButton") : t("submitButton")}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-semibold text-red-600">
          {t("errorTitle")} — {t("errorBody")}
        </p>
      )}
    </form>
  );
}
