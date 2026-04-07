"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchRecommendedJobs } from "@/lib/api";
import { formatSalary, timeAgo } from "@/lib/utils";
import type { PublicJobResponse } from "@/lib/types";

interface RecommendedJobsWidgetProps {
  categoryId?: string;
  limit?: number;
}

export default function RecommendedJobsWidget({
  categoryId,
  limit = 6,
}: RecommendedJobsWidgetProps) {
  const [jobs, setJobs] = useState<PublicJobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRecommendedJobs({
          limit,
          recentCategoryIds: categoryId ? [categoryId] : undefined,
        });
        if (!isMounted) return;
        setJobs(data);
      } catch {
        if (!isMounted) return;
        setError("Không thể tải việc làm đề xuất.");
        setJobs([]);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    loadJobs();
    return () => {
      isMounted = false;
    };
  }, [categoryId, limit]);

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-brand-black">
          Việc làm đề xuất
        </h3>
        {categoryId && (
          <span className="text-[10px] font-bold uppercase text-brand-yellow">
            Theo ngành
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-12 rounded-xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-gray-500 font-medium">{error}</p>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-sm text-gray-500 font-medium">
          Chưa có việc làm phù hợp.
        </p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={job.slug ? `/tuyen-dung/${job.slug}` : "/tuyen-dung"}
              className="block rounded-xl border border-gray-100 p-3 hover:border-brand-yellow hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-brand-black line-clamp-2 wrap-break-word">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1 truncate">
                    {job.displayCompanyName || "Doanh nghiệp"}
                  </p>
                </div>
                <span className="text-xs font-bold text-green-600 whitespace-nowrap shrink-0 max-w-[45%] truncate text-right">
                  {formatSalary(job.salaryFrom, job.salaryTo)}
                </span>
              </div>
              <div className="mt-2 text-[11px] text-gray-400 font-medium truncate">
                {job.provinceName || "Toàn quốc"} • {timeAgo(job.createdAt)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
