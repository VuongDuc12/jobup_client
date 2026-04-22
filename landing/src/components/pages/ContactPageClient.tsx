"use client";

import { FormEvent, useMemo, useState } from "react";
import { Footer, Navbar } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import BadgeText from "@/components/shared/BadgeText";
import { useSystemConfig } from "@/hooks/useSystemConfig";
import {
  createEmployerContactPublic,
  createCandidateContactPublic,
} from "@/lib/api";

/* ── Fallbacks ── */
const FALLBACK_ADDRESS_MAIN =
  "C23, Lô 18 KĐT Định Công, Phường Phương Liệt, Hà Nội";
const FALLBACK_ADDRESS_OFFICE =
  "VPGD: Tòa nhà 29T1 Hoàng Đạo Thúy, Phường Yên Hòa, Hà Nội";
const FALLBACK_PHONE = "0979334143";
const FALLBACK_EMAIL = "tuyendung@jobup.vn";
const FALLBACK_FANPAGE = "jobup.vn";
const FALLBACK_LINKEDIN = "JobUp";
const FALLBACK_MAP: string | null = null;

/* ── Types ── */
type EmployerFormState = {
  contactName: string;
  phone: string;
  companyName: string;
  message: string;
};

type CandidateFormState = {
  fullName: string;
  phone: string;
  message: string;
};

/* ── Helpers ── */
function toDisplayPhone(raw?: string | null): string {
  if (!raw || !raw.trim()) return FALLBACK_PHONE;
  const digits = raw.replace(/\D/g, "");
  // Return full number without "+"
  if (digits.startsWith("84") && digits.length >= 10) {
    return "0" + digits.slice(2);
  }
  if (digits.length === 10 && digits.startsWith("0")) {
    return digits;
  }
  return raw.replace(/^\+/, "");
}

function hostLabel(raw?: string | null, fallback = ""): string {
  if (!raw || raw === "#") return fallback;
  try {
    const url = new URL(raw);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return fallback;
  }
}

function resolveMapEmbedSrc(raw?: string | null): string | null {
  if (!raw || !raw.trim()) return FALLBACK_MAP;
  const value = raw.trim();
  if (value.includes("<iframe")) {
    const srcMatch = value.match(/src\s*=\s*"([^"]+)"/i);
    if (srcMatch?.[1]) return srcMatch[1];
    const singleQuoteSrcMatch = value.match(/src\s*=\s*'([^']+)'/i);
    if (singleQuoteSrcMatch?.[1]) return singleQuoteSrcMatch[1];
  }
  return value;
}

/* ── Social Link Component ── */
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string | null;
  label: string;
  icon: React.ReactNode;
}) {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-brand-yellow hover:shadow-md transition-all group cursor-pointer">
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-yellow/10 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-white transition-all">
        {icon}
      </span>
      <span className="text-sm font-medium text-slate-700 group-hover:text-brand-black transition-colors">
        {label}
      </span>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

/* ── Main Component ── */
export default function ContactPageClient() {
  const { config } = useSystemConfig();

  /* Employer form */
  const [employerForm, setEmployerForm] = useState<EmployerFormState>({
    contactName: "",
    phone: "",
    companyName: "",
    message: "",
  });
  const [employerSubmitting, setEmployerSubmitting] = useState(false);
  const [employerError, setEmployerError] = useState<string | null>(null);
  const [employerSuccess, setEmployerSuccess] = useState<string | null>(null);

  /* Candidate form */
  const [candidateForm, setCandidateForm] = useState<CandidateFormState>({
    fullName: "",
    phone: "",
    message: "",
  });
  const [candidateSubmitting, setCandidateSubmitting] = useState(false);
  const [candidateError, setCandidateError] = useState<string | null>(null);
  const [candidateSuccess, setCandidateSuccess] = useState<string | null>(null);

  /* Derived display values */
  const displayMainAddress =
    config.address?.trim() || FALLBACK_ADDRESS_MAIN;
  const displayOfficeAddress = FALLBACK_ADDRESS_OFFICE;
  const displayPhone = toDisplayPhone(config.hotline);
  const displayEmail = config.email?.trim() || FALLBACK_EMAIL;
  const mapEmbedUrl = resolveMapEmbedSrc(config.mapEmbedUrl);

  const fanpageHref =
    config.facebookUrl && config.facebookUrl !== "#"
      ? config.facebookUrl
      : null;
  const linkedinHref =
    config.linkedInUrl && config.linkedInUrl !== "#"
      ? config.linkedInUrl
      : null;
  const zaloHref =
    config.zaloUrl && config.zaloUrl !== "#" ? config.zaloUrl : null;
  const tiktokHref =
    config.tiktokUrl && config.tiktokUrl !== "#" ? config.tiktokUrl : null;
  const threadHref =
    config.threadUrl && config.threadUrl !== "#" ? config.threadUrl : null;
  const instagramHref =
    config.instagramUrl && config.instagramUrl !== "#"
      ? config.instagramUrl
      : null;

  const fanpageLabel = useMemo(() => {
    if (!config.facebookUrl || config.facebookUrl === "#") {
      return FALLBACK_FANPAGE;
    }
    return hostLabel(config.facebookUrl, FALLBACK_FANPAGE);
  }, [config.facebookUrl]);

  const linkedinLabel = useMemo(() => {
    if (!config.linkedInUrl || config.linkedInUrl === "#") {
      return FALLBACK_LINKEDIN;
    }
    return FALLBACK_LINKEDIN;
  }, [config.linkedInUrl]);

  /* ── Submit handlers ── */
  const handleEmployerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contactName = employerForm.contactName.trim();
    const phone = employerForm.phone.trim();
    const companyName = employerForm.companyName.trim();
    const message = employerForm.message.trim();

    if (!contactName || !companyName) {
      setEmployerSuccess(null);
      setEmployerError(
        "Vui lòng nhập đầy đủ Họ tên và Tên doanh nghiệp."
      );
      return;
    }

    setEmployerSubmitting(true);
    setEmployerError(null);
    setEmployerSuccess(null);

    try {
      await createEmployerContactPublic({
        companyName,
        contactName,
        email: "contact@jobup.vn", // Default since email field removed from UI
        phone: phone || undefined,
        position: undefined,
        message: message || undefined,
      });
      setEmployerSuccess(
        "Gửi thông tin thành công. JobUp sẽ liên hệ với bạn sớm nhất."
      );
      setEmployerForm({
        contactName: "",
        phone: "",
        companyName: "",
        message: "",
      });
    } catch (error) {
      const messageText =
        error instanceof Error && error.message
          ? error.message
          : "Gửi thông tin thất bại. Vui lòng thử lại sau.";
      setEmployerError(messageText);
    } finally {
      setEmployerSubmitting(false);
    }
  };

  const handleCandidateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullName = candidateForm.fullName.trim();
    const phone = candidateForm.phone.trim();
    const message = candidateForm.message.trim();

    if (!fullName || !phone) {
      setCandidateSuccess(null);
      setCandidateError("Vui lòng nhập đầy đủ Họ tên và SĐT liên hệ.");
      return;
    }

    setCandidateSubmitting(true);
    setCandidateError(null);
    setCandidateSuccess(null);

    try {
      await createCandidateContactPublic({
        fullName,
        phone,
        message: message || undefined,
      });
      setCandidateSuccess(
        "Gửi thông tin thành công. JobUp sẽ liên hệ với bạn sớm nhất."
      );
      setCandidateForm({ fullName: "", phone: "", message: "" });
    } catch (error) {
      const messageText =
        error instanceof Error && error.message
          ? error.message
          : "Gửi thông tin thất bại. Vui lòng thử lại sau.";
      setCandidateError(messageText);
    } finally {
      setCandidateSubmitting(false);
    }
  };

  /* ── Shared input classes ── */
  const inputClass =
    "w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all focus:border-brand-yellow focus:ring-2 focus:ring-[#f0b429]/20";
  const textareaClass =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-brand-yellow focus:ring-2 focus:ring-[#f0b429]/20";
  const labelClass =
    "block text-[#334155] mb-2 font-semibold text-sm sm:text-base";

  return (
    <>
      <Navbar />
      <main className="pt-24 landing-page-shell bg-gradient-to-b from-[#f8fafc] via-white to-[#fff8e7] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          {/* ═══════════ HERO BADGE ═══════════ */}
          <div className="text-center mb-10">
            <BadgeText
              text="Kết nối cùng JobUp"
              align="center"
              linePlacement="leading"
              containerClassName="mb-4 inline-flex"
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black uppercase leading-tight">
              Liên hệ chúng tôi
            </h1>
            <p className="text-lg text-[#3c4d63] mt-3 max-w-2xl mx-auto">
              Hãy để lại thông tin, JobUp sẽ liên hệ hỗ trợ bạn sớm nhất
            </p>
          </div>

          {/* ═══════════ DUAL FORMS ═══════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-10">
            {/* ── LEFT: Dành cho Doanh nghiệp ── */}
            <section className="rounded-3xl border border-slate-200/70 bg-white/90 shadow-soft p-5 sm:p-7 lg:p-8 relative overflow-hidden">
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow to-[#f0b429]/60" />

              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-yellow/10">
                  <svg
                    className="w-6 h-6 text-brand-yellow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-brand-black uppercase leading-tight">
                    Dành cho Doanh nghiệp
                  </h2>
                  <p className="text-sm text-[#3c4d63]">
                    Có nhu cầu tìm kiếm ứng viên
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200 relative mb-6">
                <span className="absolute left-0 -top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow" />
              </div>

              <form onSubmit={handleEmployerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Họ tên <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={employerForm.contactName}
                      onChange={(e) =>
                        setEmployerForm((prev) => ({
                          ...prev,
                          contactName: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>SĐT</label>
                    <input
                      type="tel"
                      value={employerForm.phone}
                      onChange={(e) =>
                        setEmployerForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Tên doanh nghiệp <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={employerForm.companyName}
                    onChange={(e) =>
                      setEmployerForm((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Nhập tên doanh nghiệp"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Anh/chị vui lòng cung cấp thông tin liên quan về nhu cầu
                    tuyển dụng
                  </label>
                  <textarea
                    value={employerForm.message}
                    onChange={(e) =>
                      setEmployerForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={5}
                    className={textareaClass}
                    placeholder="Mô tả nhu cầu tuyển dụng của doanh nghiệp..."
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={employerSubmitting}
                    className="inline-flex items-center justify-center rounded-xl bg-brand-yellow px-10 h-12 text-white font-bold hover:bg-brand-yellow-hover transition-colors uppercase shadow-[0_10px_30px_-12px_rgba(240,180,41,0.7)]"
                  >
                    {employerSubmitting ? "Đang gửi..." : "Gửi thông tin"}
                  </button>
                </div>

                {employerError && (
                  <p className="text-sm font-medium text-red-600 text-center">
                    {employerError}
                  </p>
                )}
                {employerSuccess && (
                  <p className="text-sm font-medium text-emerald-600 text-center">
                    {employerSuccess}
                  </p>
                )}
              </form>
            </section>

            {/* ── RIGHT: Dành cho Ứng viên ── */}
            <section className="rounded-3xl border border-slate-200/70 bg-white/90 shadow-soft p-5 sm:p-7 lg:p-8 relative overflow-hidden">
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />

              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-brand-black uppercase leading-tight">
                    Dành cho Ứng viên
                  </h2>
                  <p className="text-sm text-[#3c4d63]">
                    Có nhu cầu tìm kiếm việc làm
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200 relative mb-6">
                <span className="absolute left-0 -top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500" />
              </div>

              <form onSubmit={handleCandidateSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Họ tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={candidateForm.fullName}
                    onChange={(e) =>
                      setCandidateForm((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    SĐT liên hệ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={candidateForm.phone}
                    onChange={(e) =>
                      setCandidateForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Hãy chia sẻ về vị trí việc làm anh/chị muốn ứng tuyển
                  </label>
                  <textarea
                    value={candidateForm.message}
                    onChange={(e) =>
                      setCandidateForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={5}
                    className={textareaClass}
                    placeholder="Mô tả vị trí việc làm bạn mong muốn..."
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={candidateSubmitting}
                    className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-10 h-12 text-white font-bold hover:bg-[#1d4ed8] transition-colors uppercase shadow-[0_10px_30px_-12px_rgba(37,99,235,0.5)]"
                  >
                    {candidateSubmitting ? "Đang gửi..." : "Gửi thông tin"}
                  </button>
                </div>

                {candidateError && (
                  <p className="text-sm font-medium text-red-600 text-center">
                    {candidateError}
                  </p>
                )}
                {candidateSuccess && (
                  <p className="text-sm font-medium text-emerald-600 text-center">
                    {candidateSuccess}
                  </p>
                )}
              </form>
            </section>
          </div>

          {/* ═══════════ GENERAL CONTACT INFO (moved from old right column) ═══════════ */}
          <section className="rounded-3xl border border-slate-200/70 bg-white/90 shadow-soft p-5 sm:p-7 lg:p-8">
            <BadgeText
              text="Thông tin liên hệ"
              align="left"
              linePlacement="leading"
              containerClassName="mb-3"
            />
            <h3 className="text-2xl sm:text-3xl font-black text-brand-black mb-2 uppercase leading-tight">
              Tìm việc - tìm đến JobUp
            </h3>
            <p className="text-[#3c4d63] text-base mb-6">
              Kết nối với chúng tôi qua các kênh dưới đây
            </p>
            <div className="w-full h-px bg-slate-200 relative mb-8">
              <span className="absolute left-0 -top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow" />
            </div>

            <div className="space-y-6">
              {/* Address + Contact info row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Address */}
                <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] px-5 py-5">
                  <h4 className="text-lg font-black text-[#3c4d63] mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Địa chỉ
                  </h4>
                  <p className="text-[#3c4d63] text-sm leading-relaxed break-words">
                    {displayMainAddress}
                  </p>
                  <p className="text-[#3c4d63] text-sm leading-relaxed mt-2 break-words">
                    {displayOfficeAddress}
                  </p>
                </article>

                {/* Phone / Email */}
                <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] px-5 py-5">
                  <h4 className="text-lg font-black text-[#3c4d63] mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Liên hệ
                  </h4>
                  <p className="text-[#3c4d63] text-sm">
                    SĐT:{" "}
                    <span className="font-semibold text-[#d89e00]">
                      {displayPhone}
                    </span>
                  </p>
                  <p className="text-[#3c4d63] text-sm mt-2">
                    Email:{" "}
                    <span className="font-semibold text-[#d89e00]">
                      {displayEmail}
                    </span>
                  </p>
                </article>

                {/* Contact persons */}
                <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] px-5 py-5">
                  <h4 className="text-lg font-black text-[#3c4d63] mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Người phụ trách
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                        Liên hệ sử dụng dịch vụ tuyển dụng
                      </p>
                      <p className="text-sm font-bold text-[#3c4d63]">
                        Ms. Hạ Phan
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                        Liên hệ để ứng tuyển
                      </p>
                      <p className="text-sm font-bold text-[#3c4d63]">
                        Ms. Mai Phương
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              {/* Social media links */}
              <div>
                <h4 className="text-lg font-black text-[#3c4d63] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Kênh truyền thông
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SocialLink
                    href={fanpageHref}
                    label={`Facebook: ${fanpageLabel}`}
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    }
                  />
                  <SocialLink
                    href={linkedinHref}
                    label={`LinkedIn: ${linkedinLabel}`}
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    }
                  />
                  {zaloHref && (
                    <SocialLink
                      href={zaloHref}
                      label="Zalo"
                      icon={
                        <span className="text-xs font-black">Zalo</span>
                      }
                    />
                  )}
                  {tiktokHref && (
                    <SocialLink
                      href={tiktokHref}
                      label="TikTok"
                      icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      }
                    />
                  )}
                  {threadHref && (
                    <SocialLink
                      href={threadHref}
                      label="Threads"
                      icon={
                        <span className="text-sm font-black">@</span>
                      }
                    />
                  )}
                  {instagramHref && (
                    <SocialLink
                      href={instagramHref}
                      label="Instagram"
                      icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      }
                    />
                  )}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden min-h-[280px] bg-white shadow-[0_12px_30px_-16px_rgba(15,23,42,0.25)]">
                {mapEmbedUrl ? (
                  <iframe
                    title="JobUp Map"
                    src={mapEmbedUrl}
                    className="w-full h-[320px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-[320px] flex items-center justify-center text-sm text-slate-500 bg-slate-50">
                    Bản đồ đang được cập nhật
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
