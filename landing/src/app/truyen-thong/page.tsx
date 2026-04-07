"use client";

import { useEffect, useState } from "react";
import { Footer, Navbar } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import SectionHeader from "@/components/shared/SectionHeader";
import NumberedPagination from "@/components/shared/NumberedPagination";
import { mediaMentions } from "@/lib/mockNews";
import {
  fetchPublicMediaMentions,
  trackPublicMediaMentionView,
} from "@/lib/api";
import { resolveAssetUrl } from "@/lib/utils";
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
  const PAGE_SIZE = 5;
  const safeFallbackLogo = mediaLogos[0] || "";

  const [featuredItem, setFeaturedItem] =
    useState<PublicMediaMentionListItemResponse>(() => {
      const all = fallbackMediaList();
      return (
        all.find((i) => i.isFeatured) ||
        all[0] || ({
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
        } as PublicMediaMentionListItemResponse)
      );
    });
  const [listItems, setListItems] = useState<PublicMediaMentionListItemResponse[]>(() => {
    const all = fallbackMediaList();
    const fav = all.find((i) => i.isFeatured) || all[0];
    return fav ? all.filter((i) => i.id !== fav.id) : all;
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);

  // Effect 1: fetch featured item once on mount
  useEffect(() => {
    let mounted = true;
    const loadFeatured = async () => {
      try {
        const result = await fetchPublicMediaMentions({
          IsFeatured: true,
          PageSize: 1,
          PageNumber: 1,
        });
        if (!mounted) return;
        const item = result.list?.[0];
        if (item) setFeaturedItem(item);
      } catch {
        // keep fallback
      }
    };
    loadFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  // Effect 2: fetch list on keyword / page change
  useEffect(() => {
    let mounted = true;

    const loadList = async () => {
      const isFirstPage = pageNumber === 1;
      if (isFirstPage) {
        setIsSearching(true);
        setSearchFailed(false);
      } else {
        setIsPaginating(true);
      }

      try {
        const result = await fetchPublicMediaMentions({
          PageNumber: pageNumber,
          PageSize: PAGE_SIZE,
          Keyword: keyword || undefined,
        });

        if (!mounted) return;

        setListItems(result.list || []);
        setTotalPages(Math.max(result.totalPages || 1, 1));
      } catch {
        if (!mounted) return;
        if (isFirstPage) {
          if (keyword) {
            setSearchFailed(true);
          } else {
            const all = fallbackMediaList();
            const fav = all.find((i) => i.isFeatured) || all[0];
            setListItems(fav ? all.filter((i) => i.id !== fav.id) : all);
            setTotalPages(1);
          }
        }
      } finally {
        if (!mounted) return;
        if (isFirstPage) setIsSearching(false);
        else setIsPaginating(false);
      }
    };

    loadList();

    return () => {
      mounted = false;
    };
  }, [keyword, pageNumber]);

  const handleSearch = () => {
    setPageNumber(1);
    setKeyword(keywordInput.trim());
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage === pageNumber || nextPage < 1 || nextPage > totalPages) {
      return;
    }
    setPageNumber(nextPage);
  };

  const displayList = listItems.filter((item) => item.id !== featuredItem.id);
  const featuredLogo =
    resolveAssetUrl(featuredItem?.thumbnailUrl) || safeFallbackLogo;

  return (
    <>
      <Navbar />
      <main className="pt-20 landing-page-shell-tight bg-white text-gray-800 overflow-x-hidden">
        <section className="relative landing-section overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[65vh]">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/press-workplace.jpg"
              alt="Truyền thông"
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Dark base overlay */}
            <div className="absolute inset-0 bg-black/75" />
            {/* Brand gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-black/60 via-transparent to-brand-black/80" />
            {/* Yellow glow from bottom-left */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-brand-yellow/10 blur-[120px] rounded-full" />
            {/* Subtle top vignette */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <SectionHeader
              badge="Tin tức báo chí, truyền hình"
              title={
                <>
                  <span className="text-white">Nơi khẳng định{" "}</span>
                  <span className="inline-block bg-brand-yellow text-brand-black px-4 py-1 rounded-xl leading-tight font-black">vị thế</span>
                  <br />
                  <span className="text-white">trong lòng công chúng</span>
                </>
              }
              description="Chào mừng bạn đến với trung tâm truyền thông của JobUp. Nơi ghi dấu những cột mốc quan trọng và tầm nhìn chiến lược của chúng tôi qua lăng kính báo chí."
              align="center"
              headingTag="h1"
              className="mb-6 md:mb-8"
              contentClassName="max-w-4xl"
              badgeClassName="tracking-[0.24em]"
              titleClassName="text-3xl font-black leading-tight sm:text-4xl md:text-7xl"
              descriptionClassName="max-w-4xl text-base font-light leading-relaxed text-white/80 sm:text-lg md:text-2xl"
            />
            <div className="mt-6 md:mt-8 mx-auto max-w-2xl flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative w-full">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  value={keywordInput}
                  onChange={(event) => setKeywordInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSearch();
                  }}
                  type="text"
                  placeholder="Tìm kiếm tin truyền thông..."
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-brand-yellow"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-brand-yellow text-brand-black text-sm font-bold hover:bg-brand-yellow hover:text-brand-black transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </section>

        <section className="landing-section-compact bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start">
              <div className="group relative bg-white border border-gray-100 shadow-sm hover:shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Content Area */}
                <div className="p-8 sm:p-10 flex flex-col h-full">
                  {/* Header: Category & Quote */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-bold tracking-widest uppercase">
                      {featuredItem.categoryName}
                    </span>
                    <i className="fa-solid fa-quote-right text-3xl text-brand-yellow/20 group-hover:text-brand-yellow/40 transition-colors" />
                  </div>

                  {/* Title: Tăng trải nghiệm đọc */}
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-black leading-[1.2] mb-6 group-hover:text-brand-yellow transition-colors duration-300">
                    &ldquo;{featuredItem.title}&rdquo;
                  </h2>

                  {/* Source Tag: Làm gọn lại */}
                  <div className="flex items-center justify-end gap-3 mb-8">
                    <span className="text-gray-400 text-xs font-medium italic">
                      Nguồn:
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-bold uppercase text-gray-600 tracking-tight">
                      {featuredItem.sourceName || "Truyền thông"}
                    </span>
                  </div>

                  {/* Link: Thêm hiệu ứng underline giả */}
                  <div className="mt-auto flex items-center justify-end">
                    <a
                      href={featuredItem.articleUrl || "#"}
                      className="inline-flex items-center gap-2 text-brand-black font-black text-sm tracking-wider group/link transition-all"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackPublicMediaMentionView(featuredItem.id)}
                    >
                      <span className="relative">
                        XEM BÀI GỐC
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover/link:w-full"></span>
                      </span>
                      <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center group-hover/link:bg-brand-yellow transition-colors">
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px] group-hover/link:text-white transition-colors" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Image: Thêm Overlay gradient nhẹ phía trên để tách biệt với nội dung */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent h-12 z-10" />
                  <img
                    src={resolveAssetUrl(featuredItem.thumbnailUrl) || featuredLogo}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    alt={featuredItem.title}
                  />
                  {/* Một lớp phủ màu khi hover giúp ảnh sâu hơn */}
                  <div className="absolute inset-0 bg-brand-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              <div className="space-y-6">
                {isSearching && (
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center text-gray-400 font-medium">
                    <i className="fa-solid fa-spinner fa-spin mr-2" />
                    Đang tìm kiếm...
                  </div>
                )}
                {!isSearching && displayList.length === 0 && (
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center text-gray-500 font-medium">
                    {searchFailed
                      ? "Tìm kiếm tạm thời không khả dụng, vui lòng thử lại."
                      : keyword
                      ? `Không tìm thấy kết quả nào cho "${keyword}".`
                      : "Đã hiển thị hết tin truyền thông."}
                  </div>
                )}
                {displayList.map((item) =>
                  (() => {
                    const itemLogo =
                      resolveAssetUrl(item.thumbnailUrl) || safeFallbackLogo;

                    return (
                      <a
                        key={item.id}
                        href={item.articleUrl || "#"}
                        className="group flex flex-row items-start gap-3 sm:gap-4 p-4 mb-0 rounded-3xl hover:bg-brand-light-gray transition-all border border-transparent hover:border-gray-100"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackPublicMediaMentionView(item.id)}
                      >
                        <div className="shrink-0 w-28 sm:w-36 aspect-video bg-white rounded-2xl overflow-hidden flex items-center justify-center border border-gray-200">
                          <img
                            src={itemLogo}
                            className="w-full h-full object-cover"
                            alt={item.sourceName || "Nguồn tin"}
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                            <span className="text-brand-yellow text-xs font-black tracking-widest uppercase">
                              {item.categoryName}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-xl font-extrabold text-brand-black mb-2 sm:mb-4 group-hover:text-brand-yellow transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm font-bold flex items-center gap-2 line-clamp-1">
                            Đọc bài tại {item.sourceName || "Nguồn báo chí"} •{" "}
                            {formatDate(item.publishedAt)}
                            <i className="fa-solid fa-arrow-right text-[10px]" />
                          </p>
                        </div>
                      </a>
                    );
                  })(),
                )}

                {displayList.length > 0 && (
                  <div className="pt-2 flex justify-center">
                    <NumberedPagination
                      page={pageNumber}
                      totalPages={totalPages}
                      disabled={isPaginating}
                      showWhenSinglePage
                      onPageChange={handlePageChange}
                    />
                  </div>
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
