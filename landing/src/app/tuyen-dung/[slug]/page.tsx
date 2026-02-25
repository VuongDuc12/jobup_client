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

function buildLines(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

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

  const descriptionLines = buildLines(job?.description);
  const requirementLines = buildLines(job?.requirements);
  const benefitLines = buildLines(job?.benefits);
  const additionalLines = buildLines(job?.additionalInfo);

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
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
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
                      <div className="w-20 h-20 rounded-2xl border border-gray-100 bg-brand-black text-white shadow-sm flex items-center justify-center shrink-0 text-2xl font-black">
                        {companyInitial(job.displayCompanyName || "J")}
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

                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-10">
                  <div>
                    <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                      Mô tả công việc
                    </h3>
                    {descriptionLines.length > 0 ? (
                      <ul className="space-y-4 text-gray-600 leading-relaxed">
                        {descriptionLines.map((line, idx) => (
                          <li key={`${line}-${idx}`} className="flex gap-3">
                            <i className="fa-solid fa-check text-brand-yellow mt-1" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Đang cập nhật.</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                      Yêu cầu ứng viên
                    </h3>
                    {requirementLines.length > 0 ? (
                      <ul className="space-y-4 text-gray-600 leading-relaxed">
                        {requirementLines.map((line, idx) => (
                          <li key={`${line}-${idx}`} className="flex gap-3">
                            <i className="fa-solid fa-star text-brand-yellow mt-1 text-xs" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Đang cập nhật.</p>
                    )}
                  </div>

                  <div className="bg-[#FFFDF5] border border-amber-100 rounded-2xl p-6">
                    <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                      Quyền lợi & Đãi ngộ
                    </h3>
                    {benefitLines.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {benefitLines.map((line, idx) => (
                          <div
                            key={`${line}-${idx}`}
                            className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                          >
                            <i className="fa-solid fa-gift text-orange-500 text-xl" />
                            <span className="text-sm font-bold text-gray-700">
                              {line}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Đang cập nhật.</p>
                    )}
                  </div>

                  {additionalLines.length > 0 && (
                    <div>
                      <h3 className="text-lg font-black text-brand-black mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-brand-yellow rounded-full" />
                        Thông tin thêm
                      </h3>
                      <ul className="space-y-4 text-gray-600 leading-relaxed">
                        {additionalLines.map((line, idx) => (
                          <li key={`${line}-${idx}`} className="flex gap-3">
                            <i className="fa-solid fa-circle-info text-brand-yellow mt-1" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {relatedJobs.length > 0 && (
                  <div className="pt-10">
                    <h3 className="text-xl font-black text-brand-black mb-6 flex items-center gap-3">
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
                          className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-5 hover:border-brand-yellow/50 hover:shadow-lg transition-all group"
                        >
                          <div className="w-16 h-16 rounded-xl border border-gray-100 p-2 flex-shrink-0 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                            {item.contactStaff?.avatar ? (
                              <img
                                src={item.contactStaff.avatar}
                                className="w-full h-full object-contain"
                                alt={item.displayCompanyName}
                              />
                            ) : (
                              <div className="w-full h-full rounded-lg bg-brand-black text-white flex items-center justify-center font-bold">
                                {companyInitial(item.displayCompanyName || "J")}
                              </div>
                            )}
                          </div>
                          <div className="flex-grow text-center md:text-left">
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-1">
                              {item.isHot && (
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-bold uppercase rounded">
                                  HOT
                                </span>
                              )}
                              {item.workType !== undefined && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold uppercase rounded">
                                  {WORK_TYPE_LABELS[item.workType] || "Khác"}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-extrabold text-[#111827] mb-0.5 group-hover:text-brand-yellow transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm font-bold mb-2">
                              {item.displayCompanyName} •{" "}
                              <span className="text-gray-400">
                                {item.provinceName || "Toàn quốc"}
                              </span>
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 items-center">
                              {item.categoryName && (
                                <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md font-bold border border-gray-100 uppercase tracking-wider">
                                  {item.categoryName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="md:text-right flex flex-col md:items-end justify-between self-stretch">
                            <span className="text-green-600 font-black text-lg mb-2 md:mb-auto">
                              {formatSalary(item.salaryFrom, item.salaryTo)}
                            </span>
                            <span className="px-6 py-2 bg-brand-black text-white text-sm font-bold rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all">
                              Ứng tuyển
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 relative">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/50">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        Đừng bỏ lỡ cơ hội này
                      </p>
                      <p className="text-xs text-brand-yellow font-bold uppercase tracking-widest animate-pulse">
                        {deadlineLabel(job.deadline)}
                      </p>
                    </div>

                    <button className="w-full py-4 bg-brand-black text-white font-black rounded-xl shadow-lg hover:bg-brand-yellow hover:text-black transition-all transform hover:-translate-y-1 mb-3 uppercase tracking-wider text-sm">
                      Ứng tuyển ngay
                    </button>
                    <button className="w-full py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:border-brand-yellow hover:text-brand-yellow transition-all flex items-center justify-center gap-2">
                      <i className="fa-regular fa-heart" /> Lưu tin
                    </button>
                  </div>

                  <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
                    <h3 className="text-lg font-black text-brand-black">
                      Thông tin tuyển dụng
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600">
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

                  {job.contactStaff && (
                    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
                      <h3 className="text-lg font-black text-brand-black">
                        Liên hệ tư vấn
                      </h3>
                      <div className="flex items-center gap-4">
                        {job.contactStaff.avatar ? (
                          <img
                            src={job.contactStaff.avatar}
                            alt={job.contactStaff.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center font-bold">
                            {companyInitial(job.contactStaff.fullName)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-brand-black">
                            {job.contactStaff.fullName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Chuyên viên tuyển dụng
                          </p>
                        </div>
                      </div>
                      {job.contactStaff.zaloPhone && (
                        <a
                          href={`tel:${job.contactStaff.zaloPhone}`}
                          className="flex items-center justify-between text-sm font-bold text-brand-black bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-brand-yellow transition"
                        >
                          <span>{job.contactStaff.zaloPhone}</span>
                          <i className="fa-solid fa-phone text-brand-yellow" />
                        </a>
                      )}
                    </div>
                  )}
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
