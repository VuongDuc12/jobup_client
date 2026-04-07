import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
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
  const displaySubtitle =
    subtitle ||
    "Chuyên gia tư vấn tuyển dụng chuyên nghiệp, đồng hành cùng hơn 100+ doanh nghiệp trong hành trình tìm kiếm và phát triển nguồn nhân lực chất lượng cao.";
  const displayBg = getAssetUrl(backgroundImage) || "/hero-workspace.png";

  // Title: CMS string hoặc fallback JSX đẹp
  const displayTitle: React.ReactNode = title ? (
    <span className="text-brand-yellow">{title}</span>
  ) : (
    <>
      <span className="text-brand-yellow">Trở thành đối tác </span>
      <span className="inline-block bg-brand-yellow text-brand-black px-4 py-1 rounded-xl leading-tight font-black">
        tin cậy
      </span>
      <span className="text-brand-yellow">
        {" "}cung cấp dịch vụ tuyển dụng<br />đa ngành nghề khắp Việt Nam
      </span>
    </>
  );
  const displayCta1Url =
    config.zaloUrl && config.zaloUrl !== "#"
      ? config.zaloUrl
      : config.hotline
        ? `https://zalo.me/${config.hotline.replace(/\D/g, "")}`
        : "#";
  const displayCta2Url = "/tuyen-dung";

  return (
    <section className="relative w-full aspect-video flex items-start justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={displayBg}
          alt="Không gian làm việc hiện đại của JobUp – nơi kết nối nhân tài và doanh nghiệp"
          fill
          className="object-contain"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/50 to-brand-black/80" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-12 md:pt-16 lg:pt-20 pb-2 md:pb-4">
        <SectionHeader
          badge={displayBadge}
          title={displayTitle}
          description={displaySubtitle}
          align="center"
          headingTag="h1"
          className="mb-6 md:mb-10"
          contentClassName="max-w-4xl"
          badgeClassName="tracking-[0.24em]"
          titleClassName="mt-6 text-4xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-5xl md:text-6xl xl:text-7xl antialiased"
          descriptionClassName="mt-8 max-w-3xl text-base font-normal leading-relaxed text-white/90 sm:text-lg md:text-xl antialiased"
        />

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
          <a
            href={displayCta1Url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 rounded-full bg-brand-yellow text-brand-black font-black text-base md:text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(240,180,41,0.5)] active:scale-95"
          >
            Liên hệ tư vấn
          </a>
          <Link
            href={displayCta2Url}
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 rounded-full border-2 border-white/40 text-white font-black text-base md:text-lg hover:bg-white hover:text-brand-black hover:border-white hover:scale-105 transition-all active:scale-95 backdrop-blur-md"
          >
            Tìm việc làm ngay
          </Link>
        </div>
      </div>
    </section>
  );
}
