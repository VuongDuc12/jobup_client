"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface JobData {
    id: number;
    title: string;
    company: string;
    location: string;
    tags: string[];
    salary: string;
    time: string;
    logo?: string;
    logoFallback?: { letter: string; bg: string };
    badge?: { text: string; color: string };
    category: string;
}

const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "it", label: "💻 IT/Software" },
    { key: "mkt", label: "📢 Marketing" },
    { key: "sale", label: "💰 Sales" },
];

const jobs: JobData[] = [
    {
        id: 2,
        title: "Brand Manager",
        company: "Shopee",
        location: "TP.HCM",
        tags: ["Full-time", "Manager"],
        salary: "35 - 60 triệu VNĐ",
        time: "5 giờ trước",
        logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
        badge: { text: "Gấp", color: "bg-red-500" },
        category: "mkt",
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "Figma",
        location: "Remote",
        tags: ["Remote", "Figma"],
        salary: "25 - 50 triệu VNĐ",
        time: "1 ngày trước",
        logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
        category: "it",
    },
    {
        id: 4,
        title: "Senior Sale B2B",
        company: "Google Ads",
        location: "Hà Nội",
        tags: ["Sale", "English"],
        salary: "20 - 35 triệu VNĐ",
        time: "1 ngày trước",
        logo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
        category: "sale",
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "Viettel",
        location: "Hà Nội",
        tags: ["AWS", "K8s"],
        salary: "45 - 75 triệu VNĐ",
        time: "2 ngày trước",
        logoFallback: { letter: "V", bg: "bg-blue-600" },
        category: "it",
    },
    {
        id: 6,
        title: "Kế toán trưởng",
        company: "FPT Software",
        location: "Đà Nẵng",
        tags: ["ACC", "CPA"],
        salary: "30 - 50 triệu VNĐ",
        time: "2 ngày trước",
        logoFallback: { letter: "F", bg: "bg-orange-500" },
        category: "all",
    },
    {
        id: 7,
        title: "Frontend Developer (React)",
        company: "Tiki",
        location: "TP.HCM",
        tags: ["React", "TypeScript"],
        salary: "35 - 55 triệu VNĐ",
        time: "3 giờ trước",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
        badge: { text: "Mới", color: "bg-green-500" },
        category: "it",
    },
    {
        id: 8,
        title: "Data Analyst",
        company: "Grab Vietnam",
        location: "Hà Nội",
        tags: ["Python", "SQL"],
        salary: "28 - 45 triệu VNĐ",
        time: "5 giờ trước",
        logoFallback: { letter: "G", bg: "bg-purple-600" },
        category: "it",
    },
    {
        id: 9,
        title: "Product Manager",
        company: "Lazada",
        location: "TP.HCM",
        tags: ["Product", "English"],
        salary: "50 - 80 triệu VNĐ",
        time: "1 ngày trước",
        logo: "https://cdn-icons-png.flaticon.com/512/882/882702.png",
        badge: { text: "Gấp", color: "bg-red-500" },
        category: "it",
    },
    {
        id: 10,
        title: "Mobile Developer (Flutter)",
        company: "MoMo",
        location: "TP.HCM",
        tags: ["Flutter", "Dart"],
        salary: "40 - 70 triệu VNĐ",
        time: "1 ngày trước",
        logoFallback: { letter: "M", bg: "bg-teal-600" },
        category: "it",
    },
];

const topEmployers = [
    {
        name: "Microsoft",
        jobs: "12 jobs đang mở",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    },
    {
        name: "Shopee",
        jobs: "8 jobs đang mở",
        logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    },
    {
        name: "Google",
        jobs: "5 jobs đang mở",
        logo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
    },
];

function JobCard({ job }: { job: JobData }) {
    return (
        <Link
            href="/tuyen-dung/chi-tiet"
            className="group bg-white rounded-2xl p-3 md:p-4 border border-gray-100 hover:border-amber-300/50 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
        >
            <div className="flex items-center gap-3 flex-grow">
                <div className="relative shrink-0">
                    {job.logo ? (
                        <img
                            src={job.logo}
                            className="w-12 h-12 object-contain rounded-xl p-2 bg-gray-50 border border-gray-100"
                            alt={job.company}
                        />
                    ) : (
                        <div
                            className={`w-12 h-12 rounded-xl ${job.logoFallback?.bg} text-white flex items-center justify-center font-bold text-lg shadow-lg`}
                        >
                            {job.logoFallback?.letter}
                        </div>
                    )}
                    {job.badge && (
                        <span
                            className={`absolute -top-2 -right-2 px-2 py-0.5 ${job.badge.color} text-white text-[8px] font-bold uppercase rounded-full shadow-sm`}
                        >
                            {job.badge.text}
                        </span>
                    )}
                </div>
                <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-amber-600 transition-colors truncate">
                        {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="text-sm text-gray-500 font-medium">{job.company}</p>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <p className="text-sm text-gray-400">
                            <i className="fa-solid fa-location-dot mr-1" />
                            {job.location}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:w-48">
                {job.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-100"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center md:min-w-[120px] pt-3 md:pt-0 border-t md:border-t-0 border-gray-50">
                <span className="text-green-600 font-extrabold text-base">
                    {job.salary}
                </span>
                <span className="text-gray-400 text-xs mt-0.5">{job.time}</span>
            </div>
        </Link>
    );
}

export default function JobsSection() {
    const [activeTab, setActiveTab] = useState("all");

    const filteredJobs =
        activeTab === "all"
            ? jobs
            : jobs.filter(
                (job) => job.category === activeTab || job.category === "all"
            );

    return (
        <section id="jobs" className="py-12 bg-gray-50 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <span className="text-[#B45309] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                        Cơ hội nghề nghiệp
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-3">
                        Việc làm <span className="text-brand-yellow">Mới Nhất</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto mb-8">
                        Hơn 500+ việc làm mới được cập nhật hôm nay từ các tập đoàn công
                        nghệ hàng đầu.
                    </p>

                    {/* Tabs */}
                    <div className="flex items-center justify-center gap-2 p-1.5 bg-white rounded-full border border-gray-200 shadow-sm overflow-x-auto max-w-fit mx-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === tab.key
                                        ? "bg-[#111827] text-white shadow-md"
                                        : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Job List */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-3 transition-all duration-200">
                            {filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-[#111827] hover:text-white hover:border-[#111827] transition-all shadow-sm cursor-pointer">
                                Xem thêm 124 công việc khác
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Brand Trust Banner */}
                        <div className="relative rounded-[32px] overflow-hidden h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] group cursor-pointer border border-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt="JobUp Reputation"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/50 to-transparent flex flex-col justify-end p-8">
                                <div className="mb-4">
                                    <span className="px-4 py-1 bg-amber-400 text-[#111827] text-[10px] font-extrabold rounded-full tracking-wider uppercase shadow-lg shadow-amber-400/20">
                                        Thương hiệu uy tín
                                    </span>
                                </div>
                                <h3 className="text-white text-3xl font-extrabold mb-3 leading-tight">
                                    JobUp - Tận tâm <br />
                                    <span className="text-amber-400">Đồng hành & Bứt phá</span>
                                </h3>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed font-medium">
                                    Chúng tôi tin rằng mỗi sự nghiệp đều xứng đáng được trân
                                    trọng. JobUp cam kết mang lại sự minh bạch, nhiệt huyết và cơ
                                    hội vàng cho mọi ứng viên.
                                </p>
                                <div className="flex items-center gap-2 group/btn">
                                    <span className="h-0.5 w-8 bg-amber-400 transition-all duration-300 group-hover/btn:w-12" />
                                    <span className="text-white font-bold text-sm tracking-wide uppercase transition-colors group-hover/btn:text-amber-400">
                                        Khám phá ngay
                                    </span>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Hot Employers */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                                <span>Nhà tuyển dụng HOT</span>
                                <i className="fa-solid fa-fire text-orange-500" />
                            </h4>
                            <div className="space-y-4">
                                {topEmployers.map((employer, idx) => (
                                    <Link
                                        key={idx}
                                        href="/tuyen-dung"
                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 p-1.5 flex items-center justify-center">
                                            <img
                                                src={employer.logo}
                                                className="w-full h-full object-contain"
                                                alt={employer.name}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h5 className="text-sm font-bold text-gray-900 group-hover:text-brand-yellow transition-colors">
                                                {employer.name}
                                            </h5>
                                            <p className="text-[10px] text-gray-400 font-bold">
                                                {employer.jobs}
                                            </p>
                                        </div>
                                        <i className="fa-solid fa-chevron-right text-gray-300 text-xs group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
