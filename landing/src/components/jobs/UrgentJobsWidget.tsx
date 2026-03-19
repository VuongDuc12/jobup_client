"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchLatestJobs } from "@/lib/api";
import {
  formatSalary,
  timeAgo,
  companyInitial,
  resolveAssetUrl,
} from "@/lib/utils";
import type { PublicJobResponse } from "@/lib/types";

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

function colorFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return FALLBACK_COLORS[Math.abs(h) % FALLBACK_COLORS.length];
}

export default function UrgentJobsWidget() {
  const [jobs, setJobs] = useState<PublicJobResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      // Fetch latest 5 hot/urgent jobs
      const data = await fetchLatestJobs({ limit: 5 });
      setJobs(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch {
      // Silent fail — widget is supplementary
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative group/urgent mb-8 transition-all hover:shadow-brand-yellow/10">
      {/* Indicator */}
      <div className="absolute top-0 right-0 p-5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow/50 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow" />
        </span>
      </div>

      {/* Header */}
      <div className="p-6 pb-2 shrink-0">
        <h4 className="font-black text-gray-900 text-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
            <i className="fa-solid fa-fire text-brand-yellow text-lg animate-pulse" />
          </div>
          Việc Làm Gấp
        </h4>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-3.5 pl-1">
          Tin mới nhất trong 24h
        </p>
      </div>

      {/* List */}
      <div className="px-3 pb-4 space-y-1">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-2xl animate-pulse"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
              <div className="flex-grow space-y-1.5">
                <div className="h-3.5 bg-gray-100 rounded w-3/4" />
                <div className="h-2.5 bg-gray-50 rounded w-1/2" />
              </div>
            </div>
          ))}

        {!loading &&
          jobs.map((job) => {
            const initial = companyInitial(job.displayCompanyName);
            const bgColor = colorFor(job.displayCompanyName);
            const salary = formatSalary(job.salaryFrom, job.salaryTo);
            const time = timeAgo(job.createdAt);
            const companyAvatar = resolveAssetUrl(job.contactStaff?.avatar);

            return (
              <Link
                key={job.id}
                href={`/tuyen-dung/${job.slug}`}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-brand-yellow/5 transition-all duration-300 group/item border border-transparent hover:border-brand-yellow/20"
              >
                {companyAvatar ? (
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0 group-hover/item:bg-white shadow-sm border border-gray-100 transition-colors overflow-hidden">
                    <img
                      src={companyAvatar}
                      className="w-full h-full object-contain"
                      alt={job.displayCompanyName}
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center shrink-0 shadow-sm p-1 overflow-hidden">
                    <img
                      src="/Logo.png"
                      alt="Jobup"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="grow min-w-0">
                  <h5 className="font-bold text-gray-900 text-[13px] leading-tight group-hover/item:text-brand-yellow transition-colors line-clamp-2 wrap-break-word">
                    {job.title}
                  </h5>
                  <div className="flex items-center justify-between mt-1 gap-2 min-w-0">
                    <p className="text-brand-yellow font-extrabold text-[11px] tracking-tight truncate min-w-0">
                      {salary}
                    </p>
                    <p className="text-gray-400 text-[9px] font-bold shrink-0">
                      {time}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      {/* Footer */}
      <div className="p-5 pt-0 mt-auto shrink-0">
        <Link
          href="/tuyen-dung"
          className="w-full py-3.5 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-black hover:text-white transition-all group/btn flex items-center justify-center gap-2 shadow-sm border border-gray-100/50"
        >
          Xem tất cả tin gấp{" "}
          <i className="fa-solid fa-chevron-right text-[8px] group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
