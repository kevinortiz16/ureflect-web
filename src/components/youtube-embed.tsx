"use client";

import { useCallback, useEffect, useState } from "react";

type YouTubeEmbedProps = {
  youtubeId: string;
  title: string;
  className?: string;
};

/**
 * Miniatura de YouTube que, al hacer clic, abre el video en un lightbox
 * centrado y considerablemente grande (no a pantalla completa) — el
 * patrón que se ve en muchos sitios al hacer clic en una miniatura de
 * video.
 *
 * Antes de que la persona haga clic, solo se pide una imagen (la
 * miniatura) — el iframe real de YouTube (con todo su script pesado)
 * recién se crea al abrir el lightbox. Mismo espíritu que seguimos con
 * Google Analytics (solo en producción) y las fuentes autoalojadas:
 * evitar peso/terceros de más mientras nadie lo necesita. Usamos
 * youtube-nocookie.com para no dejar cookies de seguimiento hasta que
 * se reproduce.
 */
export default function YouTubeEmbed({ youtubeId, title, className = "" }: YouTubeEmbedProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    // Evita que la página de fondo haga scroll mientras el lightbox está abierto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Reproducir video: ${title}`}
        className={`group relative block aspect-video w-full overflow-hidden bg-black ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- miniatura externa de YouTube */}
        <img
          src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10"
        />
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#111315">
              <path d="M8 5v14l11-7-11-7Z" />
            </svg>
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={close}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar video"
              className="absolute -top-10 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
