/**
 * Contenido real (fotos/video) de cada caso del portafolio, separado de
 * las traducciones (messages/es.json y en.json) a propósito: el texto
 * (categoría, cliente, descripción) SÍ depende del idioma, pero las
 * fotos y los IDs de YouTube son los mismos sin importar el idioma, así
 * que no tiene sentido duplicarlos en los dos archivos de traducción.
 *
 * Cómo llenarlo:
 * - youtubeIds: el ID del video de YouTube (lo que va después de
 *   "watch?v=" en la URL, ej. "dQw4w9WgXcQ"). No hace falta el link
 *   completo.
 * - photos: rutas dentro de /public/portfolio/<caso>/... Cuando Kevin
 *   tenga las fotos finales listas, se optimizan y se agregan aquí.
 *
 * Mientras un caso no tenga ni fotos ni video, la página de Portafolio
 * sigue mostrando el estado "Galería en camino" (mediaComingSoon) que ya
 * existe en las traducciones.
 */
export type PortfolioCaseKey = "construccion" | "belleza" | "realEstate" | "producto";

export type PortfolioCaseMedia = {
  /** IDs (no URLs completas) de videos de YouTube, en el orden que se quieran mostrar. */
  youtubeIds?: string[];
  /** Rutas de fotos dentro de /public/portfolio/<caso>/. */
  photos?: string[];
};

export const portfolioMedia: Record<PortfolioCaseKey, PortfolioCaseMedia> = {
  construccion: {},
  belleza: {},
  realEstate: {},
  producto: {},
};
