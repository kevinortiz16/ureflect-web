"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Foto de un miembro del equipo — la cara "de frente" de la tarjeta
 * que gira en /nosotros (ver ese page.tsx: este componente vive
 * dentro de un contenedor con tamaño ya definido, así que llena todo
 * ese espacio con h-full/w-full en vez de fijar su propia relación
 * de aspecto).
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
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-brand-ink ring-1 ring-black/5">
      {!failed ? (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-ink via-brand-blue-dark to-brand-blue">
          <span className="font-display text-4xl font-extrabold text-white/90">{initials}</span>
        </div>
      )}
    </div>
  );
}
