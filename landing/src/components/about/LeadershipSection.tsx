import Image from "next/image";
import { getAssetUrl } from "@/lib/utils";

interface LeadershipSectionProps {
  badgeText?: string | null;
  title?: string | null;
  ceoRoleLabel?: string | null;
  ceoName?: string | null;
  ceoImage?: string | null;
  ceoAchievements?: string | null;
  advisorRoleLabel?: string | null;
  advisorName?: string | null;
  advisorImage?: string | null;
  advisorAchievements?: string | null;
}

export default function LeadershipSection({
  badgeText,
  title,
  ceoRoleLabel,
  ceoName,
  ceoImage,
  ceoAchievements,
  advisorRoleLabel,
  advisorName,
  advisorImage,
  advisorAchievements,
}: LeadershipSectionProps) {
  const displayBadge = badgeText || "Đội ngũ lãnh đạo";
  const displayTitle = title || "Những người dẫn dắt JobUp";
  const displayCeoRole = ceoRoleLabel || "CEO & Founder";
  const displayCeoName = ceoName || "Mrs. Ha Phan, MHRM";
  const displayCeoImage =
    getAssetUrl(ceoImage) || "/images/leadership-woman-1.jpg";
  const displayAdvisorRole = advisorRoleLabel || "Ban Cố Vấn";
  const displayAdvisorName = advisorName || "Mrs. Diep Nguyen Ngoc, MHRM";
  const displayAdvisorImage =
    getAssetUrl(advisorImage) || "/images/leadership-woman.jpg";

  return (
    <section className="py-16 bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-brand-yellow" />
            <span className="text-brand-yellow font-bold text-sm uppercase tracking-widest">
              {displayBadge}
            </span>
            <span className="w-8 h-px bg-brand-yellow" />
          </div>
          <h2 className="text-4xl font-extrabold text-brand-black">
            {displayTitle}
          </h2>
        </div>

        {/* CEO */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-20">
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={displayCeoImage}
              alt={`${displayCeoName} – ${displayCeoRole} JobUp`}
              width={600}
              height={800}
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-3">
            <span className="text-brand-yellow font-bold text-sm uppercase tracking-widest">
              {displayCeoRole}
            </span>
            <h3 className="text-3xl font-extrabold text-brand-black mt-2 mb-6">
              {displayCeoName}
            </h3>
            {ceoAchievements ? (
              <div className="space-y-3 text-gray-600">
                {ceoAchievements
                  ?.split(/<\/p>/i)
                  .map((item) =>
                    item
                      .replace(/<p>/i, "")
                      .replace(/<br\s*\/?>/gi, "")
                      .trim(),
                  )
                  .filter(Boolean)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 items-start leading-relaxed"
                    >
                      <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
              </div>
            ) : (
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    CEO tại <strong>JobUp</strong> – 10 năm kinh nghiệm trong
                    lĩnh vực Nhân sự
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    Nhà sáng lập Công ty Cổ phần DNXH{" "}
                    <strong>HR Companion</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    Cựu <strong>HRBP Manager</strong> tại Citigo | Cựu{" "}
                    <strong>HRBP</strong> tại TPBank
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    Giảng viên khóa &ldquo;Tuyển dụng thực tế cho người
                    mới&rdquo; tại <strong>Gitiho</strong> – 300+ học viên
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    Chuyên gia đào tạo &amp; tư vấn tuyển dụng cho{" "}
                    <strong>doanh nghiệp vừa và nhỏ</strong>
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Advisor */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <span className="text-brand-yellow font-bold text-sm uppercase tracking-widest">
              {displayAdvisorRole}
            </span>
            <h3 className="text-3xl font-extrabold text-brand-black mt-2 mb-6">
              {displayAdvisorName}
            </h3>
            {advisorAchievements ? (
              <div className="space-y-3 text-gray-600">
                {advisorAchievements
                  ?.split(/<\/p>/i) // tách từng đoạn </p>
                  .map((item) =>
                    item
                      .replace(/<p>/i, "") // bỏ <p>
                      .replace(/<br\s*\/?>/gi, "") // bỏ <br> nếu có
                      .trim(),
                  )
                  .filter((item) => item && item !== "") // bỏ rỗng
                  .map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
              </div>
            ) : (
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    Cố vấn tại <strong>JobUp</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    <strong>15 năm</strong> kinh nghiệm Quản lý Nhân sự tại Tập
                    đoàn <strong>Lotus, Vingroup, Seaferico</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check-circle text-brand-yellow mt-1 shrink-0" />
                  <span>
                    Nguyên Giảng viên{" "}
                    <strong>Khoa Quản trị nguồn nhân lực</strong>
                  </span>
                </li>
              </ul>
            )}
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={displayAdvisorImage}
              alt={`${displayAdvisorName} – ${displayAdvisorRole} JobUp`}
              width={600}
              height={800}
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
