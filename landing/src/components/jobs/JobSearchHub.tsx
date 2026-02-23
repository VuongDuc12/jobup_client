"use client";

import { useState, useEffect } from "react";

const broadcasts = [
    "🔥 Tuyển gấp 50 CSKH lương 15Tr không yêu cầu kinh nghiệm",
    "🚀 Top 100+ việc làm IT lương nghìn đô tại HCM & Hà Nội",
    "🎓 Khóa học Tester cam kết đầu ra giảm 50% hôm nay!",
    "✨ JobUp Connect 2026: Ngày hội tuyển dụng trực tuyến lớn nhất năm",
];

const hotTags = ["Kinh doanh", "Bán hàng", "Giao hàng", "Part-time"];

interface JobSearchHubProps {
    keyword: string;
    location: string;
    onKeywordChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onSearch: () => void;
}

export default function JobSearchHub({
    keyword,
    location,
    onKeywordChange,
    onLocationChange,
    onSearch,
}: JobSearchHubProps) {
    const [broadcastDate, setBroadcastDate] = useState("");

    useEffect(() => {
        const now = new Date();
        setBroadcastDate(
            now.toLocaleDateString("vi-VN", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
            })
        );
    }, []);

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
                                    <span key={idx} className={idx === broadcasts.length - 1 ? "text-brand-yellow" : ""}>
                                        {text}
                                    </span>
                                ))}
                                {/* Separator dots */}
                                {broadcasts.map((text, idx) => (
                                    <span key={`sep-${idx}`}>
                                        <span className="w-1 h-1 bg-white/20 rounded-full inline-block mx-2" />
                                        <span className={idx === broadcasts.length - 1 ? "text-brand-yellow" : ""}>
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
                                50,000+ tin tuyển dụng đã xác thực
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-brand-yellow text-white hover:text-brand-black backdrop-blur-lg border border-white/30 rounded-full text-xs font-black transition-all shadow-lg active:scale-95 cursor-pointer">
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
                                value={location}
                                onChange={(e) => onLocationChange(e.target.value)}
                                className="w-full pl-12 pr-10 py-4 bg-white/10 hover:bg-white/20 focus:bg-white rounded-2xl border-2 border-white/20 focus:border-brand-yellow focus:outline-none transition-all text-white focus:text-gray-900 font-black appearance-none cursor-pointer backdrop-blur-md"
                            >
                                <option className="text-gray-900" value="">
                                    Tất cả địa điểm
                                </option>
                                <option className="text-gray-900" value="ha-noi">
                                    Hà Nội
                                </option>
                                <option className="text-gray-900" value="ho-chi-minh">
                                    Hồ Chí Minh
                                </option>
                                <option className="text-gray-900" value="da-nang">
                                    Đà Nẵng
                                </option>
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
                            TÌM KIẾM <i className="fa-solid fa-magnifying-glass-plus text-lg" />
                        </button>
                    </form>

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
