"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import {
  fetchPublicJobBySlug,
  fetchRelatedJobs,
  fetchSimilarJobs,
} from "@/lib/api";
import { companyInitial, formatSalary, timeAgo } from "@/lib/utils";
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
      } catch (err) {
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
        tone: "bg-brand-yellow text-brand-black",
      });
    }
    if (job.workType !== null && job.workType !== undefined) {
      chips.push({
        label: WORK_TYPE_LABELS[job.workType] ?? "Khác",
        tone: "bg-green-50 text-green-700",
      });
    }
    if (job.level !== null && job.level !== undefined) {
      chips.push({
        label: LEVEL_LABELS[job.level] ?? "Khác",
        tone: "bg-blue-50 text-blue-700",
      });
    }
    return chips;
  }, [job]);

  const zaloLink = buildZaloLink(job?.contactStaff?.zaloPhone);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <nav className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Link href="/" className="hover:text-brand-yellow transition">
                Trang chủ
              </Link>
              <i className="fa-solid fa-chevron-right text-[10px]" />
              <Link
                href="/tuyen-dung"
                className="hover:text-brand-yellow transition"
              >
                {job?.category?.name || "Việc làm"}
              </Link>
              <i className="fa-solid fa-chevron-right text-[10px]" />
              <span className="text-gray-900 font-bold">
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
                    {job.contactStaff?.avatar ? (
                      <div className="w-20 h-20 rounded-2xl border border-gray-100 p-3 bg-white shadow-sm flex items-center justify-center shrink-0">
                        <img
                          src={job.contactStaff.avatar}
                          alt={job.displayCompanyName || "Logo công ty"}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl border border-gray-100 bg-[#1a1a1a] shadow-sm flex items-center justify-center shrink-0 p-2 overflow-hidden">
                        <img src="/Logo.png" alt="Jobup" className="w-full h-full object-contain" />
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
                              {job.province?.name || "Chưa cập nhật"}
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
                                  "Chưa cập nhật"
                                : "Chưa cập nhật"}
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

              <div className="lg:col-span-4">
                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col h-full">
                  <div className="flex flex-col bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-50">
                      <h3 className="text-sm font-bold text-gray-800">
                        Người phụ trách
                      </h3>
                    </div>

                    {job.contactStaff ? (
                      <div className="flex flex-col">
                        {/* Profile Row - Chuyển sang dạng ngang để tiết kiệm chiều cao */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative">
                            {job.contactStaff.avatar ? (
                              <img
                                src={job.contactStaff.avatar}
                                alt={job.contactStaff.fullName}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-yellow/10"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center font-bold text-lg">
                                {companyInitial(job.contactStaff.fullName)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <p className="font-bold text-brand-black text-base leading-tight">
                              {job.contactStaff.fullName}
                            </p>
                          </div>
                        </div>

                        {/* Contact Info - Thu nhỏ padding và text */}
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center p-2 rounded-lg bg-gray-50/80 border border-gray-100">
                            <div className="w-6 h-6 flex items-center justify-center mr-2 text-gray-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5"
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
                            <p className="text-xs font-medium text-gray-600 truncate">
                              {job.contactStaff.email || "Chưa cập nhật"}
                            </p>
                          </div>

                          <div className="flex items-center p-2 rounded-lg bg-gray-50/80 border border-gray-100">
                            <div className="w-6 h-6 flex items-center justify-center mr-2 text-gray-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5"
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
                            <p className="text-xs font-medium text-gray-600">
                              {job.contactStaff.zaloPhone || "Chưa cập nhật"}
                            </p>
                          </div>
                        </div>

                        {/* Button - Thu nhỏ độ cao (py-2.5) */}
                        <div className="mt-4">
                          {zaloLink ? (
                            <a
                              href={zaloLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 bg-brand-black text-white font-bold rounded-lg hover:bg-brand-yellow hover:text-black transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                            >
                              <img
                                src="/Icon_of_Zalo.svg"
                                alt="Zalo"
                                className="w-4 h-4"
                              />
                              <span className="text-xs uppercase tracking-wider">
                                Chat Zalo ngay
                              </span>
                            </a>
                          ) : (
                            <div className="w-full py-2.5 bg-gray-50 text-gray-400 font-medium rounded-lg text-center text-[11px] border border-dashed border-gray-200">
                              Zalo chưa cập nhật
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-gray-400 text-center py-4">
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
                          <div className="flex items-center gap-3 flex-grow">
                            <div className="relative shrink-0">
                              {item.contactStaff?.avatar ? (
                                <img
                                  src={item.contactStaff.avatar}
                                  className="w-12 h-12 object-cover rounded-xl bg-gray-50 border border-gray-100"
                                  alt={item.displayCompanyName}
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center shadow-lg p-1.5 overflow-hidden">
                                  <img src="/Logo.png" alt="Jobup" className="w-full h-full object-contain" />
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
                <div className="sticky top-24">
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
                      <div className="flex items-center justify-between gap-4">
                        <span>Người phụ trách</span>
                        <span className="font-bold text-brand-black text-right">
                          {job.contactStaff?.fullName || "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Email phụ trách</span>
                        <span className="font-bold text-brand-black text-right break-all">
                          {job.contactStaff?.email || "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Zalo phụ trách</span>
                        <span className="font-bold text-brand-black text-right">
                          {job.contactStaff?.zaloPhone || "Chưa cập nhật"}
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
