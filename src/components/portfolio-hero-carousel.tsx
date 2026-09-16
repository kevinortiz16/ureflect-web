"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type PortfolioHeroCarouselProps = {
  images: string[];
  intervalMs?: number;
};

/**
 * Fondo del hero de /portafolio: rota entre las fotos "portada" de cada
 * trabajo (una por una, con crossfade). Si todavía no hay ninguna
 * portada cargada, no renderiza nada y el hero se queda con el fondo
 * oscuro liso de siempre — nada se rompe mientras el catálogo está vacío.
 */
export default function PortfolioHeroCarousel({
  images,
  intervalMs = 6000,
}: PortfolioHeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Oscurece la foto para que el texto del hero siga siendo legible */}
      <div className="absolute inset-0 bg-brand-ink/80" />
    </div>
  );
}
