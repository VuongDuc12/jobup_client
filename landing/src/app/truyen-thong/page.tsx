"use client";

import { useEffect, useMemo, useState } from "react";
import { Footer, Navbar } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import { mediaMentions } from "@/lib/mockNews";
import {
  fetchPublicMediaMentionCategories,
  fetchPublicMediaMentions,
} from "@/lib/api";
import type { PublicMediaMentionListItemResponse } from "@/lib/types";

const mediaLogos = [
  "https://vtv1.vtv.vn/Content/Main/Images/logo-vtv.png",
  "https://static.znews.vn/images/logo-znews.svg",
  "https://vneconomy.vn/images/logo.png",
  "https://cafefcdn.com/web_images/logo-cafef.png",
  "https://vtcnews.vn/Content/Images/logo.svg",
];

function formatDate(value?: string | null): string {
  if (!value) return "Đang cập nhật";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Đang cập nhật";
  return date.toLocaleDateString("vi-VN");
}

function fallbackMediaList(): PublicMediaMentionListItemResponse[] {
  return mediaMentions.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.title,
    categoryName: item.label,
    categorySlug: null,
    sourceName: item.source,
    sourceLogo: item.sourceLogo,
    articleUrl: item.articleUrl,
    thumbnailUrl: null,
    isFeatured: item.id === "1",
    isHot: false,
    publishedAt: item.publishedAt,
  }));
}

export default function MediaMentionsPage() {
  const safeFallbackLogo = mediaLogos[0] || "";

  const [mentionList, setMentionList] =
    useState<PublicMediaMentionListItemResponse[]>(fallbackMediaList());
  const [mediaLogosData, setMediaLogosData] = useState<string[]>([
    ...mediaLogos,
  ]);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const [mentionResult, categoryResult] = await Promise.all([
          fetchPublicMediaMentions({ PageNumber: 1, PageSize: 8 }),
          fetchPublicMediaMentionCategories(),
        ]);

        if (!mounted) return;

        if (mentionResult.list.length > 0) {
          setMentionList(mentionResult.list);
        }

        const logosFromApi = mentionResult.list
          .map((item) => item.sourceLogo)
          .filter((logo): logo is string => Boolean(logo && logo.trim()));

        if (logosFromApi.length > 0) {
          setMediaLogosData(Array.from(new Set(logosFromApi)).slice(0, 6));
        } else if (categoryResult.length > 0) {
          setMediaLogosData([...mediaLogos]);
        }
      } catch {
        if (!mounted) return;
        setMentionList(fallbackMediaList());
        setMediaLogosData([...mediaLogos]);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const { featured, list } = useMemo(() => {
    const fallbackItems = fallbackMediaList();
    const items = mentionList.length > 0 ? mentionList : fallbackItems;
    const first =
      items.find((item) => item.isFeatured) ||
      items[0] ||
      ({
        id: "fallback-media-featured",
        title: "Đang cập nhật tin truyền thông",
        summary: null,
        categoryName: "Truyền thông",
        categorySlug: null,
        sourceName: "Nguồn báo chí",
        sourceLogo: null,
        articleUrl: null,
        thumbnailUrl: null,
        isFeatured: false,
        isHot: false,
        publishedAt: null,
      } as PublicMediaMentionListItemResponse);

    return {
      featured: first,
      list: items.filter((item) => item.id !== first.id),
    };
  }, [mentionList]);

  const featuredLogo = featured?.sourceLogo || safeFallbackLogo;

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-white text-gray-800 overflow-x-hidden">
        <section className="relative py-32 overflow-hidden flex items-center justify-center min-h-[65vh]">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=2000"
              alt="Truyền thông"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/85 via-brand-black/70 to-brand-black/90" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-12 h-px bg-brand-yellow" />
              <span className="text-brand-yellow font-bold text-sm uppercase tracking-[0.3em]">
                Tin tức truyền thông
              </span>
              <span className="w-12 h-px bg-brand-yellow" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Nơi khẳng định <span className="text-brand-yellow">Vị Thế</span>
              <br />
              trong lòng công chúng.
            </h1>
            <p className="text-white/80 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
              Chào mừng bạn đến với trung tâm truyền thông của JobUp. Nơi ghi
              dấu những cột mốc quan trọng và tầm nhìn chiến lược của chúng tôi
              qua lăng kính báo chí.
            </p>
          </div>
        </section>

        <section className="py-8 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {mediaLogosData.map((logo, index) => (
                <img
                  key={`${logo}-${index}`}
                  src={logo}
                  className="h-8 md:h-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all"
                  alt="Media logo"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="bg-white border border-gray-100 shadow-soft rounded-[3rem] p-10 md:p-14 hover:border-brand-yellow hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={featuredLogo}
                    className="h-8 object-contain"
                    alt={featured.sourceName || "Báo chí"}
                  />
                  <span className="text-gray-400 text-sm font-bold tracking-widest uppercase">
                    | {featured.categoryName}
                  </span>
                </div>
                <i className="fa-solid fa-quote-left text-brand-yellow text-5xl mb-8 block opacity-20" />
                <h2 className="text-3xl md:text-4xl font-black text-brand-black leading-tight mb-8">
                  “{featured.title}”
                </h2>
                <div className="flex items-center gap-4 mb-10 text-gray-500">
                  <span className="font-bold text-sm">Nguồn:</span>
                  <span className="px-4 py-1.5 rounded-full bg-brand-light-gray text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    {featured.sourceName || "Truyền thông"}
                  </span>
                </div>
                <a
                  href={featured.articleUrl || "#"}
                  className="inline-flex items-center gap-3 text-brand-yellow-hover font-black text-lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  XEM BÀI GỐC
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
              </div>

              <div className="space-y-6">
                {list.map((item) =>
                  (() => {
                    const itemLogo = item.sourceLogo || safeFallbackLogo;

                    return (
                      <a
                        key={item.id}
                        href={item.articleUrl || "#"}
                        className="group flex gap-4 p-4 mb-0 rounded-3xl hover:bg-brand-light-gray transition-all border border-transparent hover:border-gray-100"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="shrink-0 w-24 h-24 bg-brand-light-gray rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                          <img
                            src={itemLogo}
                            className="w-16 h-auto object-contain"
                            alt={item.sourceName || "Nguồn tin"}
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                            <span className="text-brand-yellow text-xs font-black tracking-widest uppercase">
                              {item.categoryName}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-brand-black mb-4 group-hover:text-brand-yellow transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm font-bold flex items-center gap-2">
                            Đọc bài tại {item.sourceName || "Nguồn báo chí"} •{" "}
                            {formatDate(item.publishedAt)}
                            <i className="fa-solid fa-arrow-right text-[10px]" />
                          </p>
                        </div>
                      </a>
                    );
                  })(),
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
