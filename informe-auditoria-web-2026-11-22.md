# Informe de auditoría — ureflect-web

**Fecha:** 22 de noviembre de 2026
**Commit auditado:** `6c68645` (rama `main`, árbol limpio)
**Alcance:** solo análisis. No se modificó, commiteó ni pusheó nada. Este archivo es lo único nuevo en el repo.

## Stack confirmado (leído, no asumido)

| Pieza | Versión instalada |
|---|---|
| Next.js | 16.3.5 (Turbopack, App Router, `src/proxy.ts` en lugar de `middleware.ts`) |
| next-intl | 4.14.5 — `locales: ["es","en"]`, `defaultLocale: "es"`, `localePrefix: "always"` |
| React | 19.2.8 |
| Tailwind CSS | 4.3.3 — sin `tailwind.config`; tokens en `@theme inline` de `src/app/globals.css` |
| Prisma | 6 (PostgreSQL/Neon), modelo `ContactMessage` |
| Otros | nodemailer (Zoho SMTP), zod 4, `@next/third-parties` (GA4 solo en producción), fuentes autoalojadas `@fontsource` (Inter + Manrope) |

**Paleta definida en `globals.css:16-23`:** `brand-blue #212bfd`, `brand-blue-dark #1a22ca`, `brand-cyan #01e5f7`, `brand-black #111315`, `brand-ink #090a0c`, `brand-white #ffffff`, `brand-surface #f5f4f0`, `brand-muted #6b7280`. El comentario de la línea 14 dice que antes se usaba un azul aproximado `#00b4ff`.

---

## Actualización — 22 de noviembre de 2026

Los siguientes hallazgos de este informe ya **no aplican** — se resolvieron
en el commit `eabd503` ("Reenfocar el sitio a Raleigh-Durham/RTP, limitar
tipos de negocio y quitar precios"), posterior al commit auditado aquí
(`6c68645`):

- Las notas en `services.ts` y `services-explorer.tsx` sobre precios
  públicos (parte de A10 y A9) — los precios ya se quitaron del sitio.
- Los comentarios desactualizados que hablaban de "Belleza" en
  `hero-section.tsx` y `portfolio.ts` (parte de A10) — esa categoría ya
  no se muestra.
- La parte de **M4** sobre la descripción SEO en español apareciendo
  también en `/en` — el layout ahora genera la metadata por locale.

El resto del informe (incluyendo M1–M3, M5–M11 y el resto de A1–A20)
sigue reflejando el estado real del sitio tal como estaba en `6c68645`
y no se ha vuelto a verificar desde entonces. El contenido original de
abajo queda intacto como registro histórico de esa fecha.

---

## Resumen ejecutivo

El sitio está sano a nivel técnico: `tsc`, `eslint` y `next build` pasan sin errores, las 30 rutas públicas responden 200 en `/es` y `/en`, y las traducciones tienen paridad exacta (369 claves en cada idioma, ninguna vacía). **No hay errores críticos.** Los problemas reales son de **calidad visible**: un trabajo del portafolio muestra la foto de otro, el azul de marca `#212bfd` no tiene contraste suficiente sobre los fondos oscuros (ni como fondo de los botones principales con texto negro), todas las páginas comparten el mismo título y la misma descripción en español (también en `/en`), y la página 404 es la genérica de Next, en inglés y sin marca. El SEO técnico (sitemap, robots, canonical, Open Graph) no existe todavía.

---

## 1–2. Compilación, lint y build

| Comando | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errores, 0 advertencias |
| `npx eslint .` | ✅ 0 errores, 0 advertencias |
| `npm run build` | ✅ exit 0, 24 páginas estáticas generadas. **1 warning** (ver A1). Además, 5 rutas salen como dinámicas `ƒ` cuando podrían ser estáticas (ver A2). |

Prueba en vivo con `next start` (todo 200 en ambos idiomas): `/`, `/servicios`, `/portafolio`, `/nosotros`, `/contacto`, las 4 categorías y las 5 empresas. Los 404 esperados (`/es/portafolio/inexistente`, `/es/noexiste`) devuelven 404. `/` y `/fr` redirigen (307) a `/es`.

---

## Errores críticos (rompen el sitio o la build)

**Ninguno.** No hay errores de compilación, de tipos, de build ni rutas rotas.

---

## Errores medios (bugs visibles que no rompen nada)

### M1. El trabajo "Renovación de 4 baños — Rockville" usa la portada del trabajo de la cocina de Falls Church ⚡
- **Dónde:** `src/data/portfolio.ts:59-60`
- **Qué está mal:** `cover` apunta a `.../kitchen-renovation-church-falls/cover.jpg` en vez de `.../renovacion-4-banos-rockville/cover.jpg`. Ese archivo sí existe en `public/` pero nadie lo usa.
- **Por qué importa:**
  1. En `/portafolio/construccion/cnc-home-improvement` aparece la foto de una cocina en la tarjeta de los baños. Como ese trabajo tiene video, la portada entra en la tira de fotos (`[empresa]/page.tsx:62-63`), así que la foto de la cocina se ve dos veces en la página.
  2. `getAllCovers()` devuelve esa ruta dos veces, y `portfolio-hero-carousel.tsx:39` usa `key={src}`. Eso genera **claves React duplicadas** (warning en consola) y el carrusel del hero de `/portafolio` muestra la misma foto dos veces seguidas.
- **Corrección sugerida:** cambiar la línea 60 a `"/portfolio/construccion/cnc-home-improvement/renovacion-4-banos-rockville/cover.jpg"`. Es una línea y no tiene riesgo.

### M2. El azul de marca `#212bfd` sobre fondos oscuros no pasa el contraste WCAG
- **Ratio medido:** 2.67:1 sobre `brand-ink`, 2.51:1 sobre `brand-black`, unos 2.5:1 sobre el degradado `brand-ink/92` de las tarjetas. AA pide 4.5:1 para texto normal y 3:1 para texto grande.
- **Dónde (texto pequeño en azul sobre oscuro):**
  - Eyebrows: `hero-section.tsx:23`, `portafolio/page.tsx:43`, `contacto/page.tsx:16`, `contacto/page.tsx:65`, `nosotros/page.tsx:34`, `services-explorer.tsx:65`
  - Texto resaltado del H1: `hero-section.tsx:28`, `portafolio/page.tsx:48` (falla incluso el umbral de 3:1 para texto grande)
  - Metadatos "N empresas · N trabajos →": `category-slider.tsx:101`, `portafolio/page.tsx:170`, `[categoria]/page.tsx:80`
  - Hover de enlaces del footer: `footer.tsx:72`, `93`, `147`
  - Ícono de `tech-banner.tsx:21` (los íconos no textuales piden 3:1)
- **Por qué importa:** se lee mal en celular con sol o con brillo bajo, y es un fallo de accesibilidad comprobable. Todo apunta a que estas clases se escribieron con el azul claro anterior (`#00b4ff`) y quedaron así al cambiar el token.
- **Corrección sugerida:** sobre fondos oscuros, usar `brand-cyan` (`#01e5f7`, **12.78:1**, definido pero sin usar en ningún lado) o una variante clara del azul solo para texto sobre oscuro (por ejemplo, un token `--color-brand-blue-light`). En fondos claros, `brand-blue-dark` ya funciona bien (9.9:1).

### M3. Botones principales con texto negro sobre azul de marca: 2.51:1
- **Dónde:** `hero-section.tsx:37` (CTA principal de la home), `nosotros/page.tsx:181`, `contacto/page.tsx:42` (botón de WhatsApp), `navbar.tsx:45` (estado hover del CTA del navbar).
- **Por qué importa:** son los botones de conversión más importantes del sitio y el texto apenas se distingue. Viene de la misma paleta antigua: texto oscuro sobre `#00b4ff` sí funcionaba.
- **Corrección sugerida:** `text-white` sobre `bg-brand-blue` da 7.42:1. Otra opción es unificar con el estilo que ya usan `/servicios`, `/portafolio` y el formulario (`bg-brand-blue-dark text-white`, 9.88:1). Ver también A11.

### M4. El mismo título y la misma descripción, en español, para todas las páginas y ambos idiomas
- **Dónde:** `src/app/[locale]/layout.tsx:26-30` es el único `metadata` del proyecto. No hay `generateMetadata` en ninguna página.
- **Comprobado en el HTML servido:** `/en`, `/en/servicios`, `/en/nosotros` y las páginas de empresa tienen todas `<title>Ureflect | Content · Digital · Growth</title>` y `description` = "Contenido visual, presencia digital y estrategia para negocios que quieren crecer en el DMV."
- **Por qué importa:** Google muestra una descripción en español a quien busca en inglés, y las pestañas y los resultados de búsqueda no distinguen una página de otra.
- **Corrección sugerida:** un `generateMetadata` en el layout que lea título y descripción de `messages/*.json` según el locale, y un `generateMetadata` por página (por ejemplo `title: "Servicios | Ureflect"`, con plantilla `title.template` en el layout).

### M5. La página 404 es la genérica de Next: en inglés, sin marca y sin `lang`
- **Dónde:** no existe `src/app/[locale]/not-found.tsx` ni una ruta catch-all.
- **Comprobado:** `/es/noexiste` devuelve "404: This page could not be found." sin navbar, sin footer y con `<html>` sin atributo `lang`.
- **Por qué importa:** un visitante hispanohablante que sigue un enlace viejo cae en una página en inglés, sin salida hacia el sitio.
- **Corrección sugerida:** el patrón de next-intl: `src/app/[locale]/not-found.tsx` traducido más `src/app/[locale]/[...rest]/page.tsx` que llame a `notFound()`. El componente sin usar `placeholder-page.tsx` (A9) sirve casi tal cual como base.

### M6. Textos de interfaz fijos en español que también aparecen en `/en`
- **Dónde:**
  - `category-slider.tsx:113` `"Categoría anterior"`, `:121` `"Siguiente categoría"`, `:135` `` `Ir a ${slide.label}` ``
  - `youtube-embed.tsx:52` `` `Reproducir video: ${title}` ``, `:83` `"Cerrar video"`
- **Por qué importa:** un lector de pantalla en `/en` lee estas etiquetas en español. Es la única parte del sitio sin paridad de idioma.
- **Corrección sugerida:** pasarlas a `messages/*.json` (por ejemplo `a11y.prevCategory`, `a11y.playVideo`) y usar `useTranslations`.

### M7. Jerarquía de encabezados rota en `/servicios`: de h1 salta a h3
- **Dónde:** `services-explorer.tsx:68` (h1) y después `services-explorer.tsx:142` y `:248` (h3). No hay ningún h2 en la página (comprobado: h1=1, h2=0, h3=6).
- **Por qué importa:** los lectores de pantalla y el SEO usan los encabezados como índice de la página.
- **Corrección sugerida:** un h2 para la sección del catálogo (aunque sea `sr-only`, por ejemplo "Catálogo de servicios"), o subir los títulos de grupo de Diseño a h2.

### M8. Las fotos del portafolio no tienen texto alternativo
- **Dónde:** `[empresa]/page.tsx:74` (portada) y `:90` (tira de fotos), todas con `alt=""`.
- **Por qué importa:** `alt=""` le dice al lector de pantalla que la imagen es decorativa, pero aquí la foto es justo el trabajo que se muestra. El resto de los `alt=""` del sitio sí están justificados: fondos, overlays, el logo junto al texto "UREFLECT" y tarjetas cuyo enlace ya tiene texto visible.
- **Corrección sugerida:** un alt derivado del título del trabajo, por ejemplo `` alt={`${copy?.title} — foto ${n}`} ``, o un campo `alt` por foto en `portfolioJobs`.

### M9. El lightbox de YouTube no se comporta como diálogo accesible
- **Dónde:** `youtube-embed.tsx:75-79`
- **Qué falta:** `role="dialog"`, `aria-modal="true"`, `aria-label`, mover el foco al botón de cerrar al abrir y devolverlo a la miniatura al cerrar. Escape sí funciona.
- **Por qué importa:** quien navega con teclado sigue tabulando por la página de fondo, que queda tapada.
- **Corrección sugerida:** añadir esos atributos y un `useRef` para el foco, o usar `<dialog>` nativo con `showModal()`, que ya incluye la trampa de foco.

### M10. El desplegable de `/servicios` no expone bien su etiqueta ni su rol
- **Dónde:** `category-select.tsx:53-57` (la etiqueta `<span>` no está asociada al botón) y `:88-95` (`role="listbox"` con `role="option"` que a su vez contienen `<button>`).
- **Por qué importa:** el lector de pantalla anuncia "Empresas, botón" sin decir que es el selector de "Categoría". Además, mezclar `option` con un botón anidado es un patrón ARIA inválido, y no hay navegación con flechas.
- **Corrección sugerida:** `id` en el span y `aria-labelledby` en el botón. Después, o patrón listbox completo (`<li role="option" tabIndex>` con flechas, sin botón anidado), o quitar los roles listbox/option y dejarlo como menú de botones simples, que ya funciona con Tab.

### M11. Texto gris y texto de error ligeramente por debajo de AA
- **Ratios:** `brand-muted` sobre `brand-surface` 4.39:1, `red-600` sobre `brand-surface` 4.33:1, `white/40` sobre `brand-black` 3.81:1 (todos en `text-xs`/`text-sm`, que piden 4.5:1).
- **Dónde:** `services-section.tsx:31`, `nosotros/page.tsx:96`, `:144`, `contact-form.tsx:53`, `:141`, `:152` (mensaje de error), `footer.tsx:185` (copyright).
- **Por qué importa:** fallan por poco, pero el mensaje de error del formulario es justo lo que más tiene que leerse.
- **Corrección sugerida:** oscurecer `brand-muted` a algo como `#5b616e`, que pasa sobre los dos fondos; `text-red-700` para el error; `white/50` para el copyright.

---

## Advertencias y mejoras

### A1. Warning de build: `bun.lock` fuera del repo ⚡
- **Salida:** `⚠ Warning: Next.js ignored bun.lock in /Users/DevKev because it is outside the current Git repository … set turbopack.root in your Next.js config.`
- **Por qué importa:** es ruido en cada build y señal de que Turbopack podría inferir mal la raíz del proyecto.
- **Corrección sugerida:** borrar `~/bun.lock` si es un resto suelto (revisar antes que no pertenezca a otro proyecto), o añadir `turbopack: { root: __dirname }` en `next.config.ts`.

### A2. Cinco rutas se renderizan bajo demanda cuando podrían ser estáticas
- **Build:** `/[locale]`, `/contacto`, `/nosotros`, `/portafolio` y `/portafolio/[categoria]/[empresa]` salen como `ƒ (Dynamic)`.
- **Causa probable:** solo `layout.tsx:58` llama a `setRequestLocale`. next-intl pide llamarlo también en cada `page.tsx` para permitir el render estático. Además, `[empresa]/page.tsx` no tiene `generateStaticParams`.
- **Por qué importa:** más tiempo hasta el primer byte y más coste de servidor en páginas cuyo contenido no cambia.
- **Corrección sugerida:** `setRequestLocale(locale)` al inicio de cada página (recibiendo `params`) y un `generateStaticParams` en `[empresa]` que recorra `portfolioCatalog`. Después, confirmar en el build que pasan a `●`/`○`.

### A3. SEO técnico: qué existe y qué falta

| Elemento | Estado |
|---|---|
| `title` / `description` | Existe uno global, en español (ver M4) |
| Favicon / apple-icon | ✅ `src/app/favicon.ico`, `icon.png`, `apple-icon.png` |
| `themeColor` | ✅ `layout.tsx:34-36` |
| `<html lang>` | ✅ correcto por locale (falta solo en el 404, ver M5) |
| `sitemap.xml` | ❌ no existe (404) |
| `robots.txt` | ❌ no existe (404) |
| Canonical | ❌ no existe |
| `hreflang` es/en (`alternates.languages`) | ❌ no existe |
| Open Graph / Twitter card | ❌ no existe (al compartir por WhatsApp o Instagram no sale imagen ni descripción) |
| `metadataBase` | ❌ no existe (necesario para que las URLs de OG y canonical sean absolutas) |
| Datos estructurados (`LocalBusiness` JSON-LD) | ❌ no existe (útil para un negocio local del DMV) |

- **Corrección sugerida:** `src/app/sitemap.ts` y `src/app/robots.ts` (convenciones documentadas en `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/`), `opengraph-image.png` en `src/app/[locale]/`, y `alternates` + `metadataBase` en el `generateMetadata` de M4.

### A4. Las flechas del slider de la home solo aparecen con hover
- **Dónde:** `category-slider.tsx:115` y `:123` (`opacity-0 … group-hover:opacity-100`).
- **No rompe la regla mobile-first:** los puntos de navegación (`:130-141`) siempre están visibles y permiten saltar de categoría, así que el contenido no depende del hover.
- **Problemas secundarios:**
  - Las flechas siguen siendo enfocables con Tab mientras están invisibles (falta `focus-visible:opacity-100`).
  - En tablets (≥640px, sin hover) existen pero nunca se ven.
  - `onTouchStart` (`:59`) pausa el slider y nada lo reanuda en táctil.
  - El avance automático no se pausa cuando el foco del teclado entra al slider (WCAG 2.2.2).
- **Corrección sugerida:** `focus-visible:opacity-100` y que en táctil (`@media (hover:none)`) se vean siempre; pausar con `onFocus` y reanudar con `onBlur`.

### A5. Flecha "→" de las tarjetas de servicios de la home solo con hover
- **Dónde:** `services-section.tsx:59`
- **Por qué importa:** es decorativa, pero en celular nada indica que la tarjeta es un enlace. Además, las 4 tarjetas llevan a la misma URL (`/servicios`) sin preseleccionar la categoría.
- **Corrección sugerida:** mostrar la flecha siempre (por ejemplo con opacidad 60 que suba a 100 en hover). Opcional: un parámetro `?categoria=` que `ServicesExplorer` lea para abrir directamente la categoría elegida.

### A6. Imágenes `fill` sin `sizes`, o con `sizes` demasiado chico ⚡
- **Sin `sizes`** (Next descarga el ancho de pantalla completo): `[categoria]/page.tsx:75`, `[empresa]/page.tsx:74`, `[empresa]/page.tsx:90`. Las miniaturas de la tira, que ocupan un 25% de ancho, se descargan a tamaño completo.
- **`sizes="20vw"` en tarjetas que en celular ocupan ~45vw:** `hero-section.tsx:93` y `:121` (se ven pixeladas en móvil).
- **Corrección sugerida:**
  - `sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"` para las tarjetas de empresa
  - `"(min-width:1024px) 50vw, 100vw"` para la portada del trabajo
  - `"(min-width:1024px) 12vw, 25vw"` para la tira
  - `"(min-width:1024px) 20vw, 45vw"` en el hero

### A7. Fotos del equipo inexistentes: intencional y documentado, con dos cabos sueltos
- **Rutas que no existen:** `/team/kevin-pending.jpg`, `/team/catherine-aragon.jpg`, `/team/sebastian-ortiz.jpg` (`nosotros/page.tsx:16-18`).
- **✅ Son intencionales:** el comentario de `nosotros/page.tsx:8-14` explica que pueden faltar y que la de Kevin queda pendiente a propósito hasta la sesión con camisetas de marca. `TeamPhoto` (`team-photo.tsx:42-56`) cae a las iniciales y `public/team/LEEME.md` documenta el flujo.
- **Cabos sueltos:**
  1. `public/team/LEEME.md` sigue diciendo que el archivo de Kevin es `kevin-ortiz.jpg`, que existe pero ya no se usa en ningún lado.
  2. Cada visita a `/nosotros` dispara 3 peticiones a `/_next/image` que devuelven 400 (comprobado) y ensucian la consola y los logs.
- **Corrección sugerida:** actualizar el LEEME. Opcionalmente, un campo `image: null` mientras no haya foto, para no pedir el archivo.
- **Ningún otro `src=` del código ni de los JSON apunta a archivos inexistentes** (revisados todos los literales `/…​.jpg|png|svg` en `src/` y `messages/`).

### A8. Los LEEME internos son accesibles públicamente
- **Dónde:** `public/services/LEEME.md` y `public/team/LEEME.md` se sirven en `/services/LEEME.md` y `/team/LEEME.md` (comprobado: 200).
- **Por qué importa:** son notas internas de trabajo ("no hace falta avisarme ni pedir un push…") visibles para cualquiera.
- **Corrección sugerida:** moverlos fuera de `public/`, por ejemplo a `docs/` o a la raíz del repo.

### A9. Código y recursos muertos ⚡
- **Componente sin importar en ningún lado:** `src/components/placeholder-page.tsx` (junto con sus claves `placeholder.comingSoon` y `placeholder.backHome`). Puede reutilizarse para el 404 de M5, o borrarse.
- **Claves de traducción sin uso** (existen en ambos idiomas, ningún archivo las lee): `hero.tagBelleza`, `hero.tagRedes`, `portfolio.servicesTag`, `portfolio.items.construction`, `portfolio.items.beauty`, `portfolio.items.realEstate`, `portfolio.items.product`, `servicesPage.headlineStart`, `servicesPage.headlineHighlight`, `servicesPage.intro`, `portfolioNav.watchVideo`. Ojo: `servicesPage.intro` dice "Cada proyecto se cotiza según su alcance específico", lo que contradice los precios públicos que hoy muestra la página.
- **Archivos de plantilla de `create-next-app` sin referencia:** `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.
- **Asset huérfano por el bug M1:** `public/portfolio/construccion/cnc-home-improvement/renovacion-4-banos-rockville/cover.jpg`.
- **Tokens de color definidos sin usar:** `--color-brand-cyan` y `--color-brand-white` (en su lugar se usa `white` de Tailwind 52 veces).
- **Imports sin usar:** ninguno (eslint limpio). No hay archivos `-ghost`, `backup`, `copy` ni duplicados.

### A10. Comentarios y README desactualizados ⚡
- `hero-section.tsx:50-53` dice que Real Estate "todavía no tiene material", pero ya lo tiene.
- `portfolio.ts:171-173`: lo mismo ("Belleza o Real Estate por ahora").
- `services.ts:14-16` dice "No hay precios en ninguno de estos datos a propósito… un solo llamado a la acción en vez de tarifas públicas", pero la página muestra 63 precios por tarjeta (`services-explorer.tsx:250-257`).
- `nosotros/page.tsx:100-106` habla de los huecos de las fotos de Catherine y Sebastian; hoy los tres muestran iniciales.
- `README.md` es el texto de plantilla de `create-next-app` (menciona Geist y `app/page.tsx`, que no aplican a este proyecto).
- **Por qué importa:** confunden a cualquiera, persona o IA, que trabaje después en el código.

### A11. Consistencia de marca: inventario de colores para que decidas la paleta vigente
**Tokens de marca en uso** (número de apariciones en `src/`):

| Token | HEX | Usos | Notas |
|---|---|---|---|
| `brand-black` | `#111315` | 32 | texto principal, navbar, footer |
| `brand-blue` | `#212bfd` | 49 | texto, fondos de botón, bordes, degradados |
| `brand-blue-dark` | `#1a22ca` | 29 | texto y botones sobre fondos claros |
| `brand-ink` | `#090a0c` | 28 | fondos de héroes, degradados |
| `brand-muted` | `#6b7280` | 13 | texto secundario. **Es el `gray-500` de Tailwind**, no viene de la hoja de marca (gris frío junto a un marfil cálido) |
| `brand-surface` | `#f5f4f0` | 11 | "Blanco Marfil" |
| `brand-cyan` | `#01e5f7` | 0 | definido, sin uso |
| `brand-white` | `#ffffff` | 0 | definido, sin uso |

**Colores fuera de los tokens:**

| Valor | Dónde | Observación |
|---|---|---|
| `#111315` hardcodeado | `layout.tsx:35` (themeColor), `youtube-embed.tsx:67` (fill del ícono de play) | duplica `brand-black` |
| `#00b4ff` | `globals.css:14` (solo en un comentario) | azul de la paleta anterior |
| `black` puro (`from-black/70 via-black/10`) | `hero-section.tsx:73`, `:101`, `:129` | el resto de tarjetas con foto (`category-cover.tsx:40`, `category-slider.tsx:87`) usa `brand-ink` |
| `bg-black`, `bg-black/80`, `/25`, `/10` | `youtube-embed.tsx:53`, `:63`, `:76`, `:90` | negro puro en vez de `brand-ink` |
| `red-600` | `contact-form.tsx:152` | no hay token de error |
| `white` / `white/NN` y `black/NN` | 52 usos de blanco y ~20 bordes `black/5` o `black/10` | razonable para bordes y overlays, pero ignora `brand-white` |

**Inconsistencias concretas:**
1. **Dos estilos de botón principal conviviendo.** Uno es `bg-brand-blue text-brand-black` (`hero-section.tsx:37`, `nosotros/page.tsx:181`, `contacto/page.tsx:42`, hover de `navbar.tsx:45`). El otro es `bg-brand-blue-dark text-white` (`services-explorer.tsx:182`, `portafolio/page.tsx:105`, `contact-form.tsx:145`). El primero parece heredado de la paleta `#00b4ff` (ver M3).
2. **Azul para resaltar sobre oscuro:** se usa `brand-blue` (que no contrasta), mientras `brand-cyan`, que es el otro extremo del isotipo y sí contrasta, no se usa.
3. **Tres degradados de respaldo distintos** para "tarjeta sin foto":
   - `from-brand-ink via-brand-blue-dark to-brand-blue` (`category-cover.tsx:25`, `category-slider.tsx:73`, `team-photo.tsx:53`)
   - `from-brand-blue/30 to-brand-blue/5` (`hero-section.tsx:74`)
   - `bg-white/5` (`hero-section.tsx:102`, `:130`)
4. **Negro puro vs. `brand-ink`** en overlays (tabla anterior).
5. **Clases de degradado:** `bg-gradient-to-*` es la sintaxis de Tailwind v3; en v4 sigue funcionando por compatibilidad, pero la sintaxis nativa es `bg-linear-to-*`. No es urgente.

**Decisión que te toca:** confirmar si `#212bfd` es solo para fondos claros y logo, y cuál es el color de acento sobre oscuro (¿`brand-cyan`?). Con eso se unifican los puntos 1 a 3.

### A12. Dos secciones seguidas con el mismo fondo en `/nosotros`
- **Dónde:** `nosotros/page.tsx:88` (Equipo) y `:139` (Equipamiento), ambas `bg-brand-surface`.
- **Por qué importa:** se ven como un solo bloque, justo lo que el comentario de `:84-87` dice querer evitar.
- **Corrección sugerida:** pasar Equipamiento a `bg-white`, o separarlas con un borde.

### A13. Navegación: detalles de accesibilidad
- `navbar.tsx:30-37` y `:76-84`: no hay `aria-current="page"` en el enlace activo, ni ningún indicador visual de la página actual.
- `navbar.tsx:56` y `:59`: `aria-label="Menu"` y un `<span className="sr-only">Menu</span>` dicen lo mismo; con uno basta. Tampoco está traducido.
- El menú móvil no se cierra con Escape.
- `locale-switcher.tsx:21-31`: los enlaces "ES" y "EN" no tienen `lang`/`hrefLang` ni `aria-label` ("Español", "English"), así que un lector de pantalla los deletrea.

### A14. Indicador de foco débil en el formulario y sin estilos `focus-visible` propios
- **Dónde:** `contact-form.tsx:80`, `94`, `107`, `120`, `135` usan `outline-none` y solo cambian el borde de 1px de `black/10` a `brand-blue-dark`.
- El resto de enlaces y botones dependen del anillo de foco del navegador (funciona, pero sobre los fondos oscuros apenas se ve).
- **Corrección sugerida:** `focus-visible:ring-2 focus-visible:ring-brand-blue` en inputs y botones (y `ring-brand-cyan` sobre oscuro).

### A15. Datos de contacto duplicados a mano
- **Dónde:** `wa.me/12024316197` está en `footer.tsx:69` y `contacto/page.tsx:39`; `mailto:contact@ureflect.net` en `footer.tsx:92` y `contacto/page.tsx:56`; el número visible también está en `footer.tsx:89` y en `messages/*.json → contactPage.whatsappValue`.
- **Por qué importa:** al cambiar el número hay que acordarse de 4 o 5 sitios.
- **Corrección sugerida:** un `src/data/contact.ts` con `whatsapp`, `email` y `whatsappDisplay`.

### A16. Las URLs en inglés siguen en español
- `/en/servicios`, `/en/portafolio`, `/en/nosotros`, `/en/contacto`. Funcionan (comprobado), pero no son ideales para SEO en inglés.
- **Corrección sugerida (opcional):** la opción `pathnames` de `defineRouting` en `src/i18n/routing.ts` (`/en/services`, `/en/portfolio`…), junto con el `hreflang` de A3.

### A17. `/api/contact` sin límite de envíos
- **Dónde:** `src/app/api/contact/route.ts`. Solo tiene el honeypot (`:20`, `:40-44`).
- **Por qué importa:** un bot que ignore el honeypot puede llenar la tabla `contact_messages` y la bandeja de Zoho.
- **Corrección sugerida:** un límite por IP (por ejemplo Upstash Ratelimit o un contador en la misma base de datos) o Cloudflare Turnstile.

### A18. `proxy.ts` usa export por defecto
- **Dónde:** `src/proxy.ts:7`
- La guía de Next 16 (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md:635`) recomienda nombrar la función `proxy` aunque se exporte por defecto. Hoy funciona; es solo para alinearse con la convención.

### A19. `.env` y `.env.local` son idénticos
- Los dos están correctamente ignorados por git, y el build carga ambos ("Environments: .env.local, .env").
- **Por qué importa:** si un día solo se actualiza uno, `.env.local` tiene prioridad y puede haber confusión.
- **Corrección sugerida:** quedarse solo con `.env.local`.

### A20. Slug de trabajo con nombre invertido
- **Dónde:** `kitchen-renovation-church-falls` (`portfolio.ts:69` y la carpeta en `public/`), mientras el título dice "Falls Church, VA" (`messages/es.json → portfolioJobs`). Además el slug está en inglés y los demás en español.
- **Por qué importa:** solo afecta al orden interno (el slug no aparece en la URL pública).
- **Corrección sugerida:** renombrar a `remodelacion-cocina-falls-church` en una sesión dedicada a mover assets.

---

## Categorías sin hallazgos

- **Paridad de traducciones (3):** ✅ 369 claves en `es.json` y 369 en `en.json`, sin claves huérfanas, sin valores vacíos ni placeholders, mismas variables ICU (`{count}`, `{category}`) en ambos idiomas, mismos precios (solo cambia "Desde"/"From" y "/mes"/"/mo"). Los IDs de `servicesCatalog` y `portfolioJobs` coinciden 1:1 con `src/data/services.ts` y `src/data/portfolio.ts`.
- **Rutas y enlaces internos (11):** ✅ todos los `href` (`/`, `/servicios`, `/portafolio`, `/nosotros`, `/contacto`, las 4 categorías y las 5 empresas) responden 200 en `/es` y `/en`. Todos usan el `Link` de `@/i18n/navigation`, que antepone el locale.
- **Higiene de repo (10):** ✅ `.DS_Store` (4 en disco), `.env*`, `node_modules`, `.next` y `tsbuildinfo` están en `.gitignore` y no se versionan. El archivo versionado más grande pesa 396 KB. `.env.local.example` solo tiene valores de ejemplo. No hay TODO, FIXME, `console.log` ni `debugger`. Los dos `console.error` de `api/contact/route.ts:57` y `:77` son registros de servidor legítimos.
- **Transformaciones 3D (6):** ✅ ninguna en el código. Los `hover:scale-*` son solo un adorno; no ocultan contenido.

---

## Arreglos rápidos e inofensivos (pendientes de tu aprobación) ⚡

No toqué ninguno. Cada uno es de una o pocas líneas y no cambia nada fuera de su alcance:

1. **M1:** corregir la ruta del `cover` en `portfolio.ts:60`.
2. **A6:** añadir o ajustar `sizes` en 5 `<Image>`.
3. **A9:** borrar los 5 SVG de plantilla de `public/`.
4. **A10:** actualizar los 4 comentarios desactualizados y el README.
5. **A11:** cambiar `#111315` por `var(--color-brand-black)` en `youtube-embed.tsx:67` (en `layout.tsx:35` se queda literal, porque `viewport` no lee CSS).
6. **A1:** `turbopack.root` en `next.config.ts`.

---

## Conteo de hallazgos por severidad

| Severidad | Cantidad | IDs |
|---|---|---|
| 🔴 Críticos | **0** | — |
| 🟠 Medios | **11** | M1–M11 |
| 🟡 Advertencias / mejoras | **20** | A1–A20 |
| **Total** | **31** | |

**Prioridad sugerida:**
1. **M1**: un minuto, error visible en el portafolio.
2. **M2 + M3 + A11**: una sola decisión de paleta resuelve el contraste y la consistencia.
3. **M4 + M5 + A3**: un bloque de SEO e i18n.
4. **M6–M11**: accesibilidad.
5. Resto de advertencias.
