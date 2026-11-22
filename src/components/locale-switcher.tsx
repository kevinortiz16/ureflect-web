"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

// Nombre de cada idioma escrito en ese mismo idioma — es lo que lee un
// lector de pantalla y lo que sale en el tooltip.
const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/**
 * Selector ES | EN con bandera. Reutiliza la ruta actual y solo cambia
 * el segmento de idioma, así cambiar de idioma nunca manda al visitante
 * de vuelta al inicio.
 *
 * Banderas en SVG (no emoji): Windows no dibuja los emojis de bandera
 * — muestra las letras "ES"/"US" — así que el SVG se ve igual en
 * cualquier sistema. Se usan las más comunes en internet para cada
 * idioma: España para español y Estados Unidos para inglés.
 */
export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((locale, index) => {
        const active = locale === activeLocale;
        return (
          <span key={locale} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
            )}
            <Link
              href={pathname}
              locale={locale}
              hrefLang={locale}
              lang={locale}
              aria-label={localeNames[locale]}
              aria-current={active ? "true" : undefined}
              title={localeNames[locale]}
              className={`flex min-h-9 items-center gap-1.5 rounded-md px-1.5 transition-colors ${
                active ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              <Flag locale={locale} dimmed={!active} />
              {/* En pantallas muy angostas (<360px) solo la bandera, para
                  que logo + idioma + menú quepan en la barra del celular. */}
              <span aria-hidden="true" className="max-[359px]:hidden">
                {locale.toUpperCase()}
              </span>
            </Link>
          </span>
        );
      })}
    </div>
  );
}

function Flag({ locale, dimmed }: { locale: Locale; dimmed: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/20 transition-opacity ${
        dimmed ? "opacity-60" : "opacity-100"
      }`}
    >
      {locale === "es" ? <FlagSpain /> : <FlagUSA />}
    </span>
  );
}

// España (versión simplificada sin escudo, la habitual en tamaños de ícono).
function FlagSpain() {
  return (
    <svg viewBox="0 0 750 500" className="block h-full w-full" preserveAspectRatio="none">
      <rect width="750" height="500" fill="#c60b1e" />
      <rect y="125" width="750" height="250" fill="#ffc400" />
    </svg>
  );
}

// Estados Unidos: 13 franjas y cantón azul. A este tamaño (20px) las 50
// estrellas no se distinguen, así que se sugieren con una trama de puntos.
function FlagUSA() {
  const stripe = 10 / 13;
  return (
    <svg viewBox="0 0 19 10" className="block h-full w-full" preserveAspectRatio="none">
      <rect width="19" height="10" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <rect key={i} y={i * stripe} width="19" height={stripe} fill="#ffffff" />
      ))}
      <rect width="7.6" height={7 * stripe} fill="#3c3b6e" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={1 + col * 1.85}
            cy={1 + row * 1.7}
            r="0.35"
            fill="#ffffff"
          />
        ))
      )}
    </svg>
  );
}
