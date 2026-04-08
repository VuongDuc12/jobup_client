"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import DynamicBanner from "@/components/shared/DynamicBanner";
import RichContent from "@/components/shared/RichContent";
import { Footer, Navbar } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import {
  fetchPublicArticleBySlug,
  fetchPublicArticles,
  fetchRelatedArticles,
  trackPublicArticleView,
} from "@/lib/api";
import { internalNewsArticles } from "@/lib/mockNews";
import type {
  PublicArticleListItemResponse,
  PublicArticleResponse,
} from "@/lib/types";
import { resolveAssetUrl } from "@/lib/utils";

function formatDate(value?: string | null): string {
  if (!value) return "Đang cập nhật";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Đang cập nhật";
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function fallbackArticleBySlug(slug: string): PublicArticleResponse | null {
  const item = internalNewsArticles.find((article) => article.slug === slug);
  if (!item) return null;

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    avatar: item.coverImage,
    summary: item.excerpt,
    content: item.content.map((paragraph) => `<p>${paragraph}</p>`).join(""),
    categoryName: item.category,
    categorySlug: null,
    authorName: item.authorName,
    authorAvatar: null,
    tags: item.tags,
    seoTitle: item.title,
    seoDescription: item.excerpt,
    isHot: item.id === "1",
    viewCount: 0,
    publishedAt: item.publishedAt,
  };
}

function fallbackRelated(currentId: string): PublicArticleListItemResponse[] {
  return internalNewsArticles
    .filter((item) => item.id !== currentId)
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      avatar: item.coverImage,
      summary: item.excerpt,
      categoryName: item.category,
      categorySlug: null,
      authorName: item.authorName,
      authorAvatar: item.authorAvatar || null,
      isHot: item.id === "1",
      viewCount: 0,
      publishedAt: item.publishedAt,
    }));
}

export default function InternalNewsDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const [article, setArticle] = useState<PublicArticleResponse | null>(null);
  const [related, setRelated] = useState<PublicArticleListItemResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    PublicArticleListItemResponse[]
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchRequestId = useRef(0);
  const viewTracked = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!slug) {
          throw new Error("Slug không hợp lệ");
        }

        const articleResult = await fetchPublicArticleBySlug(slug);

        if (!mounted) return;

        setArticle(articleResult);

        // Fetch related articles using the article's actual ID
        try {
          const relatedItems = await fetchRelatedArticles(articleResult.id, 5);
          if (mounted) setRelated(relatedItems);
        } catch {
          if (mounted) setRelated([]);
        }
      } catch {
        if (!mounted) return;
        const fallbackArticle = fallbackArticleBySlug(slug);
        if (!fallbackArticle) {
          setError("Không tìm thấy bài viết");
          setArticle(null);
          setRelated([]);
        } else {
          setArticle(fallbackArticle);
          setRelated(fallbackRelated(fallbackArticle.id));
        }
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [slug]);

  // Track article view once when article data is loaded
  useEffect(() => {
    if (article && !viewTracked.current) {
      viewTracked.current = true;
      trackPublicArticleView(article.id);
    }
  }, [article]);

  useEffect(() => {
    const keyword = searchQuery.trim();
    if (!keyword) {
      setSearchResults([]);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }

    const requestId = ++searchRequestId.current;
    setSearchLoading(true);
    setSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const searchResult = await fetchPublicArticles({
          Keyword: keyword,
          PageNumber: 1,
          PageSize: 5,
        });

        if (searchRequestId.current !== requestId) return;

        setSearchResults(
          searchResult.list.filter((item) => item.id !== article?.id),
        );
      } catch {
        if (searchRequestId.current !== requestId) return;
        setSearchResults([]);
        setSearchError("Không tìm thấy kết quả phù hợp.");
      } finally {
        if (searchRequestId.current !== requestId) return;
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, article?.id]);

  const contentHtml = useMemo(() => {
    if (!article) return "";
    return article.content && article.content.trim()
      ? article.content
      : `<p>${article.summary || "Đang cập nhật nội dung bài viết."}</p>`;
  }, [article]);

  const articleImage =
    resolveAssetUrl(article?.avatar) ||
    resolveAssetUrl(internalNewsArticles[0]?.coverImage) ||
    internalNewsArticles[0]?.coverImage ||
    "/images/news8.jpg";

  if (!loading && !article) {
    return (
      <>
        <Navbar />
        <main className="pt-24 landing-page-shell bg-brand-light-gray min-h-[50vh]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-lg font-bold text-brand-black mb-3">
              {error || "Không tìm thấy bài viết"}
            </p>
            <Link
              href="/tin-noi-bo"
              className="text-sm font-bold text-gray-500 hover:text-brand-black transition"
            >
              Quay lại danh sách tin nội bộ
            </Link>
          </div>
        </main>
        <Footer />
        <FloatingActions />
      </>
    );
  }

  const authorName = article?.authorName || "Ban biên tập JobUp";
  const authorAvatarRaw = article?.authorAvatar
    ? resolveAssetUrl(article.authorAvatar)
    : null;
  const authorAvatar =
    authorAvatarRaw ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName,
    )}&background=ffcc00&color=000&size=128`;

  return (
    <>
      <Navbar />
      <main className="pt-24 landing-page-shell bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 overflow-hidden">
            <Link
              href="/"
              className="hover:text-brand-yellow transition-colors shrink-0"
            >
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link
              href="/tin-noi-bo"
              className="hover:text-brand-yellow transition-colors shrink-0"
            >
              Tin nội bộ
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900 truncate font-semibold block max-w-[200px] sm:max-w-md">
              {article?.title || "Đang tải..."}
            </span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Article Content */}
            <article className="lg:col-span-8">
              {/* Header Info */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <span className="inline-flex items-center px-3 py-1 bg-brand-yellow/10 text-brand-black text-xs font-bold uppercase tracking-wider rounded-md border border-brand-yellow/20">
                    {article?.categoryName || "Tin tức"}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-xs"></i>
                    {formatDate(article?.publishedAt)}
                  </span>
                  {article?.viewCount ? (
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <i className="fa-regular fa-eye text-xs"></i>
                      {article.viewCount} lượt xem
                    </span>
                  ) : null}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-black leading-tight mb-8">
                  {article?.title || "Đang tải tiêu đề..."}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 border-y border-gray-100 py-4">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-sm">
                      {authorName}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      Đăng tải bởi Ban biên tập
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <i className="fa-brands fa-facebook-f text-sm"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-400 hover:bg-blue-100 transition-colors">
                      <i className="fa-brands fa-linkedin-in text-sm"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                      <i className="fa-regular fa-envelope text-sm"></i>
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="rounded-2xl overflow-hidden mb-10 shadow-sm relative aspect-video bg-gray-100">
                {loading ? (
                  <div className="absolute inset-0 animate-pulse bg-gray-200" />
                ) : (
                  <img
                    src={articleImage}
                    alt={article?.title || "Featured Image"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Summary/Excerpt */}
              {article?.summary && (
                <div className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed mb-10 pl-5 border-l-4 border-brand-yellow">
                  {article.summary}
                </div>
              )}

              {/* Content */}
              <RichContent
                html={contentHtml}
                className="leading-8 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-black [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-black [&_img]:my-8 [&_img]:shadow-md [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-yellow [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-900"
              />

              {/* Tags */}
              {article?.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
                  <span className="text-gray-400 font-medium text-sm mr-2 py-2">
                    Chủ đề:
                  </span>
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tin-noi-bo?tag=${tag}`}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </article>

            {/* Right Column: Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-6">
                {/* Search Widget */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">
                    Tìm kiếm bài viết
                  </h4>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Nhập từ khóa..."
                      className="w-full pl-5 pr-10 py-3 rounded-xl bg-white border border-gray-200 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none text-sm transition-all"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-black w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                      type="button"
                      aria-label="Tìm kiếm"
                    >
                      <i className="fa-solid fa-magnifying-glass text-sm" />
                    </button>
                  </div>

                  {searchQuery.trim() && (
                    <div className="mt-4 space-y-3">
                      {searchLoading ? (
                        <p className="text-xs text-gray-400">
                          Đang tìm kiếm...
                        </p>
                      ) : null}
                      {searchError ? (
                        <p className="text-xs text-gray-400">{searchError}</p>
                      ) : null}
                      {!searchLoading &&
                        !searchError &&
                        searchResults.length === 0 && (
                          <p className="text-xs text-gray-400">
                            Không có kết quả phù hợp.
                          </p>
                        )}

                      {searchResults.map((item) => {
                        const searchImage =
                          resolveAssetUrl(item.avatar) ||
                          resolveAssetUrl(
                            internalNewsArticles[0]?.coverImage,
                          ) ||
                          internalNewsArticles[0]?.coverImage ||
                          "/images/news8.jpg";

                        return (
                          <Link
                            key={item.id}
                            href={
                              item.slug
                                ? `/tin-noi-bo/${item.slug}`
                                : "/tin-noi-bo"
                            }
                            className="flex items-center gap-3 rounded-xl p-3 bg-white border border-transparent hover:border-gray-100 hover:shadow-sm transition-all"
                          >
                            <img
                              src={searchImage}
                              alt={item.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-brand-yellow uppercase tracking-wide">
                                {item.categoryName || "Tin tức"}
                              </p>
                              <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatDate(item.publishedAt)}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Related News Widget */}
                {related.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-gray-900 text-lg">
                        Tin liên quan
                      </h4>
                      <Link
                        href="/tin-noi-bo"
                        className="text-xs font-bold text-brand-yellow hover:text-brand-black uppercase tracking-wide"
                      >
                        Xem tất cả
                      </Link>
                    </div>

                    <div className="space-y-6">
                      {related.map((item) => {
                        const relatedImage =
                          resolveAssetUrl(item.avatar) ||
                          resolveAssetUrl(internalNewsArticles[0].coverImage) ||
                          internalNewsArticles[0].coverImage;

                        return (
                          <div
                            key={item.id}
                            className="group flex gap-4 items-start"
                          >
                            <Link
                              href={
                                item.slug
                                  ? `/tin-noi-bo/${item.slug}`
                                  : "/tin-noi-bo"
                              }
                              className="shrink-0 overflow-hidden rounded-lg w-20 h-20 bg-gray-100"
                            >
                              <img
                                src={relatedImage}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </Link>
                            <div>
                              <div className="text-[10px] font-bold text-brand-yellow uppercase tracking-wider mb-1">
                                {item.categoryName || "Tin tức"}
                              </div>
                              <h5 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug mb-1 group-hover:text-brand-yellow transition-colors">
                                <Link
                                  href={
                                    item.slug
                                      ? `/tin-noi-bo/${item.slug}`
                                      : "/tin-noi-bo"
                                  }
                                >
                                  {item.title}
                                </Link>
                              </h5>
                              <time className="text-gray-400 text-xs block">
                                {formatDate(item.publishedAt)}
                              </time>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <DynamicBanner
                  position="news_detail_sidebar"
                  variant="compact"
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
