import AboutPageClient from "@/components/pages/AboutPageClient";
import {
    fetchTestimonialsPublic,
    fetchStatisticsPublic,
    fetchMediaMentionsPublic,
    fetchAboutSettingsPublic,
} from "@/lib/api";

export default async function AboutPage() {
    const [testimonials, statistics, mediaMentions, aboutSettings] =
        await Promise.all([
            fetchTestimonialsPublic().catch(() => null),
            fetchStatisticsPublic().catch(() => null),
            fetchMediaMentionsPublic({ PageSize: 12 }).catch(() => null),
            fetchAboutSettingsPublic().catch(() => null),
        ]);

    return (
        <>
            {/* JSON-LD Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "JobUp",
                        url: "https://jobup.vn",
                        logo: "https://jobup.vn/Logo.png",
                        description:
                            "JobUp là nhà cung cấp dịch vụ tư vấn tuyển dụng chuyên nghiệp, phục vụ hơn 100 khách hàng trong 15+ ngành nghề tại Việt Nam.",
                        foundingDate: "2020",
                        founder: {
                            "@type": "Person",
                            name: "Ha Phan",
                            jobTitle: "CEO & Founder",
                        },
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "C23.Lot18, P.Định Công",
                            addressLocality: "Hoàng Mai",
                            addressRegion: "Hà Nội",
                            addressCountry: "VN",
                        },
                        contactPoint: {
                            "@type": "ContactPoint",
                            telephone: "+84979334143",
                            contactType: "customer service",
                            availableLanguage: ["Vietnamese", "English"],
                        },
                        sameAs: [
                            "https://facebook.com/jobup.vn",
                            "https://linkedin.com/company/jobup",
                        ],
                    }),
                }}
            />

            {/* BreadcrumbList Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "Trang chủ",
                                item: "https://jobup.vn",
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Về chúng tôi",
                                item: "https://jobup.vn/ve-chung-toi",
                            },
                        ],
                    }),
                }}
            />

            <AboutPageClient
                initialTestimonials={testimonials}
                initialStatistics={statistics}
                initialMediaMentions={mediaMentions?.list ?? null}
                initialAboutSettings={aboutSettings}
            />
        </>
    );
}
