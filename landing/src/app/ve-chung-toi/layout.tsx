import type { Metadata } from "next";
import { fetchAboutSettingsPublic } from "@/lib/api";

const defaultMeta = {
    title: "Về JobUp – Đối Tác Tuyển Dụng Chuyên Nghiệp Hàng Đầu Việt Nam",
    description:
        "JobUp là đơn vị tư vấn tuyển dụng chuyên nghiệp hàng đầu Việt Nam, phục vụ hơn 100 doanh nghiệp trong 15+ ngành nghề. Tìm hiểu về đội ngũ, tầm nhìn và giá trị cốt lõi của chúng tôi.",
};

export async function generateMetadata(): Promise<Metadata> {
    const settings = await fetchAboutSettingsPublic().catch(() => null);

    const metaTitle = settings?.metaTitle || defaultMeta.title;
    const metaDescription =
        settings?.metaDescription || defaultMeta.description;

    return {
        title: metaTitle,
        description: metaDescription,
        keywords:
            "jobup, tuyển dụng chuyên nghiệp, tư vấn nhân sự, headhunter việt nam, ha phan mhrm, dịch vụ tuyển dụng, về jobup",
        robots: "index, follow",
        openGraph: {
            type: "website",
            url: "https://jobup.vn/ve-chung-toi",
            title: metaTitle,
            description: metaDescription,
            images: ["https://jobup.vn/assets/og-about.jpg"],
        },
        other: {
            "theme-color": "#F0B429",
        },
    };
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
