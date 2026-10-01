"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Foto de fondo de una tarjeta de categoría del portafolio (grid
 * "bento" de /portafolio). Si la categoría todavía no tiene ningún
 * proyecto cargado (ej. Belleza por ahora, ver getCategoryCover en
 * src/data/portfolio.ts) o la foto falla al cargar, se queda con el
 * degradado de marca de respaldo — mismo patrón que HeroBackground
 * en /servicios y TeamPhoto en /nosotros.
 *
 * El degradado oscuro de arriba a abajo va siempre encima (con o sin
 * foto), para que el título/descripción se lean bien sin depender de
 * hover — así funciona igual en celular que en escritorio.
 */
export default function CategoryCover({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-blue-dark to-brand-blue"
      />
      {src && !failed && (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-ink/92 via-brand-ink/45 to-brand-ink/10"
      />
    </>
  );
}
