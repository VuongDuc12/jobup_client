import Image from "next/image";
import { getAssetUrl } from "@/lib/utils";

const defaultImages = [
  {
    src: "/images/journey-team-collab.jpg",
    alt: "Đội ngũ JobUp làm việc nhóm",
  },
  {
    src: "/images/news-meeting.jpg",
    alt: "Cuộc họp chiến lược tuyển dụng",
  },
  {
    src: "/images/journey-office.jpg",
    alt: "Brainstorming giải pháp nhân sự",
  },
  {
    src: "/images/journey-workshop.jpg",
    alt: "Văn hóa doanh nghiệp JobUp",
  },
];

interface OurJourneySectionProps {
  badgeText?: string | null;
  title?: string | null;
  paragraph1?: string | null;
  paragraph2?: string | null;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
}

export default function OurJourneySection({
  badgeText,
  title,
  paragraph1,
  paragraph2,
  image1,
  image2,
  image3,
  image4,
}: OurJourneySectionProps) {
  const displayBadge = badgeText || "Hành trình";
  const displayTitle = title || "Tất cả bắt đầu từ một ý tưởng đơn giản.";
  const displayP1 =
    paragraph1 ||
    "Với nền tảng kinh nghiệm vững chắc trong lĩnh vực Quản trị Nhân sự và niềm đam mê kết nối con người, JobUp được thành lập để giải quyết bài toán tuyển dụng cho các doanh nghiệp vừa và nhỏ tại Việt Nam.";
  const displayP2 =
    paragraph2 ||
    "Ngày nay, chúng tôi hợp tác với các doanh nghiệp đa ngành — từ Công nghệ, Giáo dục, Làm đẹp, Chăm sóc sức khỏe, Thương mại điện tử, FMCG đến Sản xuất — biến mọi thách thức nhân sự thành kết quả đo lường được.";

  const images = [
    {
      src: getAssetUrl(image1) || defaultImages[0].src,
      alt: defaultImages[0].alt,
      offset: false,
    },
    {
      src: getAssetUrl(image2) || defaultImages[1].src,
      alt: defaultImages[1].alt,
      offset: true,
    },
    {
      src: getAssetUrl(image3) || defaultImages[2].src,
      alt: defaultImages[2].alt,
      offset: false,
    },
    {
      src: getAssetUrl(image4) || defaultImages[3].src,
      alt: defaultImages[3].alt,
      offset: true,
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-brand-yellow" />
              <span className="text-brand-yellow font-bold text-sm uppercase tracking-widest">
                {displayBadge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black leading-tight mb-8">
              {displayTitle}
            </h2>
            <p className="text-gray-500 leading-relaxed  text-justify">
              {displayP1}
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed text-justify">
              {displayP2}
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`aspect-video rounded-2xl overflow-hidden shadow-lg ${img.offset ? "mt-8" : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1600}
                  height={900}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
