import Image from "next/image";

type LogoProps = {
  className?: string;
};

/**
 * Isotipo + wordmark real de Ureflect (02_Diseno_y_Logo/PNG/1x/Mesa de
 * trabajo 1 copia 6.png — recortado a public/brand/logo-mark-cream.png).
 *
 * Usamos la variante "marfil" (blanco cálido) porque tanto el navbar
 * como el footer usan fondo oscuro (bg-brand-black). Si algún día se usa
 * este componente sobre fondo claro, existe la variante equivalente en
 * public/brand/logo-mark-black.png.
 *
 * El texto "UREFLECT" se deja como HTML (no como parte de la imagen) a
 * propósito: así sigue usando la tipografía del sitio (Manrope) y no se
 * duplica el trabajo de accesibilidad/SEO que ya hace el <span>.
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/logo-mark-cream.png"
        alt=""
        width={30}
        height={35}
        priority
        className="h-7 w-auto"
      />
      <span className="font-display text-lg font-extrabold tracking-tight text-white">
        UREFLECT
      </span>
    </span>
  );
}
