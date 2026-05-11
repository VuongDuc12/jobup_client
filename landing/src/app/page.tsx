import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { fetchHomepageSettingsPublic, fetchPartnersPublic } from "@/lib/api";

const DEFAULT_META = {
  title: "Jobup - Đơn vị cung cấp dịch vụ tuyển dụng",
  description:
    "Với đội ngũ founder sở hữu hơn 12 năm kinh nghiệm trong lĩnh vực tuyển dụng và từng đồng hành cùng nhiều khách hàng thuộc Top VNR500, JobUp tự tin mang đến các giải pháp nhân sự phù hợp với từng nhu cầu riêng của doanh nghiệp.",
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await fetchHomepageSettingsPublic();

    return {
      title: settings?.metaTitle || DEFAULT_META.title,
      description:
        settings?.metaDescription || DEFAULT_META.description,

      openGraph: {
        title: settings?.metaTitle || DEFAULT_META.title,
        description:
          settings?.metaDescription || DEFAULT_META.description,
        siteName: "JobUp",
        url: "https://jobup.vn",
        type: "website",
      },
    };
  } catch {
    return {
      title: DEFAULT_META.title,
      description: DEFAULT_META.description,

      openGraph: {
        siteName: "JobUp",
        url: "https://jobup.vn",
        type: "website",
      },
    };
  }
}

export default async function HomePage() {
  const [settings, partners] = await Promise.all([
    fetchHomepageSettingsPublic().catch(() => null),
    fetchPartnersPublic().catch(() => null),
  ]);

  return <HomePageClient initialSettings={settings} initialPartners={partners} />;
}
