"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import DynamicBanner from "@/components/shared/DynamicBanner";
import {
  fetchPublicJobBySlug,
  fetchRelatedJobs,
  fetchSimilarJobs,
  trackPublicJobView,
  trackPublicJobApply,
} from "@/lib/api";
import {
  companyInitial,
  formatSalary,
  resolveAssetUrl,
  timeAgo,
} from "@/lib/utils";
import type { PublicJobDetailResponse, PublicJobResponse } from "@/lib/types";

const WORK_TYPE_LABELS: Record<number, string> = {
  0: "Full-time",
  1: "Part-time",
  2: "Hợp đồng",
  3: "Freelance",
};

const EXPERIENCE_LABELS: Record<number, string> = {
  0: "Không yêu cầu",
  1: "Dưới 1 năm",
  2: "1-3 năm",
  3: "3-5 năm",
  4: "Trên 5 năm",
};

const LEVEL_LABELS: Record<number, string> = {
  0: "Thực tập",
  1: "Fresher",
  2: "Junior",
  3: "Middle",
  4: "Senior",
  5: "Leader",
  6: "Manager",
};

const GENDER_LABELS: Record<number, string> = {
  0: "Không yêu cầu",
  1: "Nam",
  2: "Nữ",
};

function deadlineLabel(deadline?: string | null): string {
  if (!deadline) return "Không giới hạn";
  const deadlineDate = new Date(deadline);
  if (Number.isNaN(deadlineDate.getTime())) return "Không giới hạn";
  const today = new Date();
  const diffMs = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  if (diffDays < 0) return "Đã hết hạn";
  if (diffDays === 0) return "Hết hạn hôm nay";
  return `Hết hạn trong ${diffDays} ngày`;
}

function mergeUniqueJobs(
  primary: PublicJobResponse[],
  secondary: PublicJobResponse[],
  limit: number,
): PublicJobResponse[] {
  const seen = new Set(primary.map((job) => job.id));
  const merged = [...primary];
  for (const job of secondary) {
    if (merged.length >= limit) break;
    if (seen.has(job.id)) continue;
    seen.add(job.id);
    merged.push(job);
  }
  return merged;
}

function buildZaloLink(phone?: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://zalo.me/${digits}`;
}

function HtmlContent({ html }: { html?: string | null }) {
  if (!html || !html.trim()) {
    return <p className="text-gray-500">Đang cập nhật.</p>;
  }

  return (
    <div
      className="text-gray-600 leading-relaxed space-y-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const [job, setJob] = useState<PublicJobDetailResponse | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<PublicJobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const companyAvatar = resolveAssetUrl(job?.contactStaff?.avatar);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!slug) {
          setError("Không tìm thấy công việc bạn yêu cầu.");
          setJob(null);
          return;
        }
        const detail = await fetchPublicJobBySlug(slug);
        if (!isMounted) return;
        setJob(detail);

        try {
          const related = await fetchRelatedJobs(detail.id, 6);
          if (!isMounted) return;
          let merged = related;
          if (related.length < 6) {
            try {
              const similar = await fetchSimilarJobs(detail.id, 6);
              if (!isMounted) return;
              merged = mergeUniqueJobs(related, similar, 6);
            } catch {
              if (!isMounted) return;
            }
          }
          setRelatedJobs(merged);
        } catch {
          if (!isMounted) return;
          setRelatedJobs([]);
        }
      } catch {
        if (!isMounted) return;
        setError("Không tìm thấy công việc bạn yêu cầu.");
        setJob(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const infoChips = useMemo(() => {
    if (!job) return [];
    const chips = [] as { label: string; tone: string }[];
    if (job.isHot) {
      chips.push({
        label: "Hot Job",
        tone: "bg-red-600 text-white",
      });
    }
    if (job.workType !== null && job.workType !== undefined) {
      chips.push({
        label: WORK_TYPE_LABELS[job.workType] ?? "Khac",
        tone: "bg-green-50 text-green-700",
      });
    }
    if (job.level !== null && job.level !== undefined) {
      chips.push({
        label: LEVEL_LABELS[job.level] ?? "Khac",
        tone: "bg-blue-50 text-blue-700",
      });
    }
    return chips;
  }, [job]);

  const zaloLink = buildZaloLink(job?.contactStaff?.zaloPhone);

  const viewTracked = useRef(false);
  useEffect(() => {
    if (job && !viewTracked.current) {
      viewTracked.current = true;
      trackPublicJobView(job.id);
    }
  }, [job]);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-500">
              <Link href="/" className="hover:text-brand-yellow transition">
                Trang chu
              </Link>
              <i className="fa-solid fa-chevron-right text-[9px] sm:text-[10px]" />
              <Link
                href="/tuyen-dung"
                className="hover:text-brand-yellow transition"
              >
                {job?.category?.name || "Việc làm"}
              </Link>
              <i className="fa-solid fa-chevron-right text-[9px] sm:text-[10px]" />
              <span className="text-gray-900 font-bold truncate">
                {job?.title || "Chi tiết công việc"}
              </span>
            </nav>
            <Link
              href="/tuyen-dung"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-black transition"
            >
              <i className="fa-solid fa-arrow-left" /> Quay lại danh sách
            </Link>
          </div>

          {loading && (
            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm text-center text-gray-500 font-semibold">
              Đang tải chi tiết công việc...
            </div>
          )}

          {!loading && error && (
            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm text-center">
              <p className="text-lg font-bold text-brand-black mb-2">{error}</p>
              <Link
                href="/tuyen-dung"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-black transition"
              >
                <i className="fa-solid fa-arrow-left" /> Quay lại danh sách
              </Link>
            </div>
          )}

          {!loading && job && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
              <div className="lg:col-span-8">
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow/10 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none" />

                  <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                    {companyAvatar ? (
                      <div className="w-20 h-20 rounded-2xl border border-gray-100 p-3 bg-white shadow-sm flex items-center justify-center shrink-0">
                        <img
                          src={companyAvatar}
                          alt={job.displayCompanyName || "Logo công ty"}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl border border-gray-100 bg-[#1a1a1a] shadow-sm flex items-center justify-center shrink-0 p-2 overflow-hidden">
                        <img
                          src="/Logo.png"
                          alt="Jobup"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <div className="flex-grow space-y-3">
                      {infoChips.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {infoChips.map((chip) => (
                            <span
                              key={chip.label}
                              className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-md tracking-wider ${chip.tone}`}
                            >
                              {chip.label}
                            </span>
                          ))}
                        </div>
                      )}

                      <h1 className="text-3xl md:text-4xl font-black text-brand-black leading-tight">
                        {job.title}
                      </h1>

                      <p className="text-base font-bold text-gray-500 hover:text-brand-yellow transition-colors">
                        <i className="fa-solid fa-building mr-1" />
                        {job.displayCompanyName || "Doanh nghiệp chưa cập nhật"}
                      </p>

                      <div className="flex flex-wrap gap-y-3 gap-x-6 pt-4 border-t border-gray-50 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <i className="fa-solid fa-money-bill-wave" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Mức lương
                            </p>
                            <p className="text-sm font-bold text-brand-black">
                              {formatSalary(
                                job.salaryFrom ?? 0,
                                job.salaryTo ?? 0,
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <i className="fa-solid fa-location-dot" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Địa điểm
                            </p>
                            <p className="text-sm font-bold text-brand-black">
                              {job.province?.name || "Chua cap nhat"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <i className="fa-solid fa-briefcase" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Kinh nghiệm
                            </p>
                            <p className="text-sm font-bold text-brand-black">
                              {job.experience !== null &&
                              job.experience !== undefined
                                ? EXPERIENCE_LABELS[job.experience] ||
                                  "Chua cap nhat"
                                : "Chua cap nhat"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {job.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 group h-full">
                <div className="h-full rounded-[28px] border border-[#ece9df] bg-[#f7f7f5] p-4.5 shadow-[0_12px_28px_rgba(15,32,70,0.09)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,32,70,0.13)]">
                  <div className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#efede6] bg-white">
                    <div className="bg-[#f8f4e7] px-4.5 pb-3 pt-3.5 text-center">
                      <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#b48a27]">
                        Đừng bỏ lỡ cơ hội này!
                      </h3>
                    </div>

                    {job.contactStaff ? (
                      <div className="flex flex-1 flex-col px-4.5 pb-4.5 pt-3.5">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="relative shrink-0">
                            {companyAvatar ? (
                              <img
                                src={companyAvatar}
                                alt={job.contactStaff.fullName}
                                className="h-11 w-11 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f2d4c] text-sm font-bold text-white">
                                {companyInitial(job.contactStaff.fullName)}
                              </div>
                            )}
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-[#2ccf65]" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[16px] font-extrabold uppercase leading-tight text-[#2f3442]">
                              {job.contactStaff.fullName}
                            </p>
                            <p className="mt-0.5 truncate text-[13px] font-medium text-[#7d8595]">
                              Chuyên viên tư vấn
                            </p>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-[#f1efe8] bg-white">
                          <div className="flex items-center px-3 py-2.5">
                            <div className="mr-2.5 flex h-5 w-5 items-center justify-center text-[#cf9f26]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <p className="truncate text-[13px] font-semibold text-[#788090]">
                              {job.contactStaff.email || "Chưa cập nhật"}
                            </p>
                          </div>

                          <div className="h-px w-full bg-[#f2efe6]" />

                          <div className="flex items-center px-3 py-2.5">
                            <div className="mr-2.5 flex h-5 w-5 items-center justify-center text-[#cf9f26]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            </div>
                            <p className="truncate text-[13px] font-semibold text-[#788090]">
                              {job.contactStaff.zaloPhone || "Chưa cập nhật"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3.5">
                          {zaloLink ? (
                            <a
                              href={zaloLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackPublicJobApply(job.id)}
                              className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#0f1d43] px-3 py-3 text-[13px] font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#0b1633]"
                            >
                              <i className="fa-solid fa-paper-plane text-[11px]" />
                              Liên hệ ngay
                            </a>
                          ) : (
                            <div className="w-full rounded-[10px] border border-dashed border-[#dcd8ca] bg-[#f7f6f2] py-3 text-center text-[13px] font-semibold text-gray-500">
                              Zalo chưa cập nhật
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="flex flex-1 items-center justify-center py-4 text-center text-[13px] text-gray-400">
                        Chưa có thông tin liên hệ
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-10">
                  <div>
                    <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                      Mô tả công việc
                    </h3>
                    <HtmlContent html={job.description} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                      Yêu cầu ứng viên
                    </h3>
                    <HtmlContent html={job.requirements} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                      Quyền lợi và đãi ngộ
                    </h3>
                    <HtmlContent html={job.benefits} />
                  </div>

                  {job.additionalInfo && job.additionalInfo.trim() && (
                    <div>
                      <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                        Thông tin thêm
                      </h3>
                      <HtmlContent html={job.additionalInfo} />
                    </div>
                  )}
                </div>

                {relatedJobs.length > 0 && (
                  <div className="pt-10">
                    <h3 className="text-xl font-black text-brand-black mb-6">
                      Việc làm liên quan
                    </h3>

                    <div className="space-y-4">
                      {relatedJobs.map((item) => (
                        <Link
                          key={item.id}
                          href={
                            item.slug
                              ? `/tuyen-dung/${item.slug}`
                              : "/tuyen-dung"
                          }
                          className="group bg-white rounded-2xl p-3 md:p-4 border border-gray-100 hover:border-amber-300/50 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
                        >
                          <div className="flex items-center gap-0 md:gap-3 flex-grow">
                            <div className="relative shrink-0 hidden md:block">
                              {resolveAssetUrl(item.contactStaff?.avatar) ? (
                                <img
                                  src={
                                    resolveAssetUrl(
                                      item.contactStaff?.avatar,
                                    ) as string
                                  }
                                  className="w-12 h-12 object-cover rounded-xl bg-gray-50 border border-gray-100"
                                  alt={item.displayCompanyName}
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center shadow-lg p-1.5 overflow-hidden">
                                  <img
                                    src="/Logo.png"
                                    alt="Jobup"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              )}
                              {item.isHot && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[8px] font-bold uppercase rounded-full shadow-sm">
                                  Hot
                                </span>
                              )}
                            </div>

                            <div className="flex-grow min-w-0">
                              <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-amber-600 transition-colors truncate">
                                {item.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <p className="text-sm text-gray-500 font-medium">
                                  {item.displayCompanyName}
                                </p>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <p className="text-sm text-gray-400">
                                  <i className="fa-solid fa-location-dot mr-1" />
                                  {item.provinceName || "Toàn quốc"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 md:w-52">
                            {item.workType !== undefined && (
                              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-lg border border-blue-100">
                                {WORK_TYPE_LABELS[item.workType] || "Khác"}
                              </span>
                            )}
                            {item.categoryName && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-100">
                                {item.categoryName}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center md:min-w-[140px] pt-3 md:pt-0 border-t md:border-t-0 border-gray-50">
                            <span className="text-green-600 font-extrabold text-sm md:text-base">
                              {formatSalary(item.salaryFrom, item.salaryTo)}
                            </span>
                            <span className="text-gray-400 text-xs mt-0.5">
                              {timeAgo(item.createdAt)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 relative">
                <div className="sticky top-24 space-y-4">
                  <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
                    <h3 className="text-lg font-black text-brand-black">
                      Thông tin tuyển dụng
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Hết hạn</span>
                        <span className="font-bold text-brand-black">
                          {deadlineLabel(job.deadline)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Kinh nghiệm</span>
                        <span className="font-bold text-brand-black">
                          {job.experience !== null &&
                          job.experience !== undefined
                            ? EXPERIENCE_LABELS[job.experience] ||
                              "Chưa cập nhật"
                            : "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Cấp bậc</span>
                        <span className="font-bold text-brand-black">
                          {job.level !== null && job.level !== undefined
                            ? LEVEL_LABELS[job.level] || "Chưa cập nhật"
                            : "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Hình thức</span>
                        <span className="font-bold text-brand-black">
                          {job.workType !== null && job.workType !== undefined
                            ? WORK_TYPE_LABELS[job.workType] || "Chưa cập nhật"
                            : "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Giới tính</span>
                        <span className="font-bold text-brand-black">
                          {job.gender !== null && job.gender !== undefined
                            ? GENDER_LABELS[job.gender] || "Chưa cập nhật"
                            : "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Số lượng</span>
                        <span className="font-bold text-brand-black">
                          {job.quantity ?? "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Độ tuổi</span>
                        <span className="font-bold text-brand-black">
                          {job.ageFrom !== null &&
                          job.ageFrom !== undefined &&
                          job.ageTo !== null &&
                          job.ageTo !== undefined
                            ? `${job.ageFrom}-${job.ageTo}`
                            : "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Lượt xem</span>
                        <span className="font-bold text-brand-black">
                          {job.viewCount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Đăng</span>
                        <span className="font-bold text-brand-black">
                          {timeAgo(job.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DynamicBanner
                    position="job_detail_sidebar"
                    variant="compact"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
