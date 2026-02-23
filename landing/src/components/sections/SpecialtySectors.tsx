"use client";

import { useRef, useCallback } from "react";

interface SectorCard {
    title: string;
    description: string;
    image: string;
    tags: string[];
    jobCount: string;
    gradientFrom: string;
    ctaHoverBg: string;
    hasHotTag?: boolean;
}

const sectors: SectorCard[] = [
    {
        title: "Công nghệ & Phần mềm",
        description: "Top 1 ngành có thu nhập cao nhất. Dev, Product, Data, AI/ML.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
        tags: ["Fullstack", "AI/ML"],
        jobCount: "12,400",
        gradientFrom: "from-black/95",
        ctaHoverBg: "group-hover:bg-white",
        hasHotTag: true,
    },
    {
        title: "Marketing & Creative",
        description: "Sáng tạo không giới hạn tại các Agency và Client hàng đầu.",
        image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800",
        tags: ["Content", "Social"],
        jobCount: "3,100",
        gradientFrom: "from-orange-950/95 via-orange-950/40",
        ctaHoverBg: "group-hover:bg-orange-500",
    },
    {
        title: "Tài chính & Đầu tư",
        description: "Cơ hội nghìn đô tại các quỹ đầu tư và ngân hàng hàng đầu.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800",
        tags: ["Banking", "Investment"],
        jobCount: "2,500",
        gradientFrom: "from-[#0f172a]/95 via-[#0f172a]/50",
        ctaHoverBg: "group-hover:bg-white",
    },
    {
        title: "Nhân sự & Admin",
        description: "Quản trị con người, xây dựng văn hóa doanh nghiệp bền vững.",
        image: "https://images.unsplash.com/photo-1521791136364-798a7bc0d262?q=80&w=800",
        tags: ["Recruitment", "C&B"],
        jobCount: "1,800",
        gradientFrom: "from-pink-950/95 via-pink-950/40",
        ctaHoverBg: "group-hover:bg-pink-500",
    },
    {
        title: "Sales & Kinh doanh",
        description: "Thu nhập đột phá với hoa hồng hấp dẫn. B2B, B2C.",
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800",
        tags: ["B2B Sales", "Enterprise"],
        jobCount: "8,500",
        gradientFrom: "from-emerald-950/95 via-emerald-950/40",
        ctaHoverBg: "group-hover:bg-emerald-500",
    },
    {
        title: "Y tế & Dược phẩm",
        description: "Ngành thiết yếu với nhu cầu tuyển dụng cao. Dược sĩ, Bác sĩ.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
        tags: ["Doctor", "Pharmacist"],
        jobCount: "2,100",
        gradientFrom: "from-red-950/95 via-red-950/40",
        ctaHoverBg: "group-hover:bg-red-500",
    },
];

export default function SpecialtySectors() {
    const trackRef = useRef<HTMLDivElement>(null);

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
                    Khám phá cơ hội{" "}
                    <span className="text-brand-yellow">Tiềm Năng</span>
                </h2>
                <p className="text-gray-500 text-base max-w-2xl mx-auto mb-6">
                    Tìm kiếm vị trí phù hợp với thế mạnh của bạn trong hơn 24+ lĩnh vực
                    khác nhau.
                </p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={scrollPrev}
                        className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#111827] hover:text-white hover:border-[#111827] transition-all duration-300 cursor-pointer"
                    >
                        <i className="fa-solid fa-arrow-left" />
                    </button>
                    <button
                        onClick={scrollNext}
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
                    {sectors.map((sector, idx) => (
                        <div key={idx} className="snap-center shrink-0 w-[300px] md:w-[380px] group">
                            <a
                                href="#"
                                className="block h-[440px] rounded-[2.5rem] relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: `url('${sector.image}')` }}
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t ${sector.gradientFrom} to-transparent`}
                                />

                                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {sector.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-white/20 backdrop-blur-md text-[10px] font-bold text-white rounded-full border border-white/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {sector.hasHotTag && (
                                            <span className="px-3 py-1 bg-[#F0B429] text-[10px] font-bold text-black rounded-full">
                                                Hot
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {sector.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                        {sector.description}
                                    </p>
                                    <div
                                        className={`flex items-center justify-between w-full py-3.5 px-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 ${sector.ctaHoverBg} transition-all duration-300`}
                                    >
                                        <span className="font-bold text-sm text-white group-hover:text-[#111827]">
                                            Xem {sector.jobCount} jobs
                                        </span>
                                        <i className="fa-solid fa-arrow-right text-white group-hover:text-[#111827] -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}

                    {/* View All Card */}
                    <div className="snap-center shrink-0 w-[220px] flex items-center justify-center">
                        <a
                            href="#"
                            className="group flex flex-col items-center gap-4 text-center py-8"
                        >
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-[#F0B429] group-hover:text-[#F0B429] group-hover:bg-amber-50 transition-all duration-300 bg-white shadow-sm">
                                <i className="fa-solid fa-arrow-right text-2xl transform group-hover:translate-x-2 transition-transform" />
                            </div>
                            <span className="font-bold text-gray-600 group-hover:text-[#111827] transition-colors text-sm">
                                Xem tất cả <br />
                                24+ Lĩnh vực
                            </span>
                        </a>
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
