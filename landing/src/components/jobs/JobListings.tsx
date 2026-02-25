"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchPublicJobs } from "@/lib/api";
import {
  formatSalary,
  workTypeLabel,
  timeAgo,
  companyInitial,
} from "@/lib/utils";
import type { PublicJobResponse } from "@/lib/types";

/* ── Color palette for logo fallback ── */
const FALLBACK_COLORS = [
  "bg-blue-600",
  "bg-orange-500",
  "bg-purple-600",
  "bg-teal-600",
  "bg-pink-600",
  "bg-emerald-600",
  "bg-rose-600",
  "bg-indigo-600",
];

function colorForCompany(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

/* ── VIP Job Card (promoted / isHot) ── */
function VipJobCard({ job }: { job: PublicJobResponse }) {
  const initial = companyInitial(job.displayCompanyName);
  const bgColor = colorForCompany(job.displayCompanyName);
  const salary = formatSalary(job.salaryFrom, job.salaryTo);
  const wt = workTypeLabel(job.workType);
  const jobHref = job.slug ? `/tuyen-dung/${job.slug}` : "/tuyen-dung";

  return (
    <div className="relative bg-gradient-to-r from-yellow-50 to-white p-1 rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group isolation-auto">
      {/* HOT Badge */}
      <div className="absolute -top-3 -right-3 z-20">
        <span className="relative flex h-10 w-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-10 w-10 bg-red-600 items-center justify-center text-white text-[10px] font-black shadow-lg border-2 border-white">
            HOT
          </span>
        </span>
      </div>

      <Link
        href={jobHref}
        className="bg-white p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10 overflow-hidden block"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full translate-x-16 -translate-y-16 -z-10" />

        {/* Company Logo */}
        {job.contactStaff?.avatar ? (
          <div className="w-20 h-20 rounded-2xl border-2 border-brand-yellow p-1.5 bg-white shrink-0 shadow-sm">
            <img
              src={job.contactStaff.avatar}
              className="w-full h-full object-contain rounded-xl"
              alt={job.displayCompanyName}
            />
          </div>
        ) : (
          <div
            className={`w-20 h-20 rounded-2xl ${bgColor} text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-lg border-2 border-white`}
          >
            {initial}
          </div>
        )}

        <div className="flex-grow">
          <h3 className="text-xl font-black text-gray-900 group-hover:text-brand-yellow transition-colors leading-tight mb-2">
            {job.title}
          </h3>
          <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
            <span className="flex items-center gap-1.5 text-brand-black">
              <i className="fa-solid fa-building text-brand-yellow" />
              {job.displayCompanyName}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot" />
              {job.provinceName}
            </span>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-lg shadow-sm shadow-red-200">
              {salary}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg border border-blue-100">
              {wt}
            </span>
            {(job.tags ?? []).slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <span className="block w-full md:w-auto px-8 py-4 bg-brand-black text-white font-black rounded-xl hover:bg-brand-yellow hover:text-brand-black transition-all shadow-xl hover:shadow-yellow-400/30 active:scale-95 text-center text-sm">
            ỨNG TUYỂN NGAY
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ── Normal Job Card ── */
function NormalJobCard({ job }: { job: PublicJobResponse }) {
  const initial = companyInitial(job.displayCompanyName);
  const bgColor = colorForCompany(job.displayCompanyName);
  const salary = formatSalary(job.salaryFrom, job.salaryTo);
  const time = timeAgo(job.createdAt);
  const jobHref = job.slug ? `/tuyen-dung/${job.slug}` : "/tuyen-dung";

  return (
    <Link
      href={jobHref}
      className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-brand-yellow/50 hover:shadow-md transition-all cursor-pointer flex gap-4 items-center"
    >
      {job.contactStaff?.avatar ? (
        <div className="w-14 h-14 rounded-lg bg-gray-50 p-2 border border-gray-100 shrink-0">
          <img
            src={job.contactStaff.avatar}
            className="w-full h-full object-contain"
            alt={job.displayCompanyName}
          />
        </div>
      ) : (
        <div
          className={`w-14 h-14 rounded-lg ${bgColor} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md`}
        >
          {initial}
        </div>
      )}
      <div className="flex-grow min-w-0">
        <h3 className="font-bold text-gray-900 text-lg truncate">
          {job.title}
        </h3>
        <p className="text-gray-500 text-sm truncate">
          {job.displayCompanyName} • {job.provinceName}
        </p>
      </div>
      <div className="text-right hidden md:block shrink-0">
        <p className="text-green-600 font-bold">{salary}</p>
        <p className="text-gray-400 text-xs mt-1">{time}</p>
      </div>
    </Link>
  );
}

/* ── In-feed Banner ── */
function InFeedBanner() {
  return (
    <div className="my-6 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl shrink-0">
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <div className="text-white">
            <h4 className="font-bold text-xl uppercase tracking-wide">
              Bạn chưa có kinh nghiệm?
            </h4>
            <p className="text-blue-100 text-sm">
              Tham gia khóa đào tạo thực chiến - Cam kết việc làm 100%.
            </p>
          </div>
        </div>
        <button className="relative z-10 bg-white text-blue-700 px-6 py-2.5 rounded-full font-bold shadow-lg hover:scale-105 transition-transform whitespace-nowrap cursor-pointer">
          Tư vấn miễn phí
        </button>
      </div>
    </div>
  );
}

/* ── Loading Skeleton ── */
function JobCardSkeleton() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 flex gap-4 items-center animate-pulse">
      <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0" />
      <div className="flex-grow space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
      <div className="hidden md:block space-y-2 shrink-0">
        <div className="h-4 bg-gray-200 rounded w-24 ml-auto" />
        <div className="h-3 bg-gray-100 rounded w-16 ml-auto" />
      </div>
    </div>
  );
}

/* ── Main Component ── */
interface JobListingsProps {
  keyword?: string;
  provinceId?: string;
  categoryId?: string;
  salaryFrom?: number;
  salaryTo?: number;
  experience?: number;
  workType?: number;
  sortBy?: string;
}

export default function JobListings({
  keyword,
  provinceId,
  categoryId,
  salaryFrom,
  salaryTo,
  experience,
  workType,
  sortBy,
}: JobListingsProps) {
  const [jobs, setJobs] = useState<PublicJobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadJobs = useCallback(
    async (pageNumber: number, replace = false) => {
      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      try {
        const response = await fetchPublicJobs({
          Keyword: keyword?.trim() || undefined,
          ProvinceId: provinceId || undefined,
          CategoryId: categoryId || undefined,
          SalaryFrom: salaryFrom,
          SalaryTo: salaryTo,
          Experience: experience,
          WorkType: workType,
          PageNumber: pageNumber,
          PageSize: 10,
          SortBy: sortBy || "newest",
        });
        setTotalPages(response.totalPages || 1);
        setJobs((prev) =>
          replace ? response.list : [...prev, ...response.list],
        );
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Không thể tải danh sách việc làm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [
      keyword,
      provinceId,
      categoryId,
      salaryFrom,
      salaryTo,
      experience,
      workType,
      sortBy,
    ],
  );

  useEffect(() => {
    setPage(1);
    loadJobs(1, true);
  }, [loadJobs]);

  // Separate VIP (isHot) from normal jobs
  const vipJobs = jobs.filter((j) => j.isHot);
  const normalJobs = jobs.filter((j) => !j.isHot);

  return (
    <div className="space-y-4">
      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <i className="fa-solid fa-triangle-exclamation text-red-400 text-3xl mb-3" />
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={loadJobs}
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
            Chưa có việc làm phù hợp. Hãy thử tìm kiếm với từ khóa khác.
          </p>
        </div>
      )}

      {/* VIP Jobs */}
      {!loading &&
        !error &&
        vipJobs.map((job) => <VipJobCard key={job.id} job={job} />)}

      {/* Normal Jobs — first batch */}
      {!loading &&
        !error &&
        normalJobs
          .slice(0, 3)
          .map((job) => <NormalJobCard key={job.id} job={job} />)}

      {/* In-feed Banner */}
      {!loading && !error && normalJobs.length > 3 && <InFeedBanner />}

      {/* Normal Jobs — remaining */}
      {!loading &&
        !error &&
        normalJobs
          .slice(3)
          .map((job) => <NormalJobCard key={job.id} job={job} />)}

      {/* Load More */}
      {!loading && !error && jobs.length > 0 && (
        <div className="flex justify-center pt-8">
          <button
            className="px-6 py-2 border border-gray-300 rounded-full hover:bg-black hover:text-white transition-all font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              loadJobs(nextPage);
            }}
            disabled={loadingMore || page >= totalPages}
          >
            {loadingMore
              ? "Đang tải..."
              : page >= totalPages
                ? "Đã hết việc làm"
                : "Xem thêm việc làm"}
          </button>
        </div>
      )}
    </div>
  );
}
