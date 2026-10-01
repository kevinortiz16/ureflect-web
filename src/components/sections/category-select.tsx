"use client";

import { useEffect, useRef, useState } from "react";

export type SelectOption<T extends string> = { value: T; label: string };

/**
 * Dropdown de categoría/tipo de negocio de /servicios — reemplaza el
 * <select> nativo (que en casi todos los navegadores se ve con la
 * lista del sistema operativo, sin marca) por uno con el mismo look
 * del resto del sitio: borde y check en azul, panel con sombra,
 * opción activa resaltada.
 *
 * Sigue siendo un botón + lista (no un <select>), así que se maneja
 * el propio estado de abierto/cerrado, clic afuera para cerrar, y
 * Escape — sin librerías nuevas, son solo 3-7 opciones por selector.
 */
export default function CategorySelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <span className="block text-xs font-semibold uppercase tracking-wide text-brand-muted">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`mt-2 flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm font-semibold text-brand-black shadow-sm transition-colors sm:max-w-sm ${
          open
            ? "border-brand-blue ring-2 ring-brand-blue/20"
            : "border-black/10 hover:border-brand-blue/40"
        }`}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-brand-blue" />
          {current?.label}
        </span>
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          className={`shrink-0 text-brand-blue-dark transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-black/10 bg-white py-1.5 shadow-lg sm:max-w-sm"
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "bg-brand-blue/10 font-semibold text-brand-blue-dark"
                      : "text-brand-black hover:bg-brand-surface"
                  }`}
                >
                  {option.label}
                  {selected && (
                    <svg
                      aria-hidden="true"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      className="shrink-0 text-brand-blue"
                    >
                      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
