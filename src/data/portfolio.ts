/**
 * Catálogo del portafolio: Categoría → Empresa/Cliente → Trabajo.
 * Separado de las traducciones (messages/es.json y en.json) a propósito:
 * las rutas de fotos, IDs de YouTube y la jerarquía no dependen del
 * idioma, pero el título/descripción de cada trabajo sí (ver
 * messages/es.json → portfolioJobs, misma forma que este catálogo).
 *
 * Cómo se llena:
 * - Cada trabajo necesita "cover" (la foto "portada" de esa carpeta en
 *   06_Portafolio — debe ser horizontal, se usa también en el carrusel
 *   del hero de /portafolio).
 * - "photos": fotos adicionales de ese trabajo (cualquier orientación).
 * - "youtubeIds": IDs (no URLs completas) de YouTube, si hay video.
 * - Todas las rutas de imagen apuntan a /public/portfolio/<categoria>/<empresa>/<trabajo>/...
 */

export type PortfolioCategoryKey = "construccion" | "belleza" | "realEstate" | "producto";

// Slug de la URL (/portafolio/[categoria]) — separado de la key interna
// para que la URL no quede en camelCase (realEstate -> "real-estate").
export const categorySlugs: Record<PortfolioCategoryKey, string> = {
  construccion: "construccion",
  belleza: "belleza",
  realEstate: "real-estate",
  producto: "producto",
};

const slugToCategoryKey = Object.fromEntries(
  Object.entries(categorySlugs).map(([key, slug]) => [slug, key])
) as Record<string, PortfolioCategoryKey>;

export function getCategoryKeyFromSlug(slug: string): PortfolioCategoryKey | undefined {
  return slugToCategoryKey[slug];
}

export type PortfolioJob = {
  id: string;
  /** Foto "portada" del trabajo — horizontal. Se usa en el carrusel del hero. */
  cover: string;
  photos?: string[];
  youtubeIds?: string[];
};

export type PortfolioCompany = {
  id: string;
  /** Nombre real de la empresa/cliente — no se traduce (nombre propio). */
  name: string;
  jobs: PortfolioJob[];
};

export const portfolioCatalog: Record<PortfolioCategoryKey, PortfolioCompany[]> = {
  construccion: [
    {
      id: "cnc-home-improvement",
      name: "CnC Home Improvement LLC",
      jobs: [
        {
          id: "renovacion-4-banos-rockville",
          cover:
            "/portfolio/construccion/cnc-home-improvement/renovacion-4-banos-rockville/cover.jpg",
          photos: [
            "/portfolio/construccion/cnc-home-improvement/renovacion-4-banos-rockville/photo-1.jpg",
            "/portfolio/construccion/cnc-home-improvement/renovacion-4-banos-rockville/photo-2.jpg",
            "/portfolio/construccion/cnc-home-improvement/renovacion-4-banos-rockville/photo-3.jpg",
          ],
          youtubeIds: ["sSkk5C2vdL4"],
        },
      ],
    },
  ],
  belleza: [],
  realEstate: [],
  producto: [],
};

export function getCompany(
  categoryKey: PortfolioCategoryKey,
  companyId: string
): PortfolioCompany | undefined {
  return portfolioCatalog[categoryKey]?.find((company) => company.id === companyId);
}

/** Todas las fotos "portada" de todos los trabajos — para el carrusel del hero. */
export function getAllCovers(): string[] {
  return Object.values(portfolioCatalog).flatMap((companies) =>
    companies.flatMap((company) => company.jobs.map((job) => job.cover))
  );
}
