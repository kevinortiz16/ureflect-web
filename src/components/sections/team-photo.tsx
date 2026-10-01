"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Foto de un miembro del equipo en /nosotros. El tamaño, la forma
 * (círculo o rectángulo) y el fondo de respaldo los define quien usa
 * este componente con su propio contenedor — aquí solo se llena ese
 * espacio, para que el mismo componente sirva tanto para un avatar
 * circular chico como para una foto grande rectangular.
 *
 * `fit="contain"` (por defecto) muestra la foto completa sin recortar
 * cabeza/hombros — pensado para contenedores grandes. `fit="cover"`
 * recorta para llenar el espacio por completo, mejor para avatares
 * chicos (como en la lista del equipo) donde dejar espacio vacío
 * alrededor de la cara se ve raro.
 *
 * Si la foto todavía no existe en public/team/ (o falla al cargar),
 * se muestra un respaldo con las iniciales sobre el degradado de
 * marca — nunca se rompe ni se ve un ícono de imagen caída, igual que
 * el patrón que ya usamos en el banner de /servicios.
 *
 * `key={src}` fuerza a React a montar una instancia nueva cuando
 * cambia la foto, así el estado de error no queda "pegado".
 */
export default function TeamPhoto({
  src,
  alt,
  initials,
  fit = "contain",
}: {
  src: string;
  alt: string;
  initials: string;
  fit?: "contain" | "cover";
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!failed ? (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className={fit === "cover" ? "object-cover" : "object-contain"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-ink via-brand-blue-dark to-brand-blue">
          <span className="font-display text-2xl font-extrabold text-white/90">{initials}</span>
        </div>
      )}
    </div>
  );
}
