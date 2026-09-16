"use client";

import { useState } from "react";

type YouTubeEmbedProps = {
  youtubeId: string;
  title: string;
  className?: string;
};

/**
 * Embed "lite" de YouTube: al cargar la página solo se pide una miniatura
 * (una sola imagen), no el reproductor completo de YouTube. El iframe
 * real de YouTube (que trae su propio JavaScript pesado) solo se crea
 * cuando la persona hace clic en play.
 *
 * Por qué importa: si metiéramos un <iframe> de YouTube por cada video
 * desde el primer render, cada visita a /portafolio cargaría el
 * reproductor de YouTube completo 3+ veces aunque nadie los reproduzca —
 * mismo espíritu que ya seguimos con Google Analytics (solo carga en
 * producción) y las fuentes autoalojadas (evitar peso/terceros de más).
 *
 * Usamos youtube-nocookie.com en vez de youtube.com: es el dominio que
 * ofrece el propio YouTube para no dejar cookies de seguimiento hasta
 * que la persona decide reproducir el video.
 */
export default function YouTubeEmbed({ youtubeId, title, className = "" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative aspect-video overflow-hidden bg-black ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Reproducir video: ${title}`}
      className={`group relative block aspect-video w-full overflow-hidden bg-black ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- miniatura externa de YouTube, no vale la pena pasarla por next/image */}
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
  );
}
