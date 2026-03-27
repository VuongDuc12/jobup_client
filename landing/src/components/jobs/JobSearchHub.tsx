"use client";

import { useMemo, useState } from "react";

const broadcasts = [
  "🔥 JobUp đồng hành cùng Ngày hội định hướng nghề nghiệp và kết nối việc làm cho Sinh viên 2026 ",
  "🚀 Top 100+ việc làm hot hôm nay",
  "✨ Liên hệ ngay đội ngũ JobUp để được tư vấn việc làm tận tình 24/7",
];

const hotTags = ["Kinh doanh", "Bán hàng", "Giao hàng", "Part-time"];

interface JobSearchHubProps {
  keyword: string;
  provinceId: string;
  provinces: { id: string; name: string; sortOrder: number }[];
  categories: { id: string; name: string; depth: number }[];
  categoryId: string;
  salaryFrom: string;
  salaryTo: string;
  experience: string;
  workType: string;
  sortBy: string;
  onKeywordChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSalaryFromChange: (value: string) => void;
  onSalaryToChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  onWorkTypeChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSearch: () => void;
}

export default function JobSearchHub({
  keyword,
  provinceId,
  provinces,
  categories,
  categoryId,
  salaryFrom,
  salaryTo,
  experience,
  workType,
  sortBy,
  onKeywordChange,
  onProvinceChange,
  onCategoryChange,
  onSalaryFromChange,
  onSalaryToChange,
  onExperienceChange,
  onWorkTypeChange,
  onSortByChange,
  onSearch,
}: JobSearchHubProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const broadcastDate = useMemo(
    () =>
      new Date().toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      }),
    [],
  );

  const formatSalaryInput = (value: string) => {
    const digits = value.replace(/[^0-9]/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="mb-10">
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
        {/* Live Broadcast Bar */}
        <div className="absolute top-0 inset-x-0 z-20 bg-white/10 backdrop-blur-md border-b border-white/10 py-3 overflow-hidden">
          <div className="px-8 flex items-center gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow" />
              </span>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                Live Broadcast
              </span>
            </div>
            <div className="flex-grow whitespace-nowrap overflow-hidden relative">
              <div className="animate-loop-scroll flex items-center gap-12 text-[12px] font-bold text-white/80">
                {broadcasts.map((text, idx) => (
                  <span
                    key={idx}
                    className={
                      idx === broadcasts.length - 1 ? "text-brand-yellow" : ""
                    }
                  >
                    {text}
                  </span>
                ))}
                {/* Separator dots */}
                {broadcasts.map((text, idx) => (
                  <span key={`sep-${idx}`}>
                    <span className="w-1 h-1 bg-white/20 rounded-full inline-block mx-2" />
                    <span
                      className={
                        idx === broadcasts.length - 1 ? "text-brand-yellow" : ""
                      }
                    >
                      {text}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-[10px] font-black text-white/60">
              <span className="bg-black/20 px-3 py-1 rounded-full uppercase">
                {broadcastDate}
              </span>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover"
            alt="Search Background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-black/90 via-brand-black/70 to-brand-black/40" />
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-yellow/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 lg:p-14 pt-16 lg:pt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Tìm việc làm{" "}
                <span className="text-brand-yellow drop-shadow-[0_0_15px_rgba(255,193,7,0.3)]">
                  phù hợp nhất
                </span>
              </h2>
              <p className="text-white/80 text-sm lg:text-lg font-bold flex items-center gap-3 mt-3">
                <span className="w-12 h-1 bg-brand-yellow rounded-full" />
                1000+ tin tuyển dụng đã xác thực
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-brand-yellow text-white hover:text-brand-black backdrop-blur-lg border border-white/30 rounded-full text-xs font-black transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <i className="fa-solid fa-sliders" /> Lọc nâng cao
            </button>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-4 items-stretch"
          >
            {/* Keyword Input */}
            <div className="flex-grow relative group">
              <input
                type="text"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                placeholder="Tên công việc, công ty hoặc kỹ năng..."
                className="w-full pl-14 pr-6 py-4 bg-white/10 hover:bg-white/20 focus:bg-white rounded-2xl border-2 border-white/20 focus:border-brand-yellow focus:outline-none transition-all text-white focus:text-gray-900 font-bold placeholder:text-white/60 backdrop-blur-md"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white group-focus-within:text-brand-yellow transition-colors text-lg drop-shadow-md z-10 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass" />
              </div>
            </div>

            {/* Location Select */}
            <div className="w-full lg:w-64 relative group">
              <select
                value={provinceId}
                onChange={(e) => onProvinceChange(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-white/10 hover:bg-white/20 focus:bg-white rounded-2xl border-2 border-white/20 focus:border-brand-yellow focus:outline-none transition-all text-white focus:text-gray-900 font-black appearance-none cursor-pointer backdrop-blur-md"
              >
                <option className="text-gray-900" value="">
                  Tất cả địa điểm
                </option>
                {provinces
                  .slice()
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((province) => (
                    <option
                      key={province.id}
                      className="text-gray-900"
                      value={province.id}
                    >
                      {province.name}
                    </option>
                  ))}
              </select>
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white group-focus-within:text-brand-yellow transition-colors text-lg drop-shadow-md z-10 pointer-events-none">
                <i className="fa-solid fa-location-dot" />
              </div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white drop-shadow-sm z-10">
                <i className="fa-solid fa-chevron-down text-[10px]" />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-brand-yellow text-brand-black px-12 py-4 rounded-2xl font-black hover:bg-white transition-all transform hover:scale-[1.03] shadow-[0_10px_20px_rgba(255,193,7,0.3)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              TÌM KIẾM{" "}
              <i className="fa-solid fa-magnifying-glass-plus text-lg" />
            </button>
          </form>

          {showAdvanced && (
            <div className="mt-6 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/80">
                    Ngành nghề
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
                  >
                    <option className="text-gray-900" value="">
                      Tất cả ngành nghề
                    </option>
                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        className="text-gray-900"
                        value={cat.id}
                      >
                        {`${"— ".repeat(cat.depth)}${cat.name}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/80">
                    Mức lương (VNĐ)
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={salaryFrom}
                      onChange={(e) =>
                        onSalaryFromChange(formatSalaryInput(e.target.value))
                      }
                      placeholder="Từ"
                      className="w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white placeholder:text-white/60 focus:border-brand-yellow focus:outline-none"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={salaryTo}
                      onChange={(e) =>
                        onSalaryToChange(formatSalaryInput(e.target.value))
                      }
                      placeholder="Đến"
                      className="w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white placeholder:text-white/60 focus:border-brand-yellow focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/80">
                    Kinh nghiệm
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => onExperienceChange(e.target.value)}
                    className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
                  >
                    <option className="text-gray-900" value="">
                      Tất cả mức kinh nghiệm
                    </option>
                    <option className="text-gray-900" value="0">
                      Chưa có kinh nghiệm
                    </option>
                    <option className="text-gray-900" value="1">
                      Dưới 1 năm
                    </option>
                    <option className="text-gray-900" value="2">
                      1-3 năm
                    </option>
                    <option className="text-gray-900" value="3">
                      3-5 năm
                    </option>
                    <option className="text-gray-900" value="4">
                      Trên 5 năm
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/80">
                    Hình thức làm việc
                  </label>
                  <select
                    value={workType}
                    onChange={(e) => onWorkTypeChange(e.target.value)}
                    className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
                  >
                    <option className="text-gray-900" value="">
                      Tất cả hình thức
                    </option>
                    <option className="text-gray-900" value="0">
                      Full-time
                    </option>
                    <option className="text-gray-900" value="1">
                      Part-time
                    </option>
                    <option className="text-gray-900" value="2">
                      Hợp đồng
                    </option>
                    <option className="text-gray-900" value="3">
                      Freelance
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/80">
                    Sắp xếp
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}
                    className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
                  >
                    <option className="text-gray-900" value="newest">
                      Mới nhất
                    </option>
                    <option className="text-gray-900" value="salary_desc">
                      Lương cao nhất
                    </option>
                    <option className="text-gray-900" value="salary_asc">
                      Lương thấp nhất
                    </option>
                    <option className="text-gray-900" value="views">
                      Lượt xem nhiều
                    </option>
                    <option className="text-gray-900" value="oldest">
                      Cũ nhất
                    </option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={onSearch}
                    className="w-full rounded-2xl bg-brand-yellow px-4 py-3 text-sm font-black text-brand-black shadow-[0_10px_20px_rgba(255,193,7,0.3)] hover:bg-white transition-all"
                  >
                    Áp dụng bộ lọc
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hot Tags */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
              Tìm kiếm nhiều nhất:
            </span>
            <div className="flex flex-wrap gap-2">
              {hotTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onKeywordChange(tag)}
                  className="px-5 py-2 bg-white/10 hover:bg-brand-yellow text-white hover:text-brand-black rounded-full text-[10px] font-bold transition-all border border-white/10 backdrop-blur-sm cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
