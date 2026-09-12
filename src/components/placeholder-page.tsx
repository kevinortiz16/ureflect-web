import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PlaceholderPage({ title }: { title: string }) {
  const t = useTranslations("placeholder");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue-dark">
        UREFLECT
      </p>
      <h1 className="mt-3 font-display text-3xl font-extrabold">{title}</h1>
      <p className="mt-4 text-brand-muted">{t("comingSoon")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-brand-black/20 px-5 py-2 text-sm font-semibold hover:bg-brand-black hover:text-white"
      >
        ← {t("backHome")}
      </Link>
    </div>
  );
}
