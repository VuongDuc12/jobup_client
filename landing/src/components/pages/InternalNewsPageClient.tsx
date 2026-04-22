"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Footer, Navbar } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import SectionHeader from "@/components/shared/SectionHeader";
import NumberedPagination from "@/components/shared/NumberedPagination";
import { internalNewsArticles } from "@/lib/mockNews";
import { fetchPublicArticles, fetchPublicNewsCategories } from "@/lib/api";
import { resolveAssetUrl } from "@/lib/utils";
import type {
  PublicArticleListItemResponse,
  PublicNewsCategoryResponse,
} from "@/lib/types";

type CategoryPill = {
  id: string | null;
  label: string;
};

const defaultCategoryPills: CategoryPill[] = [
  { id: null, label: "Tất cả bài viết" },
  { id: "mock-cv", label: "Kỹ năng viết CV" },
  { id: "mock-interview", label: "Kinh nghiệm phỏng vấn" },
];

function formatDate(value?: string | null): string {
  if (!value) return "Đang cập nhật";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Đang cập nhật";
  return date.toLocaleDateString("vi-VN");
}

function fallbackArticleList(): PublicArticleListItemResponse[] {
  return internalNewsArticles.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    avatar: item.coverImage,
    summary: item.excerpt,
    categoryName: item.category,
    categorySlug: null,
    authorName: "JobUp",
    authorAvatar: null,
    isHot: item.id === "1",
    viewCount: 0,
    publishedAt: item.publishedAt,
  }));
}

export default function InternalNewsPage() {
  const PAGE_SIZE = 6;
  const safeFallbackCover =
    internalNewsArticles[0]?.coverImage ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='28'%3EJobUp News%3C/text%3E%3C/svg%3E";

  const fallbackItems = useMemo(() => fallbackArticleList(), []);
  const [featured, setFeatured] =
    useState<PublicArticleListItemResponse | null>(fallbackItems[0] || null);
  const [others, setOthers] = useState<PublicArticleListItemResponse[]>(
    fallbackItems.slice(1),
  );
  const [categoryPills, setCategoryPills] = useState<CategoryPill[]>([
    ...defaultCategoryPills,
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [initialCategorySlug, setInitialCategorySlug] = useState<string | null>(
    null,
  );
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("jobup_news_filters");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as {
        categoryId?: string | null;
        categorySlug?: string | null;
      };
      if (parsed.categoryId) {
        setSelectedCategoryId(parsed.categoryId);
        setPageNumber(1);
      }
      if (parsed.categorySlug) {
        setInitialCategorySlug(parsed.categorySlug);
      }
    } catch {
      // no-op
    } finally {
      sessionStorage.removeItem("jobup_news_filters");
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const [featuredResult, categoryResult] = await Promise.all([
          fetchPublicArticles({
            PageNumber: 1,
            PageSize: 1,
            IsHot: true,
          }),
          fetchPublicNewsCategories(),
        ]);

        if (!mounted) return;

        const featuredArticle = featuredResult.list[0];
        setFeatured(featuredArticle || fallbackItems[0] || null);

        const safeCategories = Array.isArray(categoryResult)
          ? categoryResult
          : [];

        const apiPills: CategoryPill[] = safeCategories
          .slice(0, 3)
          .map((item: PublicNewsCategoryResponse) => ({
            id: item.id,
            label: item.name,
          }))
          .filter((item) => Boolean(item.label?.trim()));

        if (initialCategorySlug) {
          const matchedCategory = safeCategories.find(
            (item) => item.slug === initialCategorySlug,
          );
          if (matchedCategory) {
            setSelectedCategoryId(matchedCategory.id);
            setPageNumber(1);
          }
        }

        if (apiPills.length > 0) {
          setCategoryPills([
            { id: null, label: "Tất cả bài viết" },
            ...apiPills,
          ]);
        } else {
          setCategoryPills([...defaultCategoryPills]);
        }
      } catch {
        if (!mounted) return;
        setFeatured(fallbackItems[0] || null);
        setOthers(fallbackItems.slice(1));
        setCategoryPills([...defaultCategoryPills]);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fallbackItems, initialCategorySlug]);

  useEffect(() => {
    let mounted = true;

    const loadCategoryArticles = async () => {
      const isFirstPage = pageNumber === 1;
      if (!isFirstPage) setIsPaginating(true);

      try {
        const articleResult = await fetchPublicArticles({
          PageNumber: pageNumber,
          PageSize: PAGE_SIZE,
          Keyword: keyword || undefined,
          NewsCategoryId: selectedCategoryId || undefined,
        });

        if (!mounted) return;
        const nextList = articleResult.list || [];
        setOthers(nextList);
        setTotalPages(Math.max(articleResult.totalPages || 1, 1));
      } catch {
        if (!mounted) return;
        if (isFirstPage) {
          setOthers(fallbackItems);
          setTotalPages(1);
        }
      } finally {
        if (!mounted) return;
        if (!isFirstPage) setIsPaginating(false);
      }
    };

    loadCategoryArticles();

    return () => {
      mounted = false;
    };
  }, [fallbackItems, selectedCategoryId, keyword, pageNumber]);

  const handleSearch = () => {
    setPageNumber(1);
    setKeyword(keywordInput.trim());
  };

  const handleCategoryChange = (id: string | null) => {
    setSelectedCategoryId(id);
    setPageNumber(1);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage === pageNumber || nextPage < 1 || nextPage > totalPages)
      return;
    setPageNumber(nextPage);
  };

  const featuredLink = useMemo(() => {
    if (!featured?.slug) return "/tin-noi-bo";
    return `/tin-noi-bo/${featured.slug}`;
  }, [featured?.slug]);

  const featuredImage = resolveAssetUrl(featured?.avatar) || safeFallbackCover;

  return (
    <>
      <Navbar />
      <main className="pt-20 landing-page-shell-tight">
        <section className="landing-section bg-brand-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <Link
                href={featuredLink}
                className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group block"
              >
                <img
                  src={featuredImage}
                  alt={featured?.title || "Bài viết nổi bật"}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 pt-14 md:pt-20 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent text-left">
                  <span className="inline-block px-4 py-1.5 bg-brand-yellow text-brand-black text-xs font-black rounded-full mb-4">
                    BÀI VIẾT NỔI BẬT
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                    {featured?.title || "Đang cập nhật bài viết"}
                  </h2>
                </div>
              </Link>

              <div>
                <SectionHeader
                  badge="Góc chuyên gia JobUp"
                  title={
                    <>
                      Nơi chia sẻ kiến thức{" "}
                      <span className="text-brand-yellow">vươn tầm</span> sự
                      nghiệp
                    </>
                  }
                  description="Chúng tôi tin rằng kiến thức chính là bệ phóng vững chắc nhất. Tại JobUp, chúng tôi tổng hợp những kinh nghiệm thực chiến từ chuyên gia nhân sự và các bài học quản trị đắt giá."
                  align="left"
                  headingTag="h1"
                  className="mb-6 md:mb-7"
                  titleClassName="text-3xl font-black leading-tight text-brand-black md:text-5xl"
                  descriptionClassName="text-base md:text-lg !text-justify [text-justify:inter-word]"
                />
                <div className="mb-4 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative w-full">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      value={keywordInput}
                      onChange={(event) => setKeywordInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") handleSearch();
                      }}
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-brand-yellow"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-brand-black text-white text-sm font-bold hover:bg-brand-yellow hover:text-brand-black transition-colors"
                  >
                    Tìm kiếm
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {categoryPills.map((pill) => (
                    <button
                      key={pill.id || pill.label}
                      type="button"
                      onClick={() => handleCategoryChange(pill.id)}
                      className={`px-6 py-2.5 rounded-full text-sm font-bold border shadow-soft transition-colors ${
                        selectedCategoryId === pill.id
                          ? "bg-brand-yellow text-brand-black border-brand-yellow"
                          : "bg-white text-gray-500 border-gray-100"
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section-compact bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {others.map((article) =>
                (() => {
                  const cardImage =
                    resolveAssetUrl(article.avatar) || safeFallbackCover;
                  const authorAvatar = resolveAssetUrl(article.authorAvatar);

                  return (
                    <article
                      key={article.id}
                      className="bg-white border border-gray-100 p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-300 hover:-translate-y-2 hover:border-brand-yellow hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]"
                    >
                      <Link
                        href={
                          article.slug
                            ? `/tin-noi-bo/${article.slug}`
                            : "/tin-noi-bo"
                        }
                        className="block"
                      >
                        <div className="relative aspect-[4/3] rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden mb-5 md:mb-6">
                          <img
                            src={cardImage}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-brand-black text-[10px] font-black rounded-lg shadow-sm uppercase">
                              {article.categoryName}
                            </span>
                          </div>
                        </div>

                        <div className="px-2">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <i className="fa-regular fa-clock" /> 5 phút đọc
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <i className="fa-regular fa-eye" />{" "}
                              {(article.viewCount ?? 0).toLocaleString("vi-VN")}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <i className="fa-regular fa-calendar" />{" "}
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>
                          <div className="relative group/title mb-4">
                            <h3 className="text-xl md:text-2xl font-black text-brand-black leading-snug hover:text-brand-yellow transition-colors line-clamp-2">
                              {article.title}
                            </h3>

                            <div className="pointer-events-none absolute left-0 right-0 -top-3 -translate-y-full z-30 opacity-0 group-hover/title:opacity-100 transition-opacity duration-200 hidden md:block">
                              <div className="rounded-xl bg-brand-black text-white text-sm font-bold leading-snug p-3 shadow-2xl border border-brand-yellow/30">
                                {article.title}
                              </div>
                              <div className="ml-5 h-2.5 w-2.5 rotate-45 bg-brand-black border-r border-b border-brand-yellow/30" />
                            </div>
                          </div>
                          <p className="text-gray-500 line-clamp-2 mb-6 text-sm">
                            {article.summary ||
                              "Đang cập nhật nội dung bài viết."}
                          </p>
                          <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                            {authorAvatar ? (
                              <img
                                src={authorAvatar}
                                alt={article.authorName || "Tác giả"}
                                className="w-8 h-8 rounded-full border border-gray-100 object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full border border-gray-100 bg-brand-black text-white flex items-center justify-center text-[10px] font-black">
                                {(article.authorName || "JobUp")
                                  .trim()
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}
                            <span className="text-xs font-bold text-gray-600">
                              Bởi {article.authorName || "JobUp"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })(),
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <NumberedPagination
                page={pageNumber}
                totalPages={totalPages}
                disabled={isPaginating}
                showWhenSinglePage
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
