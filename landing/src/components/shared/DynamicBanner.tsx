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
  fallback?: React.ReactNode;
}

function resolveImage(path: string | null | undefined): string | null {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
}

/* ── Sidebar variant (home_sidebar, jobs_sidebar) ── */
function SidebarBanner({ data }: { data: BannerPublicResponse }) {
  const imgSrc = resolveImage(data.image);
  const link = data.linkUrl || "#";
  const target = data.target || "_self";

  return (
    <a
      href={link}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
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
  const imgSrc = resolveImage(data.image);
  const link = data.linkUrl || "#";
  const target = data.target || "_self";

  return (
    <a
      href={link}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
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
  const link = data.linkUrl || "#";
  const target = data.target || "_self";

  return (
    <a
      href={link}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="relative overflow-hidden rounded-[2rem] border border-brand-yellow bg-gradient-to-br from-brand-yellow via-white to-white p-6 text-brand-black shadow-lg block"
    >
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
  const link = data.linkUrl || "#";
  const target = data.target || "_self";

  return (
    <a
      href={link}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="my-6 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md block"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 relative overflow-hidden">
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
  fallback,
}: DynamicBannerProps) {
  const [data, setData] = useState<BannerPublicResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const viewTracked = useRef(false);

  useEffect(() => {
    fetchBannerPublic(position).then((result) => {
      setData(result);
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

  // No API data — show fallback (original hardcoded content)
  if (!data) return fallback || null;

  const banner = (() => {
    switch (variant) {
      case "sidebar":
        return <SidebarBanner data={data} />;
      case "spotlight":
        return <SpotlightBannerDynamic data={data} />;
      case "compact":
        return <CompactBanner data={data} />;
      case "infeed":
        return <InFeedBannerDynamic data={data} />;
      default:
        return fallback || null;
    }
  })();

  return <div onClick={handleClick}>{banner}</div>;
}
