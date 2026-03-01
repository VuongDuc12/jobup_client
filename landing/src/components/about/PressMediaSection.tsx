"use client";

import { useRef } from "react";
import Image from "next/image";
import type { PartnerResponse, PublicMediaMentionListItemResponse } from "@/lib/types";

const fallbackMediaLogos = [
    { src: "https://vtv1.vtv.vn/Content/Main/Images/logo-vtv.png", alt: "VTV", height: "h-8 md:h-12" },
    { src: "https://static.znews.vn/images/logo-znews.svg", alt: "ZNews", height: "h-6 md:h-8" },
    { src: "https://vneconomy.vn/images/logo.png", alt: "VnEconomy", height: "h-6 md:h-8" },
    { src: "https://cafefcdn.com/web_images/logo-cafef.png", alt: "CafeF", height: "h-10 md:h-14" },
    { src: "https://vtcnews.vn/Content/Images/logo.svg", alt: "VTC News", height: "h-10 md:h-12" },
];

const fallbackArticles: PublicMediaMentionListItemResponse[] = [
    {
        id: "1",
        title: "CEO Hà Phan: \"Kết nối nhân tài là chìa khóa phục hồi doanh nghiệp sau đại dịch\"",
        summary: null,
        categoryName: "Phỏng vấn CEO",
        categorySlug: null,
        sourceName: null,
        sourceLogo: null,
        articleUrl: null,
        thumbnailUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
        isFeatured: false,
        isHot: false,
        publishedAt: null,
    },
    {
        id: "2",
        title: "JobUp công bố giải pháp Headhunter tự động hóa cho các doanh nghiệp SMEs",
        summary: null,
        categoryName: "Thị trường",
        categorySlug: null,
        sourceName: null,
        sourceLogo: null,
        articleUrl: null,
        thumbnailUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
        isFeatured: false,
        isHot: false,
        publishedAt: null,
    },
    {
        id: "3",
        title: "Hành trình 5 năm định hình lại thị trường tuyển dụng truyền thống",
        summary: null,
        categoryName: "Phát triển bền vững",
        categorySlug: null,
        sourceName: null,
        sourceLogo: null,
        articleUrl: null,
        thumbnailUrl: "https://images.unsplash.com/photo-1573163231367-4e5083c07044?auto=format&fit=crop&q=80&w=800",
        isFeatured: false,
        isHot: false,
        publishedAt: null,
    },
    {
        id: "4",
        title: "Ứng dụng AI trong sàng lọc ứng viên: Bước tiến mới của JobUp",
        summary: null,
        categoryName: "Công nghệ",
        categorySlug: null,
        sourceName: null,
        sourceLogo: null,
        articleUrl: null,
        thumbnailUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
        isFeatured: false,
        isHot: false,
        publishedAt: null,
    },
];

interface PressMediaSectionProps {
    partners: PartnerResponse[] | null;
    mediaMentions: PublicMediaMentionListItemResponse[] | null;
}

export default function PressMediaSection({
    partners,
    mediaMentions,
}: PressMediaSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const articles =
        mediaMentions && mediaMentions.length > 0
            ? mediaMentions
            : fallbackArticles;

    const scroll = (direction: "prev" | "next") => {
        if (!scrollRef.current) return;
        const scrollAmount = scrollRef.current.offsetWidth * 0.8;
        scrollRef.current.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    // Determine media logos — use partners if available, otherwise fallback
    const hasPartnerLogos = partners && partners.length > 0;

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-8 h-px bg-brand-yellow" />
                        <span className="text-brand-yellow font-bold text-sm uppercase tracking-widest">
                            Tin tức &amp; Truyền thông
                        </span>
                        <span className="w-8 h-px bg-brand-yellow" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-brand-black mb-4">
                        JobUp &amp; CEO Hà Phan trên truyền thông
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Sứ mệnh kết nối nhân tài của chúng tôi được lan tỏa bởi các
                        cơ quan báo chí và truyền hình uy tín hàng đầu Việt Nam.
                    </p>
                </div>

                {/* Media Partner Logos */}
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 mb-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {hasPartnerLogos
                        ? partners
                              .filter((p) => p.isActive)
                              .sort((a, b) => a.displayOrder - b.displayOrder)
                              .map((partner) => (
                                  <div
                                      key={partner.id}
                                      className="h-8 md:h-12 flex items-center justify-center"
                                  >
                                      {partner.logoUrl && (
                                          <Image
                                              src={partner.logoUrl}
                                              alt={partner.name ?? "Partner"}
                                              width={120}
                                              height={48}
                                              className="h-full w-auto block hover:scale-110 transition-transform object-contain"
                                              loading="lazy"
                                              unoptimized
                                          />
                                      )}
                                  </div>
                              ))
                        : fallbackMediaLogos.map((logo, idx) => (
                              <div
                                  key={idx}
                                  className={`${logo.height} flex items-center justify-center`}
                              >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                      src={logo.src}
                                      className="h-full w-auto block hover:scale-110 transition-transform"
                                      alt={logo.alt}
                                  />
                              </div>
                          ))}
                </div>

                {/* Press Slider */}
                <div className="relative group">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
                    >
                        {articles.map((article) => (
                            <div
                                key={article.id}
                                className="min-w-[300px] md:min-w-[350px] lg:min-w-[380px] flex-shrink-0"
                            >
                                <a
                                    href={article.articleUrl ?? "#"}
                                    target={article.articleUrl ? "_blank" : undefined}
                                    rel={article.articleUrl ? "noopener noreferrer" : undefined}
                                    className="group/art block"
                                >
                                    <div className="relative rounded-3xl overflow-hidden mb-6 aspect-video shadow-lg">
                                        <Image
                                            src={
                                                article.thumbnailUrl ??
                                                "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
                                            }
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover/art:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent opacity-0 group-hover/art:opacity-100 transition-opacity flex items-end p-6">
                                            <span className="text-white font-bold text-sm">
                                                Xem bài báo{" "}
                                                <i className="fa-solid fa-arrow-right ml-2 text-brand-yellow" />
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-brand-yellow text-xs font-bold uppercase tracking-widest">
                                        {article.categoryName}
                                    </span>
                                    <h4 className="text-xl font-bold text-brand-black mt-2 leading-tight group-hover/art:text-brand-yellow transition-colors">
                                        {article.title}
                                    </h4>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 -right-4 justify-between pointer-events-none z-20">
                        <button
                            onClick={() => scroll("prev")}
                            className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-black hover:bg-brand-yellow transition-all pointer-events-auto border border-gray-100 cursor-pointer"
                        >
                            <i className="fa-solid fa-chevron-left" />
                        </button>
                        <button
                            onClick={() => scroll("next")}
                            className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-black hover:bg-brand-yellow transition-all pointer-events-auto border border-gray-100 cursor-pointer"
                        >
                            <i className="fa-solid fa-chevron-right" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
