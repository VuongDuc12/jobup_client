import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/lib/utils";
import { useSystemConfig } from "@/hooks/useSystemConfig";

interface AboutHeroSectionProps {
    badgeText?: string | null;
    title?: string | null;
    subtitle?: string | null;
    backgroundImage?: string | null;
}

export default function AboutHeroSection({
    badgeText,
    title,
    subtitle,
    backgroundImage,
}: AboutHeroSectionProps) {
    const { config } = useSystemConfig();
    const displayBadge = badgeText || "Về chúng tôi";
    const displayTitle = title || "Kiến tạo giá trị, Kết nối nhân tài Việt.";
    const displaySubtitle =
        subtitle ||
        "Chuyên gia tư vấn tuyển dụng chuyên nghiệp, đồng hành cùng hơn 100+ doanh nghiệp trong hành trình tìm kiếm và phát triển nguồn nhân lực chất lượng cao.";
    const displayBg = getAssetUrl(backgroundImage) || "/hero-workspace.png";
    const displayCta1Url = config.zaloUrl && config.zaloUrl !== '#'
        ? config.zaloUrl
        : (config.hotline ? `https://zalo.me/${config.hotline.replace(/\D/g, '')}` : '#');
    const displayCta2Url = "/tuyen-dung";

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={displayBg}
                    alt="Không gian làm việc hiện đại của JobUp – nơi kết nối nhân tài và doanh nghiệp"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/50 to-brand-black/80" />
            </div>

            {/* Text Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-24 pb-32">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="w-12 h-px bg-brand-yellow" />
                    <span className="text-brand-yellow font-bold text-sm uppercase tracking-[0.3em]">
                        {displayBadge}
                    </span>
                    <span className="w-12 h-px bg-brand-yellow" />
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight">
                    {displayTitle}
                </h1>

                <p className="text-white/80 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-16 font-light">
                    {displaySubtitle}
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <a
                        href={displayCta1Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 py-5 rounded-full bg-brand-yellow text-brand-black font-black text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(240,180,41,0.5)] active:scale-95"
                    >
                        Liên hệ tư vấn
                    </a>
                    <Link
                        href={displayCta2Url}
                        className="px-12 py-5 rounded-full border-2 border-white/40 text-white font-black text-lg hover:bg-white hover:text-brand-black hover:border-white hover:scale-105 transition-all active:scale-95 backdrop-blur-md"
                    >
                        Khám phá cơ hội
                    </Link>
                </div>
            </div>
        </section>
    );
}
