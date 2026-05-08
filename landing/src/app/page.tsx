import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { fetchHomepageSettingsPublic, fetchPartnersPublic } from "@/lib/api";

const DEFAULT_META = {
  title: "JobUp",
  description:
    "JobUp - nền tảng tìm việc làm uy tín. Tìm việc nhanh, lương cao, đời sống tốt.",
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await fetchHomepageSettingsPublic();
    return {
      title: settings?.metaTitle || DEFAULT_META.title,
      description: settings?.metaDescription || DEFAULT_META.description,
    };
  } catch {
    return DEFAULT_META;
  }
}

export default async function HomePage() {
  const [settings, partners] = await Promise.all([
    fetchHomepageSettingsPublic().catch(() => null),
    fetchPartnersPublic().catch(() => null),
  ]);

  return <HomePageClient initialSettings={settings} initialPartners={partners} />;
}
