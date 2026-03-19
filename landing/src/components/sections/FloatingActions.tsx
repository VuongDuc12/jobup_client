"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSystemConfig } from "@/hooks/useSystemConfig";

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { config } = useSystemConfig();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build Zalo link from systemConfig zaloUrl, fallback to hotline
  const zaloLink =
    config.zaloUrl && config.zaloUrl !== "#"
      ? config.zaloUrl
      : config.hotline
        ? `https://zalo.me/${config.hotline.replace(/\D/g, "")}`
        : "#";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end group">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Cuộn lên đầu trang"
        className={`w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-brand-yellow hover:text-black hover:-translate-y-1 focus:outline-none cursor-pointer ${
          showBackToTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <i className="fa-solid fa-arrow-up text-lg" />
      </button>

      {/* Zalo Chat */}
      <div className="relative flex items-center group/zalo pointer-events-none mb-2">
        {/* Elegant Arrow (Visible on Hover) */}
        <div className="absolute right-[110%] bottom-12 hidden lg:block opacity-0 group-hover/zalo:opacity-100 translate-x-4 group-hover/zalo:translate-x-0 transition-all duration-500 delay-100">
          <svg
            width="100"
            height="60"
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="elegant-arrow"
              d="M10,45 Q35,50 80,15"
              stroke="#0068FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M70,22 L80,15 L72,8"
              stroke="#0068FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="5"
              y="30"
              fill="#0068FF"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              className="text-[11px] font-extrabold italic opacity-70 tracking-[0.2em] uppercase"
            >
              Chat ngay
            </text>
          </svg>
        </div>

        {/* Sleek Zalo Pill */}
        <div className="zalo-pill absolute right-[105%] mr-6 px-5 py-3 rounded-2xl whitespace-nowrap flex items-center gap-3 opacity-0 group-hover/zalo:opacity-100 translate-x-6 group-hover/zalo:translate-x-0">
          <div className="flex items-center gap-2 border-r border-gray-100 pr-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-mini-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0068FF]" />
            </div>
            <span className="text-[#0068FF] text-[9px] font-black uppercase tracking-wider">
              Online
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#111827] text-xs font-bold leading-none mb-1">
              Tư vấn miễn phí 24/7
            </span>
            <span className="text-gray-400 text-[9px] font-medium leading-none">
              Hỗ trợ phản hồi tức thì
            </span>
          </div>
        </div>

        {/* Zalo Icon */}
        <a
          href={zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto relative block"
        >
          <div className="absolute -inset-2 bg-[#0068FF]/10 rounded-full animate-mini-ping group-hover:scale-150 transition-transform duration-700" />
          <div className="relative w-16 h-16 hover:scale-110 transition-all duration-300 drop-shadow-[0_8px_15px_rgba(0,104,255,0.2)]">
            <Image
              src="/Icon_of_Zalo.svg"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
              alt="Chat Zalo"
            />
          </div>
        </a>
      </div>

      {/* Hotline */}
      <a
        href={`tel:${config.hotline || "0979334143"}`}
        aria-label="Gọi hotline hỗ trợ"
        className="w-14 h-14 bg-gradient-to-tr from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
      >
        <i className="fa-solid fa-phone text-2xl" />
        <span className="absolute inset-0 rounded-full border-2 border-red-500 opacity-75 animate-mini-ping" />
      </a>
    </div>
  );
}
