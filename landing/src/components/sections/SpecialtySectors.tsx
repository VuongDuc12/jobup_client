"use client";

import Link from "next/link";
import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { fetchPublicJobCategories } from "@/lib/api";
import { API_BASE_URL } from "@/lib/config";
import type { JobCategoryTreeItem } from "@/lib/types";

export default function SpecialtySectors() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<JobCategoryTreeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicJobCategories()
      .then((data) => setCategories(data ?? []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const scrollNext = useCallback(() => {
    trackRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  }, []);

  const scrollPrev = useCallback(() => {
    trackRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  }, []);

  return (
    <section
      id="services"
      className="max-w-[100vw] overflow-hidden py-14 bg-[#F5F5F4] relative"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[#B45309] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
          Lĩnh vực chuyên môn
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-3">
          Khám phá cơ hội <span className="text-brand-yellow">Tiềm Năng</span>
        </h2>
        <p className="text-gray-500 text-base max-w-2xl mx-auto mb-6">
          Tìm kiếm vị trí phù hợp với thế mạnh của bạn trong hơn 24+ lĩnh vực
          khác nhau.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={scrollPrev}
            aria-label="Cuộn danh mục sang trái"
            className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#111827] hover:text-white hover:border-[#111827] transition-all duration-300 cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Cuộn danh mục sang phải"
            className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-[#F0B429] hover:text-[#111827] transition-all duration-300 cursor-pointer"
          >
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute top-0 left-0 w-8 md:w-32 h-full bg-gradient-to-r from-[#F5F5F4] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 md:w-32 h-full bg-gradient-to-l from-[#F5F5F4] to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 md:px-[max(1rem,calc((100vw-80rem)/2))] snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="snap-center shrink-0 w-[300px] md:w-[380px]"
                >
                  <div className="h-[440px] rounded-[2.5rem] bg-gray-200 animate-pulse" />
                </div>
              ))
            : categories.map((cat) => {
                const tags = cat.tag
                  ? cat.tag
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  : [];
                const resolvedBg = cat.backgroundImage
                  ? cat.backgroundImage.startsWith("http")
                    ? cat.backgroundImage
                    : `${API_BASE_URL}${cat.backgroundImage}`
                  : null;

                return (
                  <div
                    key={cat.id}
                    className="snap-center shrink-0 w-[300px] md:w-[380px] group"
                  >
                    <Link
                      href="/tuyen-dung"
                      className="block h-[440px] rounded-[2.5rem] relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                    >
                      {resolvedBg ? (
                        <Image
                          src={resolvedBg}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 300px, 380px"
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)",
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="relative z-10 h-full flex flex-col justify-end p-8">
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/20 backdrop-blur-md text-[10px] font-bold text-white rounded-full border border-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {cat.name}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                          {cat.description ??
                            "Khám phá các cơ hội việc làm hấp dẫn trong lĩnh vực này."}
                        </p>
                        <div className="flex items-center justify-between w-full py-3.5 px-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 group-hover:bg-white transition-all duration-300">
                          <span className="font-bold text-sm text-white group-hover:text-[#111827]">
                            Xem {cat.jobCount.toLocaleString("vi-VN")} jobs
                          </span>
                          <i className="fa-solid fa-arrow-right text-white group-hover:text-[#111827] -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}

          {/* View All Card */}
          <div className="snap-center shrink-0 w-[220px] flex items-center justify-center">
            <Link
              href="/tuyen-dung"
              className="group flex flex-col items-center gap-4 text-center py-8"
            >
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-[#F0B429] group-hover:text-[#F0B429] group-hover:bg-amber-50 transition-all duration-300 bg-white shadow-sm">
                <i className="fa-solid fa-arrow-right text-2xl transform group-hover:translate-x-2 transition-transform" />
              </div>
              <span className="font-bold text-gray-600 group-hover:text-[#111827] transition-colors text-sm">
                Xem tất cả <br />
                24+ Lĩnh vực
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="md:hidden flex justify-center mt-4 gap-1">
        <span className="w-8 h-1 bg-gray-300 rounded-full" />
        <span className="w-2 h-1 bg-gray-200 rounded-full" />
        <span className="w-2 h-1 bg-gray-200 rounded-full" />
      </div>
    </section>
  );
}
