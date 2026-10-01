"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type CategorySlide = {
  key: string;
  href: string;
  label: string;
  description: string;
  meta: string;
  cover?: string;
};

const INTERVAL_MS = 5000;

/**
 * Slider que avanza solo entre las categorías del portafolio (una
 * "diapositiva" completa por categoría: foto + nombre + descripción),
 * con crossfade — extiende el mismo patrón que ya usa
 * PortfolioHeroCarousel en /portafolio, pero mostrando el contenido
 * de cada categoría en vez de solo fotos sueltas.
 *
 * Se pausa al pasar el cursor o al tocar la pantalla — un carrusel
 * que se mueve solo nunca debería "ganarle" al usuario mientras lee
 * o está a punto de hacer clic — y respeta la preferencia de
 * "reducir movimiento" del sistema del visitante.
 */
export default function CategorySlider({ slides }: { slides: CategorySlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    timerRef.current = setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, slides.length]);

  if (slides.length === 0) return null;

  const goTo = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <div
      className="group relative h-[26rem] overflow-hidden rounded-2xl ring-1 ring-black/10 sm:h-[28rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.key}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-blue-dark to-brand-blue"
            />
            {slide.cover && (
              <Image
                src={slide.cover}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                priority={i === 0}
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-ink/92 via-brand-ink/45 to-brand-ink/10"
            />

            <Link
              href={slide.href}
              tabIndex={active ? 0 : -1}
              className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10"
            >
              <span className="inline-block w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {slide.label}
              </span>
              <h3 className="mt-4 max-w-md font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {slide.description}
              </h3>
              <p className="mt-3 text-xs font-semibold tracking-wide text-brand-blue">
                {slide.meta} →
              </p>
            </Link>
          </div>
        );
      })}

      {/* Flechas manuales — solo visibles en hover/desktop; en
          celular los puntos de abajo bastan y no estorban. */}
      <button
        type="button"
        aria-label="Categoría anterior"
        onClick={() => goTo(index - 1)}
        className="absolute left-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-ink/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:flex"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Siguiente categoría"
        onClick={() => goTo(index + 1)}
        className="absolute right-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-ink/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:flex"
      >
        ›
      </button>

      {/* Puntos de progreso — siempre visibles (también sirven para
          saltar directo a una categoría). */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            aria-label={`Ir a ${slide.label}`}
            onClick={() => goTo(i)}
            className={`h-[3px] w-7 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
