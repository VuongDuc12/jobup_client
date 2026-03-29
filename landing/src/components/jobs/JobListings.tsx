"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchPublicJobs } from "@/lib/api";
import { formatSalary, workTypeLabel, timeAgo } from "@/lib/utils";
import type { PublicJobResponse } from "@/lib/types";
import DynamicBanner from "@/components/shared/DynamicBanner";
import NumberedPagination from "@/components/shared/NumberedPagination";

function JobCard({ job }: { job: PublicJobResponse }) {
  const salary = formatSalary(job.salaryFrom, job.salaryTo);
  const workType = workTypeLabel(job.workType);
  const time = timeAgo(job.createdAt);
  const jobHref = job.slug ? `/tuyen-dung/${job.slug}` : "/tuyen-dung";
  const rawTags = job.tags ?? [];
  const tagChips =
    rawTags.length <= 2 ? rawTags : [...rawTags.slice(0, 2), "Khác"];

  return (
    <Link
      href={jobHref}
      className="group bg-white rounded-2xl p-3 md:p-4 border border-gray-100 hover:border-amber-300/50 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1fr)_13rem_8.75rem] md:items-center md:gap-4 min-w-0"
    >
      <div className="flex items-center gap-0 md:gap-3 grow min-w-0">
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
              {job.provinceName || "Toàn quốc"}
            </p>
          </div>
        </div>
      </div>

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

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center min-w-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-50 gap-2 md:gap-1">
        <span className="text-green-600 font-extrabold text-sm md:text-base md:text-right max-w-full truncate">
          {salary}
        </span>
        <span className="text-gray-400 text-xs mt-0.5 shrink-0">{time}</span>
      </div>
    </Link>
  );
}

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

interface JobListingsProps {
  keyword?: string;
  provinceId?: string;
  categoryId?: string;
  salaryFrom?: number;
  salaryTo?: number;
  experience?: number;
  workType?: number;
  sortBy?: string;
  pageSize?: number;
  viewAllHref?: string;
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
  pageSize = 10,
  viewAllHref,
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
          PageSize: pageSize,
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

  return (
    <div className="space-y-4">
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <i className="fa-solid fa-triangle-exclamation text-red-400 text-3xl mb-3" />
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => loadJobs(1, true)}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
          <i className="fa-solid fa-briefcase text-gray-300 text-4xl mb-4" />
          <p className="text-gray-500 font-medium">
            Chưa có việc làm phù hợp. Hãy thử tìm kiếm với từ khóa khác.
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        jobs.slice(0, 3).map((job) => <JobCard key={job.id} job={job} />)}

      {/* in-feed banner removed per request */}

      {!loading &&
        !error &&
        jobs.slice(3).map((job) => <JobCard key={job.id} job={job} />)}

      {!loading && !error && jobs.length > 0 && (
        <div className="flex justify-center pt-8">
          {viewAllHref ? (
            <a
              href={viewAllHref}
              className="px-6 py-2 border border-gray-300 rounded-full hover:bg-black hover:text-white transition-all font-medium"
            >
              Xem thêm việc làm
            </a>
          ) : (
            <NumberedPagination
              page={page}
              totalPages={totalPages}
              disabled={loading || loadingMore}
              onPageChange={(nextPage) => {
                if (
                  nextPage === page ||
                  nextPage < 1 ||
                  nextPage > totalPages
                ) {
                  return;
                }
                setPage(nextPage);
                loadJobs(nextPage, true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
