"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  fetchLatestJobs,
  fetchPublicStaff,
  fetchTopJobCategories,
} from "@/lib/api";
import DynamicBanner from "@/components/shared/DynamicBanner";
import {
  formatSalary,
  workTypeLabel,
  timeAgo,
  companyInitial,
  resolveAssetUrl,
} from "@/lib/utils";
import type {
  JobCategoryTreeItem,
  PublicJobResponse,
  PublicStaffResponse,
} from "@/lib/types";

/* ────────────────────────────────────────────────
 *  Color palette for logo-fallback initials
 * ──────────────────────────────────────────────── */
const FALLBACK_COLORS = [
  "bg-blue-600",
  "bg-orange-500",
  "bg-purple-600",
  "bg-teal-600",
  "bg-pink-600",
  "bg-emerald-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-cyan-600",
  "bg-amber-600",
];

function colorForCompany(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

type Tab = { key: string; label: string; categoryId: string | undefined };

/* ────────────────────────────────────────────────
 *  Featured staff fallback (static)
 * ──────────────────────────────────────────────── */
const fallbackStaff: PublicStaffResponse[] = [
  {
    id: "1",
    fullName: "Nguyen Minh Anh",
    roleName: "Talent Acquisition Lead",
    avatar: "https://i.pravatar.cc/150?u=jobup-1",
  },
  {
    id: "2",
    fullName: "Tran Hoang Viet",
    roleName: "HR Business Partner",
    avatar: "https://i.pravatar.cc/150?u=jobup-2",
  },
  {
    id: "3",
    fullName: "Le Thu Trang",
    roleName: "Career Advisor",
    avatar: "https://i.pravatar.cc/150?u=jobup-3",
  },
];

/* ────────────────────────────────────────────────
 *  Job Card
 * ──────────────────────────────────────────────── */
function JobCard({ job }: { job: PublicJobResponse }) {
  const salary = formatSalary(job.salaryFrom, job.salaryTo);
  const workType = workTypeLabel(job.workType);
  const time = timeAgo(job.createdAt);
  const initial = companyInitial(job.displayCompanyName);
  const bgColor = colorForCompany(job.displayCompanyName);
  const avatar = resolveAssetUrl(job.contactStaff?.avatar);

  return (
    <Link
      href={`/tuyen-dung/${job.slug}`}
      className="group bg-white rounded-2xl p-3 md:p-4 border border-gray-100 hover:border-amber-300/50 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
    >
      {/* Company Logo / Fallback */}
      <div className="flex items-center gap-0 md:gap-3 flex-grow">
        <div className="relative shrink-0 hidden md:block">
         
            <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
              <img
                src="/Logo.png"
                alt="Jobup"
                className="w-10 h-10 object-contain"
              />
            </div>
          {job.isHot && (
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[8px] font-bold uppercase rounded-full shadow-sm">
              Hot
            </span>
          )}
        </div>

        {/* Title & Company */}
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-amber-600 transition-colors truncate">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm text-gray-500 font-medium">
              {job.displayCompanyName}
            </p>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <p className="text-sm text-gray-400">
              <i className="fa-solid fa-location-dot mr-1" />
              {job.provinceName}
            </p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 md:w-52">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-lg border border-blue-100">
          {workType}
        </span>
        {job.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-100"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Salary & Time */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center md:min-w-[140px] pt-3 md:pt-0 border-t md:border-t-0 border-gray-50">
        <span className="text-green-600 font-extrabold text-sm md:text-base">
          {salary}
        </span>
        <span className="text-gray-400 text-xs mt-0.5">{time}</span>
      </div>
    </Link>
  );
}

/* ────────────────────────────────────────────────
 *  Loading Skeleton
 * ──────────────────────────────────────────────── */
function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-4 animate-pulse">
      <div className="flex items-center gap-3 flex-grow">
        <div className="w-12 h-12 rounded-xl bg-gray-200" />
        <div className="flex-grow space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="flex gap-2 md:w-48">
        <div className="h-6 bg-gray-100 rounded-lg w-16" />
        <div className="h-6 bg-gray-100 rounded-lg w-12" />
      </div>
      <div className="md:min-w-[120px] space-y-1 md:text-right">
        <div className="h-4 bg-gray-200 rounded w-24 ml-auto" />
        <div className="h-3 bg-gray-100 rounded w-16 ml-auto" />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 *  Main Section
 * ──────────────────────────────────────────────── */
export default function JobsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [tabs, setTabs] = useState<Tab[]>([
    { key: "all", label: "Tất cả", categoryId: undefined },
  ]);
  const [jobs, setJobs] = useState<PublicJobResponse[]>([]);
  const [staff, setStaff] = useState<PublicStaffResponse[]>(fallbackStaff);
  const [staffIndex, setStaffIndex] = useState(0);
  const staffIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopJobCategories(4)
      .then((cats: JobCategoryTreeItem[]) => {
        setTabs([
          { key: "all", label: "Tất cả", categoryId: undefined },
          ...cats.map((c) => ({
            key: c.id,
            label: c.name,
            categoryId: c.id,
          })),
        ]);
      })
      .catch(() => {
        // giữ nguyên tab "Tất cả" nếu lỗi
      });
  }, []);

  const loadJobs = useCallback(async (categoryId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLatestJobs({
        limit: 10,
        categoryId,
      });
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError("Không thể tải danh sách việc làm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tab = tabs.find((t) => t.key === activeTab);
    loadJobs(tab?.categoryId);
  }, [activeTab, loadJobs]);

  const startStaffAutoPlay = useCallback(() => {
    if (staff.length <= 1) return;

    staffIntervalRef.current = setInterval(() => {
      setStaffIndex((prev) => (prev + 1) % staff.length);
    }, 4000);
  }, [staff.length]);

  const stopStaffAutoPlay = useCallback(() => {
    if (staffIntervalRef.current) {
      clearInterval(staffIntervalRef.current);
      staffIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startStaffAutoPlay();
    return stopStaffAutoPlay;
  }, [startStaffAutoPlay, stopStaffAutoPlay]);

  useEffect(() => {
    let mounted = true;

    const loadStaff = async () => {
      try {
        const result = await fetchPublicStaff(8);
        if (!mounted || result.length === 0) return;
        setStaff(result);
        setStaffIndex(0);
      } catch {
        // Keep fallback staff
      }
    };

    loadStaff();

    return () => {
      mounted = false;
    };
  }, []);

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
          <div className="flex items-center justify-start md:justify-center gap-2 p-1.5 bg-white rounded-full border border-gray-200 shadow-sm overflow-x-auto max-w-fit md:mx-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
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
              {/* Loading */}
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}

              {/* Error */}
              {!loading && error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                  <i className="fa-solid fa-triangle-exclamation text-red-400 text-3xl mb-3" />
                  <p className="text-red-600 font-semibold mb-4">{error}</p>
                  <button
                    onClick={() => loadJobs()}
                    className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {/* Empty */}
              {!loading && !error && jobs.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
                  <i className="fa-solid fa-briefcase text-gray-300 text-4xl mb-4" />
                  <p className="text-gray-500 font-medium">
                    Chưa có việc làm nào.
                  </p>
                </div>
              )}

              {/* Jobs */}
              {!loading &&
                !error &&
                jobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>

            {/* View More */}
            {!loading && !error && jobs.length > 0 && (
              <div className="mt-8 text-center">
                <Link
                  href="/tuyen-dung"
                  className="inline-block px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-[#111827] hover:text-white hover:border-[#111827] transition-all shadow-sm"
                >
                  Xem thêm việc làm khác
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Brand Trust Banner */}
            <DynamicBanner position="home_sidebar" variant="sidebar" />
          </div>
        </div>
      </div>
    </section>
  );
}
