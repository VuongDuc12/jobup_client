import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import type { PublicArticleListItemResponse } from "@/lib/types";
import { getAssetUrl } from "@/lib/utils";

/* ─── Fallback data (shown when API returns nothing) ─── */
const fallbackHighlight = {
  title: "Chào đón thành viên thứ 200 gia nhập đại gia đình JobUp",
  image:
    "/images/news-main.jpg",
  category: "Tin tiêu biểu",
  date: "20/05/2026",
  slug: "#",
};

const fallbackSideNews = [
  {
    image:
      "/images/news-event.jpg",
    category: "Sự kiện",
    title: "Team Building 2026: Vượt Sóng Cùng JobUp tại Phú Quốc",
    date: "15/05/2026",
    slug: "#",
  },
  {
    image:
      "/images/news-meeting.jpg",
    category: "Hoạt động chuyên môn",
    title: "Workshop: Ứng dụng AI trong tối ưu hóa quy trình HR",
    date: "12/05/2026",
    slug: "#",
  },
  {
    image:
      "/images/news-community.jpg",
    category: "Văn hóa",
    title: "Happy Friday: Gắn kết tình thân giữa các phòng ban",
    date: "08/05/2026",
    slug: "#",
  },
];

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const CATEGORY_COLORS = [
  "text-blue-600",
  "text-green-600",
  "text-purple-600",
  "text-orange-600",
];

interface NewsSectionProps {
  articles?: PublicArticleListItemResponse[] | null;
}

export default function NewsSection({ articles }: NewsSectionProps) {
  const hasData = articles && articles.length > 0;
  const highlight = hasData ? articles[0] : null;
  const sides = hasData ? articles.slice(1) : null;

  return (
    <section id="news" className="landing-section relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center pb-6 md:pb-10 lg:pb-12">
          <SectionHeader
            badge="Tin tức & Hoạt động"
            title={
              <>
                Cập nhật mới nhất từ <span className="text-brand-yellow">Gia đình JobUp</span>
              </>
            }
            description="Những sự kiện, văn hoá và workshop chuyển đổi số nổi bật nhất tháng này."
            align="center"
            className="mb-4"
            titleClassName="text-gray-900"
            descriptionClassName="text-base"
          />
          <Link
            href="/tin-noi-bo"
            className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-brand-yellow-hover transition"
          >
            Xem tất cả tin tức <i className="fa-solid fa-arrow-right-long" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
          {/* Highlighted Post */}
          <Link
            href={
              highlight?.slug
                ? `/tin-noi-bo/${highlight.slug}`
                : fallbackHighlight.slug
            }
            className="lg:col-span-8 group cursor-pointer"
          >
            <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl">
              <Image
                src={
                  (highlight && getAssetUrl(highlight.avatar)) ||
                  fallbackHighlight.image
                }
                alt={highlight?.title || fallbackHighlight.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="px-3 py-1 bg-brand-yellow text-brand-black text-[10px] font-bold rounded-full uppercase mb-4 inline-block">
                  {highlight?.categoryName || fallbackHighlight.category}
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-brand-yellow transition">
                  {highlight?.title || fallbackHighlight.title}
                </h3>
                <div className="flex items-center gap-4 text-gray-300 text-sm font-medium">
                  <span>
                    <i className="fa-regular fa-calendar mr-2" />
                    {highlight
                      ? formatDate(highlight.publishedAt)
                      : fallbackHighlight.date}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Side News */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {(sides || fallbackSideNews).map((news, idx) => {
              const isApi = "id" in news;
              const imgSrc = isApi
                ? getAssetUrl((news as PublicArticleListItemResponse).avatar) ||
                  fallbackSideNews[0].image
                : (news as (typeof fallbackSideNews)[0]).image;
              const title = isApi
                ? (news as PublicArticleListItemResponse).title
                : (news as (typeof fallbackSideNews)[0]).title;
              const category = isApi
                ? (news as PublicArticleListItemResponse).categoryName
                : (news as (typeof fallbackSideNews)[0]).category;
              const date = isApi
                ? formatDate(
                    (news as PublicArticleListItemResponse).publishedAt,
                  )
                : (news as (typeof fallbackSideNews)[0]).date;
              const href = isApi
                ? `/tin-noi-bo/${(news as PublicArticleListItemResponse).slug}`
                : "#";

              return (
                <Link
                  key={isApi ? (news as PublicArticleListItemResponse).id : idx}
                  href={href}
                  className="group flex gap-4 cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md relative">
                    <Image
                      src={imgSrc!}
                      alt={title}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-bold ${CATEGORY_COLORS[idx % CATEGORY_COLORS.length]} uppercase mb-1 block`}
                    >
                      {category}
                    </span>
                    <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-brand-yellow-hover transition">
                      {title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">
                      {date}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
