"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchPublicArticlesByCategorySlug } from "@/lib/api";
import { getAssetUrl } from "@/lib/utils";

interface Slide {
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
}

const slides: Slide[] = [];

const badgeColorByIndex = [
  "bg-red-600 text-white",
  "bg-brand-yellow text-brand-black",
  "bg-brand-black text-white",
];

const CAMNANG_CATEGORY_SLUG = "cam-nang-cv";
const FALLBACK_IMAGE = "/images/news8.jpg";

export default function CareerHandbook() {
  const [current, setCurrent] = useState(0);
  const [handbookSlides, setHandbookSlides] = useState<Slide[]>(slides);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    if (handbookSlides.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % handbookSlides.length);
    }, 4000);
  }, [handbookSlides.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    let mounted = true;

    const loadCamNangArticles = async () => {
      try {
        const result = await fetchPublicArticlesByCategorySlug(
          CAMNANG_CATEGORY_SLUG,
          {
            PageNumber: 1,
            PageSize: 3,
          },
        );

        if (!mounted) return;
        const nextSlides = (result.list || [])
          .slice(0, 3)
          .map((item, index) => ({
            image: getAssetUrl(item.avatar) || FALLBACK_IMAGE,
            badge: item.categoryName || "Cẩm nang",
            badgeColor: badgeColorByIndex[index % badgeColorByIndex.length],
            title: item.title,
            description: item.summary || "Đang cập nhật nội dung bài viết...",
          }));

        if (nextSlides.length > 0) {
          setHandbookSlides(nextSlides);
          setCurrent(0);
        }
      } catch {
        // Keep fallback slides
      }
    };

    loadCamNangArticles();

    return () => {
      mounted = false;
    };
  }, []);

  const handleExploreHandbook = () => {
    try {
      sessionStorage.setItem(
        "jobup_news_filters",
        JSON.stringify({
          categorySlug: CAMNANG_CATEGORY_SLUG,
          label: "Cẩm nang",
        }),
      );
    } catch {
      // no-op
    }
    window.location.href = "/tin-noi-bo";
  };

  return (
    <div
      className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 flex flex-col h-[480px] relative group/handbook"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Header with Progress Dots */}
      <div className="p-6 pb-4 flex items-center justify-between shrink-0">
        <h4 className="font-black text-gray-900 text-xl flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
            <i className="fa-solid fa-book-open text-brand-yellow text-sm" />
          </div>
          Cẩm Nang
        </h4>
        <div className="flex gap-2">
          {handbookSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "w-6 bg-brand-yellow" : "w-1.5 bg-gray-200"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="flex-grow overflow-hidden relative">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {handbookSlides.map((slide, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 px-6 flex flex-col h-full"
            >
              <div className="relative rounded-2xl overflow-hidden h-48 mb-4 shadow-sm group cursor-pointer shrink-0">
                <img
                  src={slide.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={slide.badge}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
              </div>
              <div className="overflow-hidden">
                <h5 className="font-black text-gray-900 text-base leading-tight group-hover/handbook:text-brand-yellow transition-colors line-clamp-2">
                  {slide.title}
                </h5>
                <p className="text-gray-500 text-sm mt-3 font-medium leading-relaxed line-clamp-2">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6 pt-0 mt-auto shrink-0">
        <button
          onClick={handleExploreHandbook}
          className="w-full py-4 bg-brand-black text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-brand-yellow hover:text-brand-black transition-all group/btn flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          Khám phá cẩm nang{" "}
          <i className="fa-solid fa-arrow-right-long group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
