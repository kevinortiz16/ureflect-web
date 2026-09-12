import { getTranslations } from "next-intl/server";
import PlaceholderPage from "@/components/placeholder-page";

export default async function Page() {
  const t = await getTranslations("nav");
  return <PlaceholderPage title={t("contact")} />;
}
