type LogoProps = {
  className?: string;
};

/**
 * Placeholder wordmark/isotype.
 *
 * TODO(Kevin): swap this for the real isotipo once you export it as an
 * SVG or transparent PNG from your designer and drop it into
 * 02_Diseno_y_Logo/. This is a simple geometric stand-in so the layout
 * works today — it is NOT trying to reproduce the real logo.
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="uref-grad" x1="0" y1="0" x2="28" y2="28">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#00b4ff" />
          </linearGradient>
        </defs>
        <path
          d="M6 4v11a8 8 0 0 0 16 0V4h-4v11a4 4 0 0 1-8 0V4H6Z"
          fill="url(#uref-grad)"
        />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">
        UREFLECT
      </span>
    </span>
  );
}
