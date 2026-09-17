"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Versión "fantasma" de la foto de un miembro del equipo: se usa como
 * fondo casi invisible detrás de la descripción, en el reverso de la
 * tarjeta que gira en /nosotros. Si la foto no existe todavía o falla
 * al cargar, simplemente no se muestra nada (el reverso se queda con
 * el fondo bg-brand-surface liso) — a diferencia de TeamPhoto, aquí no
 * hace falta un respaldo con iniciales porque esta imagen es solo una
 * textura decorativa, no el contenido principal.
 */
export default function TeamPhotoGhost({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Image
      key={src}
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, 90vw"
      className="object-cover opacity-10"
      onError={() => setFailed(true)}
    />
  );
}
