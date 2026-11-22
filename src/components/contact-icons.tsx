/**
 * Íconos de contacto (WhatsApp y correo) en línea, con el mismo trazo
 * y los mismos paths que ya usa el footer — así los dos lugares se
 * ven iguales. Heredan el color del texto (`currentColor`) y el tamaño
 * se controla con `className` (ej. "h-6 w-6").
 *
 * Son decorativos (`aria-hidden`): siempre van junto a un texto que ya
 * dice "WhatsApp" o "Correo".
 */
type IconProps = { className?: string };

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z M8.8 9.4c.4 1.8 1.7 3.6 3.6 4.4.5-.5.9-1 1.1-1.3.3-.4.6-.3.9-.1.4.3 1.3.9 1.6 1.1.2.2.3.9-.2 1.4-.6.6-1.8.9-3.4.2-1.9-.8-3.4-2.3-4.2-4.1-.6-1.4-.2-2.5.3-3 .3-.3.6-.2.8 0l.5 1.4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Pin de ubicación — para "Zona de servicio" en /contacto.
export function LocationIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z M12 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 6h16v12H4V6Z M4 6l8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
