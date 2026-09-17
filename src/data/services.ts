/**
 * Catálogo de servicios de Ureflect, organizado por categoría — igual
 * de estructura que src/data/portfolio.ts: este archivo solo define
 * IDs y jerarquía; el título y el texto de venta de cada servicio
 * viven en messages/es.json y messages/en.json, bajo "servicesCatalog",
 * usando exactamente los mismos IDs.
 *
 * Categorías del menú desplegable de /servicios:
 * - "empresas": servicios organizados por tipo de negocio (nicho).
 * - "websites": tipos de sitio web que se desarrollan.
 * - "diseno": diseño gráfico, identidad de marca y animación.
 * - "marketing": asesoría de marketing digital, UGC y colaboraciones.
 *
 * No hay precios en ninguno de estos datos a propósito — la página de
 * servicios usa un solo llamado a la acción ("Contáctenos") en vez de
 * tarifas públicas.
 */

export type ServiceCategoryKey = "empresas" | "websites" | "diseno" | "marketing";

export const serviceCategoryOrder: ServiceCategoryKey[] = [
  "empresas",
  "websites",
  "diseno",
  "marketing",
];

// "Empresas" — cada nicho de negocio con sus propios servicios.
export type NichoKey =
  | "construccion"
  | "realEstate"
  | "handyman"
  | "barberias"
  | "estetica"
  | "marcaPersonal"
  | "corporativo";

export const nichoOrder: NichoKey[] = [
  "construccion",
  "realEstate",
  "handyman",
  "barberias",
  "estetica",
  "marcaPersonal",
  "corporativo",
];

export const empresaServicios: Record<NichoKey, string[]> = {
  construccion: [
    "sesionMarca",
    "progresoObra",
    "resultadoFinal",
    "reelIndividual",
    "videoCorporativo",
    "videoTransformacion",
  ],
  realEstate: [
    "fotografiaPropiedad",
    "videoTour",
    "reelVertical",
    "fotografiaAgente",
    "listadoExpress",
    "googleBusinessRealEstate",
  ],
  handyman: [
    "antesDespues",
    "trabajoTerminado",
    "reelReparacion",
    "googleBusinessBasico",
    "arranqueRedes",
    "fotosEquipo",
  ],
  barberias: [
    "sesionMarcaBarberia",
    "reelsTransformacion",
    "comboFotosReels",
    "fotografiaProductoBarberia",
    "marcaBarbero",
    "googleResenas",
  ],
  estetica: [
    "fotografiaAmbiente",
    "fotografiaProductoEstetica",
    "videoTratamiento",
    "reelsBienestar",
    "testimonios",
    "googleBusinessEstetica",
  ],
  marcaPersonal: [
    "sesionEsencial",
    "sesionCompleta",
    "reelPresentacion",
    "paqueteLinkedin",
    "bioProfesional",
    "bannerRedes",
    "miniSitioPersonal",
  ],
  corporativo: [
    "fotografiaEquipo",
    "fotografiaOficina",
    "videoInstitucional",
    "diaContenido",
    "googleBusinessCorporativo",
    "sitioBasico",
  ],
};

// "Websites" — tipos de página que se desarrollan (no por nicho, sino
// por tipo de producto: desde una landing esencial hasta un desarrollo
// a medida como el propio ureflect-web).
export const websiteTypes = [
  "esencial",
  "corporativo",
  "portafolio",
  "tiendaOnline",
  "profesional",
  "aMedida",
] as const;

// "Diseño Gráfico" — agrupado por tipo de pieza.
export type DisenoGrupoKey = "identidad" | "animacion2d" | "animacion3d" | "motion";

export const disenoGrupoOrder: DisenoGrupoKey[] = [
  "identidad",
  "animacion2d",
  "animacion3d",
  "motion",
];

export const disenoServicios: Record<DisenoGrupoKey, string[]> = {
  identidad: ["logoEsencial", "logoProfesional", "identidadCompleta"],
  animacion2d: ["animacionLogo", "reelAnimado2d", "paquetePostsAnimados"],
  animacion3d: ["render3d", "recorrido3d", "animacion3dPersonalizada"],
  motion: ["videoExplicativo", "animacionPresentacion"],
};

// "Marketing Digital, Asesorías y Colaboraciones" — lista plana.
export const marketingServicios = [
  "asesoriaDigital",
  "ugcMarcas",
  "colaboracionesTravel",
] as const;

/**
 * Imágenes de fondo para el "hero" dinámico de /servicios: cuando se
 * elige una categoría (o un nicho dentro de Empresas), el banner de
 * arriba muestra el título, una reseña breve y esta imagen de fondo.
 *
 * Todos los archivos van sueltos en public/services/ (ver el LEEME.md
 * de esa carpeta) — no hace falta que existan todavía: si falta un
 * archivo, el banner simplemente usa el degradado de respaldo.
 */
export const nichoImages: Record<NichoKey, string> = {
  construccion: "/services/construccion.jpg",
  realEstate: "/services/real-estate.jpg",
  handyman: "/services/handyman.jpg",
  barberias: "/services/barberias.jpg",
  estetica: "/services/estetica-salud-spa.jpg",
  marcaPersonal: "/services/marca-personal.jpg",
  corporativo: "/services/corporativo.jpg",
};

// Solo para las categorías que NO se navegan por nicho (Empresas usa
// nichoImages en su lugar).
export const categoryImages: Record<Exclude<ServiceCategoryKey, "empresas">, string> = {
  websites: "/services/websites.jpg",
  diseno: "/services/diseno-grafico.jpg",
  marketing: "/services/marketing-digital.jpg",
};
