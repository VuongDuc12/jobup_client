"use client";

import type { ReactNode } from "react";
import { Footer, Navbar } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import BadgeText from "@/components/shared/BadgeText";
import { useSystemConfig } from "@/hooks/useSystemConfig";

const FALLBACK_ADDRESS_MAIN =
  "C23, Lô 18 KĐT Định Công, Phường Phương Liệt, Hà Nội";
const FALLBACK_PHONE = "0979334143";
const FALLBACK_EMAIL = "tuyendung@jobup.vn";
const EMPLOYER_LARK_FORM_URL =
  "https://ygm980ysfo1.sg.larksuite.com/share/base/form/shrlglGQjwpLLWYGHEhLmBS6Wlh";
const CANDIDATE_LARK_FORM_URL =
  "https://ygm980ysfo1.sg.larksuite.com/share/base/form/shrlgWVnS8s3XB5CmWCqdm0CpEh";

function toDisplayPhone(raw?: string | null): string {
  if (!raw || !raw.trim()) return FALLBACK_PHONE;
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("84") && digits.length >= 10) return `0${digits.slice(2)}`;
  if (digits.length === 10 && digits.startsWith("0")) return digits;
  return raw.replace(/^\+/, "");
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

function externalHref(raw?: string | null): string | null {
  return raw && raw !== "#" ? raw : null;
}

function CtaCard({
  eyebrow,
  title,
  description,
  benefits,
  href,
  buttonText,
  iconClass,
  variant,
}: {
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
  href: string;
  buttonText: string;
  iconClass: string;
  variant: "employer" | "candidate";
}) {
  const isEmployer = variant === "employer";
  const cardClass = isEmployer
    ? "from-brand-yellow via-[#f4bd35] to-[#d99f1f] text-brand-black shadow-[0_28px_70px_-32px_rgba(240,180,41,0.85)]"
    : "from-[#6B6A6D] via-[#5B5A5D] to-[#3F3E41] text-white shadow-[0_28px_70px_-32px_rgba(91,90,93,0.85)]";
  const buttonClass = isEmployer
    ? "bg-brand-black text-white hover:bg-white hover:text-brand-black shadow-[0_18px_40px_-18px_rgba(15,23,42,0.8)]"
    : "bg-brand-yellow text-brand-black hover:bg-white hover:text-brand-black shadow-[0_18px_40px_-18px_rgba(240,180,41,0.65)]";

  return (
    <article className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br p-6 sm:p-8 ${cardClass}`}>
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] opacity-80">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black uppercase leading-tight sm:text-3xl">
              {title}
            </h2>
          </div>
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl backdrop-blur-sm ${
              isEmployer ? "bg-white/20" : "bg-white/15 text-[#E5E7EB]"
            }`}
          >
            <i className={iconClass} />
          </span>
        </div>

        <p className="text-base font-semibold leading-relaxed opacity-85">
          {description}
        </p>

        <ul className="mt-6 space-y-3">
          {benefits.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm font-bold sm:text-base">
              <i className={`fa-solid ${isEmployer ? "fa-bolt" : "fa-rocket"} mt-1 shrink-0`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex min-h-14 items-center justify-center rounded-2xl px-6 text-center text-sm font-black uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 ${buttonClass}`}
        >
          {buttonText}
        </a>
      </div>
    </article>
  );
}

function SocialCard({
  href,
  title,
  description,
  icon,
  color,
  className = "",
}: {
  href: string | null;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  className?: string;
}) {
  const content = (
    <div className={`group h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${className}`}>
      <div className="flex min-w-0 items-start gap-4">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-white transition-transform duration-300 group-hover:scale-105"
          style={{ background: color }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-black leading-snug text-[#111827]">{title}</h3>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#475569]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  if (!href) return content;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </a>
  );
}

function ContactPersonCard({
  iconClass,
  title,
  name,
  phone,
  note,
}: {
  iconClass: string;
  title: string;
  name: string;
  phone: string;
  note: string;
}) {
  return (
    <a
      href={telHref(phone)}
      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-yellow hover:shadow-lg"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-yellow/15 text-brand-yellow">
        <i className={iconClass} />
      </span>
      <span>
        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
          {title}
        </span>
        <span className="mt-1 block text-lg font-black text-[#111827]">
          {name} - {phone}
        </span>
        <span className="mt-2 block text-sm font-medium leading-relaxed text-[#475569]">
          {note}
        </span>
      </span>
    </a>
  );
}

export default function ContactPageClient() {
  const { config } = useSystemConfig();
  const displayMainAddress = config.address?.trim() || FALLBACK_ADDRESS_MAIN;
  const displayPhone = toDisplayPhone(config.hotline);
  const displayEmail = config.email?.trim() || FALLBACK_EMAIL;
  const fanpageHref = externalHref(config.facebookUrl);
  const linkedinHref = externalHref(config.linkedInUrl);
  const zaloHref = externalHref(config.zaloUrl);
  const tiktokHref = externalHref(config.tiktokUrl);
  const threadHref = externalHref(config.threadUrl);
  const instagramHref = externalHref(config.instagramUrl);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-gradient-to-b from-[#fffdf8] via-white to-[#f8fafc] pt-32">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <section className="mb-10 text-center">
            <BadgeText
              text="Kết nối cùng JobUp"
              align="center"
              linePlacement="leading"
              containerClassName="mb-4 inline-flex"
            />
            <h1 className="text-3xl font-black uppercase leading-tight text-brand-black sm:text-4xl lg:text-5xl">
              Liên hệ chúng tôi
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base font-medium leading-relaxed text-[#3c4d63] sm:text-lg">
              Chọn đúng nhu cầu của bạn, JobUp sẽ đưa bạn đến kênh hỗ trợ nhanh nhất.
            </p>
          </section>

          <section className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <CtaCard
              eyebrow="Đối tác tuyển dụng"
              title="Dành cho Doanh nghiệp"
              description="Kết nối nhanh với đội ngũ tư vấn tuyển dụng để xây dựng nguồn ứng viên phù hợp."
              benefits={[
                "Tiếp cận +100.000 hồ sơ ứng viên chất lượng.",
                "Tối ưu thời gian và chi phí tuyển dụng.",
                "Đội ngũ chuyên viên hỗ trợ 24/7.",
              ]}
              href={EMPLOYER_LARK_FORM_URL}
              buttonText="Đăng ký tuyển dụng ngay"
              iconClass="fa-solid fa-building"
              variant="employer"
            />
            <CtaCard
              eyebrow="Tìm kiếm cơ hội"
              title="Dành cho Ứng viên"
              description="Gửi CV để được kết nối với cơ hội phù hợp và nhận tư vấn lộ trình nghề nghiệp."
              benefits={[
                "Kết nối trực tiếp với doanh nghiệp hàng đầu.",
                "Bảo mật thông tin hồ sơ 100%.",
                "Tư vấn lộ trình sự nghiệp miễn phí.",
              ]}
              href={CANDIDATE_LARK_FORM_URL}
              buttonText="Gửi CV - tìm việc làm ngay"
              iconClass="fa-solid fa-user-tie"
              variant="candidate"
            />
          </section>

          <section className="mb-12 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-soft sm:p-7 lg:p-8">
            <div className="mb-7">
              <BadgeText
                text="Kênh truyền thông"
                align="left"
                linePlacement="leading"
                containerClassName="mb-3"
              />
              <h2 className="text-2xl font-black uppercase text-brand-black sm:text-3xl">
                Gặp JobUp trên mọi nền tảng
              </h2>
              <p className="mt-2 max-w-3xl text-base font-medium text-[#475569]">
                Theo dõi các kênh chính thức để cập nhật tin tuyển dụng, mẹo nghề nghiệp và nhận hỗ trợ nhanh.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <SocialCard
                href={fanpageHref}
                title="Cộng đồng JobUp trên Facebook"
                description="Cập nhật tin tức tuyển dụng và mẹo công sở mỗi ngày (50k+ Follower)."
                color="#1877F2"
                className="xl:col-span-1"
                icon={<i className="fa-brands fa-facebook-f" />}
              />
              <SocialCard
                href={linkedinHref}
                title="Kết nối Doanh nghiệp tại LinkedIn"
                description="Không gian kết nối nhân sự cấp cao và cơ hội việc làm chuyên nghiệp."
                color="#0077B5"
                className="xl:col-span-1"
                icon={<i className="fa-brands fa-linkedin-in" />}
              />
              <SocialCard
                href={zaloHref}
                title="Hỗ trợ nhanh qua Zalo OA"
                description="Nhắn tin trực tiếp với chuyên viên tư vấn để được giải đáp trong 5 phút."
                color="#0068FF"
                className="xl:col-span-1"
                icon={<span className="text-xs font-black">Zalo</span>}
              />
              <SocialCard
                href={tiktokHref}
                title="Kênh Video TikTok JobUp"
                description="Xem short-video hướng dẫn phỏng vấn, sửa CV cực cuốn và hài hước."
                color="#000000"
                className="md:col-span-1 xl:col-span-1"
                icon={<i className="fa-brands fa-tiktok" />}
              />
              <SocialCard
                href={instagramHref || threadHref}
                title="Góc nhìn GenZ tại Instagram & Threads"
                description="Nơi chia sẻ trải nghiệm đi làm, văn hóa công sở của người trẻ."
                color="linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)"
                className="md:col-span-2 xl:col-span-2"
                icon={<i className="fa-brands fa-instagram" />}
              />
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
              <BadgeText
                text="Thông tin trực tiếp"
                align="left"
                linePlacement="leading"
                containerClassName="mb-3"
              />
              <h2 className="text-2xl font-black uppercase text-brand-black">
                Trụ sở chính & tổng đài
              </h2>
              <div className="mt-6 space-y-4">
                <p className="flex gap-3 text-base font-semibold leading-relaxed text-[#475569]">
                  <i className="fa-solid fa-location-dot mt-1 w-5 shrink-0 text-brand-yellow" />
                  <span>{displayMainAddress}</span>
                </p>
                <a
                  href={telHref(displayPhone)}
                  className="flex gap-3 text-base font-semibold text-[#475569] hover:text-brand-yellow"
                >
                  <i className="fa-solid fa-phone mt-1 w-5 shrink-0 text-brand-yellow" />
                  <span>{displayPhone}</span>
                </a>
                <a
                  href={`mailto:${displayEmail}`}
                  className="flex gap-3 text-base font-semibold text-[#475569] hover:text-brand-yellow"
                >
                  <i className="fa-solid fa-envelope mt-1 w-5 shrink-0 text-brand-yellow" />
                  <span>{displayEmail}</span>
                </a>
              </div>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-soft sm:p-8">
              <BadgeText
                text="Hotline phụ trách"
                align="left"
                linePlacement="leading"
                containerClassName="mb-3"
              />
              <h2 className="text-2xl font-black uppercase text-brand-black">
                Gọi đúng người, xử lý nhanh hơn
              </h2>
              <div className="mt-6 space-y-4">
                <ContactPersonCard
                  iconClass="fa-solid fa-user-tie"
                  title="Dịch vụ Doanh nghiệp"
                  name="Ms. Hạ Phan"
                  phone="0979334143"
                  note="Doanh nghiệp cần tư vấn giải pháp nhân sự, vui lòng gọi trực tiếp."
                />
                <ContactPersonCard
                  iconClass="fa-solid fa-user-graduate"
                  title="Hỗ trợ Ứng viên"
                  name="Ms. Mai Phương"
                  phone="0944549143"
                  note="Ứng viên gặp khó khăn khi tạo hồ sơ, hãy gọi ngay."
                />
              </div>
            </article>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
