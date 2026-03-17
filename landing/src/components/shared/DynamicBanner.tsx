"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import type { BannerPublicResponse } from "@/lib/types";
import {
  fetchBannerPublic,
  trackBannerView,
  trackBannerClick,
} from "@/lib/api";

type BannerVariant = "sidebar" | "spotlight" | "compact" | "infeed";

interface DynamicBannerProps {
  position: string;
  variant: BannerVariant;
}

const DEFAULT_BANNER_IMAGE = "/banner.jpg";

const DEFAULT_BANNER_BY_VARIANT: Record<BannerVariant, BannerPublicResponse> = {
  sidebar: {
    position: null,
    badgeText: "Headhunting",
    title: "Tìm việc",
    highlightText: "đúng người, đúng việc",
    description:
      "Đội ngũ chuyên gia JobUp kết nối bạn với những cơ hội phù hợp nhất.",
    buttonText: "Khám phá ngay",
    linkUrl: null,
    target: "_self",
    image: DEFAULT_BANNER_IMAGE,
    imageMobile: DEFAULT_BANNER_IMAGE,
  },
  spotlight: {
    position: null,
    badgeText: "Chương trình đặc biệt",
    title: "Ngày hội tuyển dụng",
    highlightText: "Big Tech 2026",
    description:
      "Cơ hội phỏng vấn trực tiếp với Google, Microsoft, VNG. Nhận Offer ngay tại sự kiện ngày mai.",
    buttonText: "ĐĂNG KÝ THAM GIA NGAY",
    linkUrl: null,
    target: "_self",
    image: DEFAULT_BANNER_IMAGE,
    imageMobile: DEFAULT_BANNER_IMAGE,
  },
  compact: {
    position: null,
    badgeText: "Nhận xét CV",
    title: "CV của bạn đã đủ tốt?",
    highlightText: null,
    description:
      "80% nhà tuyển dụng loại hồ sơ vì CV xấu. Để chuyên gia JobUp giúp bạn.",
    buttonText: "Review CV miễn phí",
    linkUrl: null,
    target: "_self",
    image: DEFAULT_BANNER_IMAGE,
    imageMobile: DEFAULT_BANNER_IMAGE,
  },
  infeed: {
    position: null,
    badgeText: null,
    title: "Cẩm nang sự nghiệp",
    highlightText: null,
    description:
      "Mẹo tối ưu CV, phỏng vấn và phát triển nghề nghiệp cùng JobUp.",
    buttonText: "Xem ngay",
    linkUrl: null,
    target: "_self",
    image: DEFAULT_BANNER_IMAGE,
    imageMobile: DEFAULT_BANNER_IMAGE,
  },
};

function resolveImage(path: string | null | undefined): string | null {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
}

function resolveBannerImage(path: string | null | undefined): string {
  if (!path) return DEFAULT_BANNER_IMAGE;
  if (path === DEFAULT_BANNER_IMAGE) return DEFAULT_BANNER_IMAGE;
  return resolveImage(path) || DEFAULT_BANNER_IMAGE;
}

function mergeBannerData(
  fallback: BannerPublicResponse,
  input: BannerPublicResponse | null,
): BannerPublicResponse {
  if (!input) return fallback;

  return {
    position: input.position ?? fallback.position,
    badgeText: input.badgeText ?? fallback.badgeText,
    title: input.title ?? fallback.title,
    highlightText: input.highlightText ?? fallback.highlightText,
    description: input.description ?? fallback.description,
    buttonText: input.buttonText ?? fallback.buttonText,
    linkUrl: input.linkUrl ?? fallback.linkUrl,
    target: input.target ?? fallback.target,
    image: input.image ?? fallback.image,
    imageMobile: input.imageMobile ?? fallback.imageMobile,
  };
}

/* ── Sidebar variant (home_sidebar, jobs_sidebar) ── */
function SidebarBanner({ data }: { data: BannerPublicResponse }) {
  const imgSrc = resolveBannerImage(data.image);
  const link = data.linkUrl?.trim();
  const target = data.target?.trim();

  return (
    <a
      href={link}
      target={link ? target : undefined}
      rel={link && target === "_blank" ? "noopener noreferrer" : undefined}
      className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-[360px] md:h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] group cursor-pointer border border-gray-100 block"
    >
      {imgSrc && (
        <img
          src={imgSrc}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          alt={data.title || "Banner"}
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/50 to-transparent flex flex-col justify-end p-5 md:p-8">
        {data.badgeText && (
          <div className="mb-4">
            <span className="px-4 py-1 bg-amber-400 text-[#111827] text-[10px] font-extrabold rounded-full tracking-wider uppercase shadow-lg shadow-amber-400/20">
              {data.badgeText}
            </span>
          </div>
        )}
        {data.title && (
          <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
            {data.title} <br />
            {data.highlightText && (
              <span className="text-amber-400">{data.highlightText}</span>
            )}
          </h3>
        )}
        {data.description && (
          <p className="text-gray-300 text-sm mb-6 leading-relaxed font-medium">
            {data.description}
          </p>
        )}
        {data.buttonText && (
          <div className="flex items-center gap-2 group/btn">
            <span className="h-0.5 w-8 bg-amber-400 transition-all duration-300 group-hover/btn:w-12" />
            <span className="text-white font-bold text-sm tracking-wide uppercase transition-colors group-hover/btn:text-amber-400">
              {data.buttonText}
            </span>
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </a>
  );
}

/* ── Spotlight variant (jobs_spotlight) ── */
function SpotlightBannerDynamic({ data }: { data: BannerPublicResponse }) {
  const imgSrc = resolveBannerImage(data.image);
  const link = data.linkUrl?.trim();
  const target = data.target?.trim();

  return (
    <a
      href={link}
      target={link ? target : undefined}
      rel={link && target === "_blank" ? "noopener noreferrer" : undefined}
      className="relative rounded-2xl overflow-hidden h-auto min-h-[280px] md:min-h-[320px] lg:h-[350px] group shadow-xl cursor-pointer block"
    >
      {imgSrc && (
        <img
          src={imgSrc}
          className="w-full h-full absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
          alt={data.title || "Spotlight Banner"}
          loading="lazy"
        />
      )}
      <div className="relative h-full bg-gradient-to-r from-black/95 via-black/60 to-transparent flex flex-col justify-center p-5 md:p-8 lg:p-14">
        {data.badgeText && (
          <span className="text-brand-yellow font-black uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-brand-yellow" /> {data.badgeText}
          </span>
        )}
        {data.title && (
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
            {data.title} <br />
            {data.highlightText && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-500">
                {data.highlightText}
              </span>
            )}
          </h3>
        )}
        {data.description && (
          <p className="text-gray-200 mb-8 max-w-lg text-base lg:text-lg font-medium leading-relaxed opacity-90">
            {data.description}
          </p>
        )}
        {data.buttonText && (
          <span className="bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-black w-fit hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20 inline-block">
            {data.buttonText}
          </span>
        )}
      </div>
    </a>
  );
}

/* ── Compact variant (jobs_sidebar / CV Review CTA) ── */
function CompactBanner({ data }: { data: BannerPublicResponse }) {
  const imgSrc = resolveBannerImage(data.image);
  const link = data.linkUrl?.trim();
  const target = data.target?.trim();

  return (
    <a
      href={link}
      target={link ? target : undefined}
      rel={link && target === "_blank" ? "noopener noreferrer" : undefined}
      className="relative overflow-hidden rounded-[2rem] border border-brand-yellow p-6 text-brand-black shadow-lg block"
    >
      <img
        src={imgSrc}
        alt={data.title || "Banner"}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/75 via-white/80 to-white/90" />
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-yellow blur-2xl" />
      <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-brand-yellow blur-2xl" />
      <div className="relative z-10">
        {data.badgeText && (
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-yellow bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
            {data.badgeText}
          </span>
        )}
        {data.title && (
          <h3 className="text-xl font-black mt-4 mb-2">
            {data.title}
            {data.highlightText && (
              <span className="text-amber-600"> {data.highlightText}</span>
            )}
          </h3>
        )}
        {data.description && (
          <p className="text-sm font-medium text-gray-700 mb-5">
            {data.description}
          </p>
        )}
        {data.buttonText && (
          <span className="w-full py-3 bg-brand-black text-white font-black rounded-xl shadow-md hover:bg-brand-yellow hover:text-brand-black transition-all flex items-center justify-center gap-2">
            <i className="fa-solid fa-wand-magic-sparkles" /> {data.buttonText}
          </span>
        )}
      </div>
    </a>
  );
}

/* ── In-feed variant (jobs_infeed) ── */
function InFeedBannerDynamic({ data }: { data: BannerPublicResponse }) {
  const imgSrc = resolveBannerImage(data.image);
  const link = data.linkUrl?.trim();
  const target = data.target?.trim();

  return (
    <a
      href={link}
      target={link ? target : undefined}
      rel={link && target === "_blank" ? "noopener noreferrer" : undefined}
      className="my-6 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md block"
    >
      <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 relative overflow-hidden">
        <img
          src={imgSrc}
          alt={data.title || "Banner"}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/85 to-indigo-800/85" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl md:text-2xl shrink-0">
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <div className="text-white">
            {data.title && (
              <h4 className="font-bold text-base md:text-xl uppercase tracking-wide">
                {data.title}
              </h4>
            )}
            {data.description && (
              <p className="text-blue-100 text-sm">{data.description}</p>
            )}
          </div>
        </div>
        {data.buttonText && (
          <span className="relative z-10 bg-white text-blue-700 px-5 md:px-6 py-2.5 rounded-full font-bold shadow-lg hover:scale-105 transition-transform whitespace-nowrap inline-block text-sm md:text-base">
            {data.buttonText}
          </span>
        )}
      </div>
    </a>
  );
}

const skeletonClass: Record<BannerVariant, string> = {
  sidebar: "rounded-[24px] md:rounded-[32px] h-[360px] md:h-[420px]",
  spotlight: "rounded-2xl min-h-[280px] md:min-h-[320px] lg:h-[350px]",
  compact: "rounded-[2rem] h-[220px]",
  infeed: "rounded-2xl h-[100px]",
};

/* ── Main Component ── */
export default function DynamicBanner({
  position,
  variant,
}: DynamicBannerProps) {
  const [data, setData] = useState<BannerPublicResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const viewTracked = useRef(false);

  useEffect(() => {
    fetchBannerPublic(position)
      .then((result) => {
        setData(result);
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [position]);

  // Track view once when banner data is loaded
  useEffect(() => {
    if (data && !viewTracked.current) {
      viewTracked.current = true;
      trackBannerView(position);
    }
  }, [data, position]);

  const handleClick = () => {
    trackBannerClick(position);
  };

  // Still loading — show skeleton matching banner dimensions (no content flash)
  if (!loaded) {
    return (
      <div
        className={`w-full animate-pulse bg-gray-200 ${skeletonClass[variant]}`}
      />
    );
  }

  const fallbackData = DEFAULT_BANNER_BY_VARIANT[variant];
  const bannerData = mergeBannerData(fallbackData, data);

  const banner = (() => {
    switch (variant) {
      case "sidebar":
        return <SidebarBanner data={bannerData} />;
      case "spotlight":
        return <SpotlightBannerDynamic data={bannerData} />;
      case "compact":
        return <CompactBanner data={bannerData} />;
      case "infeed":
        return <InFeedBannerDynamic data={bannerData} />;
      default:
        return null;
    }
  })();

  return <div onClick={handleClick}>{banner}</div>;
}
