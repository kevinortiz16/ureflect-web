@AGENTS.md

# Ureflect — guía para Claude Code

Este archivo es la memoria persistente del proyecto: léelo al empezar
cualquier sesión. El bloque `@AGENTS.md` de arriba lo regenera `next dev`
solo (son notas de compatibilidad de Next.js, no las toques) — todo lo
de abajo es específico de Ureflect y sí hay que mantenerlo a mano.

## Qué es este proyecto

Sitio web de Ureflect LLC (productora de contenido/estrategia digital),
en `04_Pagina_Web/ureflect-web/`. Next.js 16 (App Router, Turbopack) +
next-intl (rutas `[locale]`, `es`/`en`, default `es`) + Tailwind CSS v4
(tokens en `@theme inline` de `src/app/globals.css`, sin
`tailwind.config`) + Prisma/PostgreSQL (Neon) para el formulario de
contacto + nodemailer (Zoho SMTP).

Es un proyecto de un solo desarrollador (Kevin). No hay equipo ni
revisores externos — el único QA es Kevin probando en su propio
`npm run dev`.

## Convenciones de git

- Trabaja siempre directo sobre `main`. **No crees ramas nuevas** salvo
  que se pida explícitamente — este repo nunca ha usado ramas
  (`git log` es 100% lineal) y no hace falta el ritual de feature
  branch/PR para un proyecto de una sola persona.
- Nunca `git push --force`, nunca `--no-verify`, nunca saltar hooks.
- Crea un commit nuevo en vez de `--amend`, salvo que se pida lo
  contrario.
- Un commit por conjunto lógico de cambios relacionados — no mezcles
  una tarea pedida con refactors sueltos que encontraste en el camino.
- Mensaje de commit descriptivo: qué cambió y por qué, no solo "cambios"
  o "updates".
- **Nunca hagas push sin aprobación explícita.** Haz el commit, deja
  todo listo, y espera a que Kevin lo revise en su propio `npm run dev`
  antes de subirlo. Esto aplica siempre, no solo cuando se repite la
  regla en el chat.
- Si necesitas borrar un archivo del repo (no solo del working tree) y
  la herramienta te bloquea el `rm`, pide permiso explícito en vez de
  buscar un rodeo — no muevas archivos a escondidas para evitarlo.

## Verificación obligatoria antes de cualquier commit

En este orden, y los tres deben pasar limpio antes de comitear:

1. `npx tsc --noEmit`
2. `npx eslint .`
3. `npm run build` — obligatorio si el cambio toca rutas, imágenes,
   metadata o algo que solo se comprueba en build; opcional para un
   cambio de una línea de texto.

Si algo no pasa limpio, no se comitea — se arregla primero.

## Reglas propias del dominio (aprendidas a la fuerza en este proyecto)

- **Paridad es/en obligatoria**: cualquier cambio en
  `messages/es.json` tiene que reflejarse en `messages/en.json`, clave
  por clave. Antes de dar por terminado un cambio de copy, confirma que
  ambos archivos tienen las mismas claves y que ninguna quedó vacía o
  sin traducir.
- **Nunca asumas que un archivo de imagen existe** — confírmalo
  (`device_list_dir`/`ls`) antes de referenciarlo en código o en los
  JSON de traducción. Ya hemos tenido bugs reales por esto (una ruta
  con el nombre de archivo equivocado, una portada de portafolio
  apuntando al trabajo incorrecto).
- **Mobile-first, nada esencial detrás de solo-`:hover`**: cualquier
  contenido que importe para entender o usar la página (navegación,
  info de contacto, controles de un carrusel) tiene que funcionar igual
  en celular, sin depender de pasar el cursor ni de transformaciones 3D.
- Antes de crear un componente o sección nueva, revisa si ya existe un
  patrón parecido en `src/components/sections/` (fallback de imagen con
  iniciales, degradado de marca de respaldo, etc.) y reutilízalo en vez
  de inventar uno paralelo.

## Cuándo pedir aprobación antes de actuar

- Antes de cualquier `git push`.
- Antes de borrar archivos (del repo o de la carpeta del proyecto en
  general).
- Antes de un cambio grande que toque contenido público (precios,
  textos de marketing, enfoque geográfico) — mostrar primero el plan o
  el diff, no aplicar y comitear de una.
- Cambios chicos y acotados (un texto, una línea, un ajuste de margen)
  se pueden aplicar directo sin pedir plan primero.

## Paleta de marca vigente

Definida en `src/app/globals.css` (bloque `@theme inline`):

| Token | Hex | Uso |
|---|---|---|
| `--color-brand-blue` | `#212bfd` | acento principal, fondos claros |
| `--color-brand-blue-dark` | `#1a22ca` | texto/botones sobre fondo claro |
| `--color-brand-cyan` | `#01e5f7` | definido, pendiente de adoptar como acento sobre fondo oscuro (ver nota) |
| `--color-brand-black` | `#111315` | texto principal, navbar, footer |
| `--color-brand-ink` | `#090a0c` | fondos oscuros, degradados |
| `--color-brand-white` | `#ffffff` | definido, blanco de marca |
| `--color-brand-surface` | `#f5f4f0` | "Blanco Marfil", fondos de sección |
| `--color-brand-muted` | `#6b7280` | texto secundario (es el gray-500 de Tailwind, no de la hoja de marca) |

**`#00b4ff` es la paleta ANTERIOR — ya no se usa.** Si ves ese hex en
algún lugar del código (o un comentario que lo mencione), es un resto
viejo, repórtalo en vez de asumir que es intencional.

**Pendiente de decisión (ver último informe de auditoría):** `brand-blue`
(#212bfd) no tiene contraste suficiente para texto sobre fondos oscuros
(`brand-ink`/`brand-black`) — falla WCAG AA. Mientras no se decida un
reemplazo, no agregues más texto azul sobre fondo oscuro sin avisar.

## Auditorías periódicas

Cada cierto tiempo (o antes de un lanzamiento), vale la pena pedir una
auditoría completa del sitio — no solo al principio. El último informe
vive en la raíz del proyecto (`informe-auditoria-web-*.md`); si hay uno
más reciente, léelo antes de asumir el estado del sitio.
