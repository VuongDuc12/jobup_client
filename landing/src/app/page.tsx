import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { fetchHomepageSettingsPublic } from "@/lib/api";

const DEFAULT_META = {
  title: "JobUp",
  description:
    "JobUp - nen tang viec lam uy tin. Tim viec nhanh, luong cao, dai ngo tot.",
};

export async function generateMetadata(): Promise<Metadata> {
  return DEFAULT_META;
}

export default async function HomePage() {
  let settings = null;

  try {
    settings = await fetchHomepageSettingsPublic();
  } catch {
    settings = null;
  }

  return <HomePageClient initialSettings={settings} />;
}
