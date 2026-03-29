"use client";

import { FormEvent, useMemo, useState } from "react";
import { Footer, Navbar } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import { useSystemConfig } from "@/hooks/useSystemConfig";
import { createEmployerContactPublic } from "@/lib/api";

const FALLBACK_ADDRESS_MAIN =
  "C23, Lô 18 KĐT Định Công, Phường Phương Liệt, Hà Nội";
const FALLBACK_ADDRESS_OFFICE =
  "VPGD: Tòa nhà 29T1 Hoàng Đạo Thúy, Phường Yên Hòa, Hà Nội";
const FALLBACK_PHONE = "+84 979334143";
const FALLBACK_EMAIL = "tuyendung@jobup.vn";
const FALLBACK_FANPAGE = "jobup.vn";
const FALLBACK_LINKEDIN = "JobUp";
const FALLBACK_MAP: string | null = null;

type ContactFormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
};

function toDisplayPhone(raw?: string | null): string {
  if (!raw || !raw.trim()) return FALLBACK_PHONE;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) {
    return `+84 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return raw;
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

  // API may return a full iframe tag instead of a plain URL.
  if (value.includes("<iframe")) {
    const srcMatch = value.match(/src\s*=\s*"([^"]+)"/i);
    if (srcMatch?.[1]) return srcMatch[1];

    const singleQuoteSrcMatch = value.match(/src\s*=\s*'([^']+)'/i);
    if (singleQuoteSrcMatch?.[1]) return singleQuoteSrcMatch[1];
  }

  return value;
}

export default function ContactPageClient() {
  const { config } = useSystemConfig();
  const [form, setForm] = useState<ContactFormState>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const displayMainAddress = config.address?.trim() || FALLBACK_ADDRESS_MAIN;
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const companyName = form.companyName.trim();
    const contactName = form.contactName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!companyName || !contactName || !email) {
      setSubmitSuccess(null);
      setSubmitError(
        "Vui lòng nhập đầy đủ Tên doanh nghiệp, Người liên hệ và Email.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await createEmployerContactPublic({
        companyName,
        contactName,
        email,
        phone: phone || undefined,
        message: message || undefined,
      });

      setSubmitSuccess(
        "Gửi thông tin thành công. JobUp sẽ liên hệ với bạn sớm nhất.",
      );
      setForm({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      const messageText =
        error instanceof Error && error.message
          ? error.message
          : "Gửi thông tin thất bại. Vui lòng thử lại sau.";
      setSubmitError(messageText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-gradient-to-b from-[#f8fafc] via-white to-[#fff8e7] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <section className="lg:col-span-6 min-w-0 rounded-3xl border border-slate-200/70 bg-white/90 shadow-soft p-5 sm:p-7 lg:p-8">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-3">
                Kết nối cùng JobUp
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-black mb-2 uppercase leading-tight">
                Liên hệ chúng tôi
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold text-[#3c4d63] mb-5">
                Tìm ứng viên - tìm đến JobUp!
              </h3>
              <div className="w-full h-px bg-slate-200 relative mb-8">
                <span className="absolute left-0 -top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[#334155] mb-2 font-semibold text-sm sm:text-base">
                    Tên doanh nghiệp <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={form.companyName}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all focus:border-brand-yellow focus:ring-2 focus:ring-[#f0b429]/20"
                    placeholder="Nhập tên doanh nghiệp"
                  />
                </div>

                <div>
                  <label className="block text-[#334155] mb-2 font-semibold text-sm sm:text-base">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all focus:border-brand-yellow focus:ring-2 focus:ring-[#f0b429]/20"
                    placeholder="Nhập email liên hệ"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#334155] mb-2 font-semibold text-sm sm:text-base">
                      Người liên hệ <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={form.contactName}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contactName: e.target.value,
                        }))
                      }
                      className="w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all focus:border-brand-yellow focus:ring-2 focus:ring-[#f0b429]/20"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-[#334155] mb-2 font-semibold text-sm sm:text-base">
                      Số điện thoại <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all focus:border-brand-yellow focus:ring-2 focus:ring-[#f0b429]/20"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#334155] mb-2 font-semibold text-sm sm:text-base">
                    Thông tin thêm
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    rows={8}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-brand-yellow focus:ring-2 focus:ring-[#f0b429]/20"
                    placeholder="Mô tả nhu cầu tuyển dụng hoặc nội dung bạn muốn tư vấn"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-yellow px-8 h-12 text-white font-bold hover:bg-brand-yellow-hover transition-colors uppercase shadow-[0_10px_30px_-12px_rgba(240,180,41,0.7)]"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
                </button>

                {submitError && (
                  <p className="text-sm font-medium text-red-600">
                    {submitError}
                  </p>
                )}

                {submitSuccess && (
                  <p className="text-sm font-medium text-emerald-600">
                    {submitSuccess}
                  </p>
                )}
              </form>
            </section>

            <section className="lg:col-span-6 min-w-0 rounded-3xl border border-slate-200/70 bg-white/90 shadow-soft p-5 sm:p-7 lg:p-8">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-3">
                Thông tin liên hệ
              </p>
              <h3 className="text-3xl sm:text-4xl font-black text-brand-black mb-4 uppercase leading-tight">
                Tìm việc - tìm đến JobUp
              </h3>
              <div className="w-full h-px bg-slate-200 relative mb-8">
                <span className="absolute left-0 -top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow" />
              </div>

              <div className="space-y-4">
                <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-4 sm:px-5 sm:py-5">
                  <h4 className="text-xl sm:text-2xl font-black text-[#3c4d63] mb-2">
                    Địa chỉ
                  </h4>
                  <p className="text-[#3c4d63] text-base leading-relaxed break-words">
                    {displayMainAddress}
                  </p>
                  <p className="text-[#3c4d63] text-base leading-relaxed mt-2 break-words">
                    {displayOfficeAddress}
                  </p>
                </article>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-4 sm:px-5 sm:py-5">
                    <h4 className="text-xl sm:text-2xl font-black text-[#3c4d63] mb-2">
                      Liên hệ
                    </h4>
                    <p className="text-[#3c4d63] text-base">
                      Phone:{" "}
                      <span className="font-medium text-[#d89e00]">
                        {displayPhone}
                      </span>
                    </p>
                    <p className="text-[#3c4d63] text-base mt-2">
                      Email:{" "}
                      <span className="font-medium text-[#d89e00]">
                        {displayEmail}
                      </span>
                    </p>
                  </article>

                  <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-4 sm:px-5 sm:py-5">
                    <h4 className="text-xl sm:text-2xl font-black text-[#3c4d63] mb-2">
                      Mạng xã hội
                    </h4>
                    <p className="text-[#3c4d63] text-base">
                      Fanpage:{" "}
                      {fanpageHref ? (
                        <a
                          href={fanpageHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#d89e00] hover:underline"
                        >
                          {fanpageLabel}
                        </a>
                      ) : (
                        <span className="font-medium text-[#d89e00]">
                          {fanpageLabel}
                        </span>
                      )}
                    </p>
                    <p className="text-[#3c4d63] text-base mt-2">
                      LinkedIn:{" "}
                      {linkedinHref ? (
                        <a
                          href={linkedinHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#d89e00] hover:underline"
                        >
                          {linkedinLabel}
                        </a>
                      ) : (
                        <span className="font-medium text-[#d89e00]">
                          {linkedinLabel}
                        </span>
                      )}
                    </p>
                  </article>
                </div>

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
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
