import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import { getAssetUrl } from "@/lib/utils";

interface DifferenceSectionProps {
  badgeText?: string | null;
  title?: string | null;
  subtitle?: string | null;
  image?: string | null;
  heading1?: string | null;
  paragraph1?: string | null;
  heading2?: string | null;
  paragraph2?: string | null;
  statIcon?: string | null;
  statTitle?: string | null;
  statSubtitle?: string | null;
}

export default function DifferenceSection({
  badgeText,
  title,
  subtitle,
  image,
  heading1,
  paragraph1,
  heading2,
  paragraph2,
  statIcon,
  statTitle,
  statSubtitle,
}: DifferenceSectionProps) {
  const displayBadge = badgeText || "Điểm khác biệt";
  const displayTitle = title || "Điều gì làm nên sự khác biệt?";
  const displaySubtitle =
    subtitle ||
    "Chúng tôi không chỉ tìm ứng viên — chúng tôi kiến tạo giải pháp nhân sự bền vững.";
  const displayImage =
    getAssetUrl(image) ||
    "/images/leadership-woman-1.jpg";
  const displayH1 =
    heading1 || "Chúng tôi tập trung vào kết quả thực, không chỉ hồ sơ.";
  const displayP1 =
    paragraph1 ||
    "Công việc của chúng tôi không dừng lại khi gửi CV — mà khi doanh nghiệp tìm được đúng người, đúng thời điểm, và ứng viên bắt đầu công việc mới thành công.";
  const displayH2 = heading2 || "Chiến lược dẫn đầu, thiết kế vì tác động.";
  const displayP2 =
    paragraph2 ||
    "Mọi giải pháp tuyển dụng của JobUp đều dựa trên sự thấu hiểu sâu sắc về ngành, văn hóa doanh nghiệp và kỳ vọng ứng viên — tạo nên sự kết nối có ý nghĩa và bền vững.";
  const displayStatIcon = statIcon || "fa-solid fa-handshake";
  const displayStatTitle = statTitle || "100+ doanh nghiệp đối tác";
  const displayStatSubtitle =
    statSubtitle || "Trong 15+ ngành nghề trên khắp Việt Nam";

  return (
    <section className="py-16  bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          badge={displayBadge}
          title={displayTitle}
          description={displaySubtitle}
          align="center"
          className="mb-20"
        />

        {/* Block: Image left, content right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center ">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={displayImage}
              alt="Mrs. Ha Phan - CEO & Founder JobUp, chuyên gia tư vấn tuyển dụng"
              width={800}
              height={600}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-brand-black mb-4">
              {displayH1}
            </h3>
            <p className="text-gray-500 leading-relaxed mb-6">{displayP1}</p>
            <h3 className="text-3xl font-extrabold text-brand-black mb-4">
              {displayH2}
            </h3>
            <p className="text-gray-500 leading-relaxed mb-8">{displayP2}</p>

            {/* Stat Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center shrink-0">
                  <i
                    className={`${displayStatIcon} text-brand-yellow text-xl`}
                  />
                </div>
                <div>
                  <p className="font-extrabold text-brand-black">
                    {displayStatTitle}
                  </p>
                  <p className="text-sm text-gray-400">{displayStatSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
