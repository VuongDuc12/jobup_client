"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
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
} from "@/lib/utils";
import type {
  JobCategoryTreeItem,
  PublicJobResponse,
  PublicStaffResponse,
} from "@/lib/types";

type Tab = { key: string; label: string; categoryId: string | undefined };

/* ────────────────────────────────────────────────
 *  Featured staff fallback (static)
 * ──────────────────────────────────────────────── */
const fallbackStaff: PublicStaffResponse[] = [
  {
    id: "1",
    fullName: "Nguyen Minh Anh",
    roleName: "Talent Acquisition Lead",
    avatar: "/images/staff-avatar-1.jpg",
  },
  {
    id: "2",
    fullName: "Tran Hoang Viet",
    roleName: "HR Business Partner",
    avatar: "/images/staff-avatar-2.jpg",
  },
  {
    id: "3",
    fullName: "Le Thu Trang",
    roleName: "Career Advisor",
    avatar: "/images/staff-avatar-3.svg",
  },
];

/* ────────────────────────────────────────────────
 *  Job Card
 * ──────────────────────────────────────────────── */
function JobCard({ job }: { job: PublicJobResponse }) {
  const salary = formatSalary(job.salaryFrom, job.salaryTo);
  const workType = workTypeLabel(job.workType);
  const time = timeAgo(job.createdAt);
  const rawTags = job.tags ?? [];
  const tagChips =
    rawTags.length <= 2 ? rawTags : [...rawTags.slice(0, 2), "Khác"];

  return (
    <Link
      href={`/tuyen-dung/${job.slug}`}
      className="group bg-white rounded-2xl p-3 md:p-4 border border-gray-100 hover:border-amber-300/50 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1fr)_13rem_8.75rem] md:items-center md:gap-4 min-w-0"
    >
      {/* Company Logo / Fallback */}
      <div className="flex items-center gap-0 md:gap-3 grow min-w-0">
        <div className="relative shrink-0 hidden md:block">
          <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
            <Image
              src="/Logo.png"
              alt="Jobup"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          {job.isHot && (
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[8px] font-bold uppercase rounded-full shadow-sm">
              Hot
            </span>
          )}
        </div>

        {/* Title & Company */}
        <div className="grow min-w-0">
          <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-amber-600 transition-colors line-clamp-2 wrap-break-word">
            {job.title}
          </h3>
          <div className="flex items-center gap-x-2 gap-y-1 min-w-0">
            <p className="text-sm text-gray-500 font-medium truncate min-w-0">
              {job.displayCompanyName}
            </p>
            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
            <p className="text-sm text-gray-400 truncate min-w-0">
              <i className="fa-solid fa-location-dot mr-1" />
              {job.provinceName}
            </p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 min-w-0 md:justify-start">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-lg border border-blue-100 max-w-full truncate">
          {workType}
        </span>
        {tagChips.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-100 max-w-full truncate"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Salary & Time */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center min-w-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-50 gap-2 md:gap-1">
        <span className="text-green-600 font-extrabold text-sm md:text-base md:text-right max-w-full truncate">
          {salary}
        </span>
        <span className="text-gray-400 text-xs mt-0.5 shrink-0">{time}</span>
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
        limit: 8,
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
  }, [activeTab, loadJobs, tabs]);

  const startStaffAutoPlay = useCallback(() => {
    if (staff.length <= 1) return;

    staffIntervalRef.current = setInterval(() => {
      setStaff((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
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
    <section id="jobs" className="landing-section bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center">
          <SectionHeader
            badge="Cơ hội nghề nghiệp"
            title={
              <>
                Việc làm <span className="text-brand-yellow">Mới Nhất</span>
              </>
            }
            description="Hơn 500+ việc làm mới được cập nhật hôm nay từ các tập đoàn công nghệ hàng đầu."
            align="center"
            className="mb-6"
            badgeClassName="text-[#B45309]"
            badgeContainerClassName="justify-center"
            lineClassName="bg-[#B45309]"
            titleClassName="text-[#111827]"
          />

          {/* Tabs */}
          <div className="flex items-center justify-start md:justify-center gap-2 p-1.5 bg-white rounded-full border border-gray-200 shadow-sm overflow-x-auto max-w-fit md:mx-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                aria-label={`Lọc việc làm: ${tab.label}`}
                aria-pressed={activeTab === tab.key}
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

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-7">
          {/* Job List */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-3 transition-all duration-200">
              {/* Loading */}
              {loading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}

              {/* Error */}
              {!loading && error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                  <i className="fa-solid fa-triangle-exclamation text-red-400 text-3xl mb-3" />
                  <p className="text-red-600 font-semibold mb-4">{error}</p>
                   <button
                    onClick={() => loadJobs()}
                    aria-label="Thử tải lại danh sách việc làm"
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
              <div className="mt-6 text-center">
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
          <div className="lg:col-span-4 space-y-5">
            {/* Brand Trust Banner */}
            <DynamicBanner position="home_sidebar" variant="sidebar" />

            {/* Home Banner 2 */}
            <DynamicBanner position="home_banner_2" variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
