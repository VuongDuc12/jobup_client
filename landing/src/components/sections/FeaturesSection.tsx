import type { FeatureResponse, StatisticResponse } from "@/lib/types";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAssetUrl } from "@/lib/utils";
import { useSystemConfig } from "@/hooks/useSystemConfig";

interface FeaturesSectionProps {
  features?: FeatureResponse[] | null;
  statistics?: StatisticResponse[] | null;
}

/* ── Fallback data when API returns nothing ── */
const defaultFeatures: {
  title: string;
  description: string;
  iconClass: string;
  imageUrl: string;
  tag1: string | null;
  tag2: string | null;
  linkUrl: string | null;
  buttonText: string | null;
}[] = [
  {
    title: "Công nghệ Match Job 4.0 ⚡",
    description:
      'Thuật toán thông minh tự động "ghép đôi" bạn với Job ngon dựa trên 50+ tiêu chí dữ liệu. Tìm việc chuẩn xác như tìm người yêu!',
    iconClass: "fa-solid fa-brain",
    imageUrl: "/images/feature-ai.jpg",
    tag1: "AI TECHNOLOGY",
    tag2: null,
    linkUrl: null,
    buttonText: null,
  },
  {
    title: 'Support "Không ngủ" 24/7',
    description:
      'Bạn thức, JobUp cũng thức! Đội ngũ CSKH nhiệt tình "cân" mọi thắc mắc, hỗ trợ tìm việc và nộp hồ sơ siêu tốc mọi khung giờ.',
    iconClass: "fa-solid fa-headset",
    imageUrl: "/images/feature-professional.jpg",
    tag1: null,
    tag2: null,
    linkUrl: "tel:0979334143",
    buttonText: "GỌI CHUYÊN GIA NGAY",
  },
  {
    title: 'CV Doctor - "Chữa bệnh" hồ sơ',
    description:
      'Nhận và "khám" CV miễn phí. Biến hồ sơ nhạt nhòa thành bản CV "sát thủ", đánh bại mọi đối thủ cạnh tranh.',
    iconClass: "fa-solid fa-file-signature",
    imageUrl: "/images/feature-document.jpg",
    tag1: null,
    tag2: null,
    linkUrl: "#",
    buttonText: "Trải nghiệm ngay",
  },
  {
    title: "Bí kíp Phỏng vấn & Deal lương",
    description:
      'Trang bị "vũ khí" tận răng: Bộ câu hỏi phỏng vấn thường gặp, mẹo deal lương khéo léo để bạn tự tin chinh phục mọi HR khó tính.',
    iconClass: "fa-solid fa-rocket",
    imageUrl: "/images/feature-handshake.jpg",
    tag1: null,
    tag2: null,
    linkUrl: "#",
    buttonText: "Khám phá bản đồ",
  },
];

const defaultStats = [
  { value: "3 Giây", label: "Tốc độ tìm việc" },
  { value: "24/7", label: "Hỗ trợ trực tuyến" },
  { value: "100%", label: "Bảo mật thông tin" },
  { value: "Free", label: "Tư vấn miễn phí" },
];

function parseLeadingNumber(raw: string) {
  const value = raw.trim();
  const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;

  const numberPart = match[1];
  const suffix = match[2] ?? "";
  const decimalPart = numberPart.split(/[.,]/)[1];

  return {
    target: Number(numberPart.replace(",", ".")),
    decimals: decimalPart ? decimalPart.length : 0,
    suffix,
  };
}

export default function FeaturesSection({
  features,
  statistics,
}: FeaturesSectionProps) {
  const { config } = useSystemConfig();
  const statsRef = useRef<HTMLDivElement | null>(null);
  const lastAnimatedKeyRef = useRef<string>("");
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const [statsVisible, setStatsVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.IntersectionObserver === "undefined",
  );

  // Build fallback features with dynamic hotline from config
  const fallbackFeatures = defaultFeatures.map((f) => {
    if (f.linkUrl === "tel:0979334143") {
      return { ...f, linkUrl: `tel:${config.hotline?.replace(/\D/g, "")}` };
    }
    return f;
  });

  const activeFeatures = useMemo(() => {
    if (!features || features.length === 0) return null;
    return [...features].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [features]);

  const activeStats = useMemo(() => {
    if (!statistics || statistics.length === 0) return null;
    return [...statistics]
      .filter((s) => s.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [statistics]);

  /* Map API features to a uniform shape (first 4) */
  const items = useMemo(
    () =>
      activeFeatures
        ? activeFeatures.slice(0, 4).map((f) => ({
            title: f.title,
            description: f.description || "",
            iconClass: f.iconClass || "fa-solid fa-star",
            imageUrl: getAssetUrl(f.imageUrl),
            tag1: f.tag1,
            tag2: f.tag2,
            linkUrl: f.linkUrl,
            buttonText: f.buttonText,
          }))
        : fallbackFeatures,
    [activeFeatures, fallbackFeatures],
  );

  const stats = useMemo(
    () =>
      activeStats
        ? activeStats.map((s) => ({
            value: s.numberText || "",
            label: s.label || "",
          }))
        : defaultStats,
    [activeStats],
  );

  const parsedStats = useMemo(
    () => stats.map((stat) => parseLeadingNumber(stat.value)),
    [stats],
  );

  const statsAnimationKey = useMemo(
    () =>
      parsedStats
        .map((parsed) =>
          parsed
            ? `${parsed.target}|${parsed.decimals}|${parsed.suffix}`
            : "non-numeric",
        )
        .join("||"),
    [parsedStats],
  );

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    if (lastAnimatedKeyRef.current === statsAnimationKey) return;

    lastAnimatedKeyRef.current = statsAnimationKey;

    let frameId = 0;
    const duration = 1200;
    const startAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startAt;

      const nextValues = parsedStats.map((parsed, idx) => {
        if (!parsed) return 0;

        const localElapsed = Math.max(0, elapsed - idx * 120);
        const progress = Math.min(1, localElapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        return parsed.target * eased;
      });

      setAnimatedValues(nextValues);

      const isDone = parsedStats.every((parsed, idx) => {
        if (!parsed) return true;
        return elapsed - idx * 120 >= duration;
      });

      if (!isDone) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [parsedStats, statsAnimationKey, statsVisible]);

  return (
    <section id="features" className="landing-section bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-amber-50/50 rounded-full blur-[120px] -z-10 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px] -z-10 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center landing-section-header">
          <span className="text-[#B45309] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
            Giải pháp toàn diện
          </span>
          <h2 className="text-3xl md:text-5xl font-[1000] text-[#111827] mb-5 tracking-tight">
            Hệ sinh thái{" "}
            <span className="text-brand-yellow">Hỗ Trợ Toàn Diện</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Không chỉ dừng lại ở việc kết nối, JobUp đồng hành cùng bạn trên
            từng bước ngoặt sự nghiệp với dịch vụ tuyển dụng hàng đầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature 1 — wide card (2 cols) */}
          {items[0] && (
            <div className="md:col-span-2 bg-[#FAFAFA] rounded-[3rem] p-1 lg:p-1.5 border border-gray-100 hover:border-brand-yellow hover:shadow-[0_40px_80px_-20px_rgba(245,185,20,0.15)] transition-all duration-700 group relative overflow-hidden">
              <div className="bg-white rounded-[2.8rem] p-8 lg:p-10 h-full relative overflow-hidden">
                {items[0].imageUrl && (
                  <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                    <Image
                      src={items[0].imageUrl}
                      alt={items[0].title}
                      fill
                      sizes="400px"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="relative z-10 max-w-md">
                  {items[0].tag1 && (
                    <div className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm mb-4">
                      <span className="w-8 h-[2px] bg-brand-yellow" />{" "}
                      {items[0].tag1}
                    </div>
                  )}
                  <h3 className="text-3xl font-black text-[#111827] mb-4 leading-tight">
                    {items[0].title}
                  </h3>
                  <p className="text-gray-500 mb-8 leading-relaxed text-lg font-light italic">
                    &ldquo;{items[0].description}&rdquo;
                  </p>
                  {/* Analytical UI */}
                </div>
              </div>
            </div>
          )}

          {/* Feature 2 — tall dark card */}
          {items[1] && (
            <div className="md:row-span-2 bg-[#111827] rounded-[3rem] p-1 border border-gray-800 hover:shadow-2xl transition-all duration-700 group overflow-hidden">
              <div className="bg-gray-900/40 rounded-[2.9rem] p-8 lg:p-10 h-full flex flex-col relative overflow-hidden">
                {items[1].imageUrl && (
                  <Image
                    src={items[1].imageUrl}
                    alt={items[1].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                    loading="lazy"
                    unoptimized
                  />
                )}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-inner mb-8">
                    <i
                      className={`${items[1].iconClass} text-2xl text-brand-yellow`}
                    />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">
                    {items[1].title}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed font-light">
                    {items[1].description}
                  </p>
                  <div className="mt-auto space-y-4">
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-[1.5rem] rounded-tl-none border border-white/5 self-start max-w-[90%] transform -rotate-1">
                      <p className="text-xs text-gray-200">
                        Em cần tối ưu CV ngành Tech ạ?
                      </p>
                    </div>
                    <div className="bg-brand-yellow text-[#111827] p-4 rounded-[1.5rem] rounded-tr-none self-end max-w-[90%] ml-auto shadow-2xl shadow-brand-yellow transform rotate-1">
                      <p className="text-xs font-bold leading-relaxed italic">
                        &ldquo;JobUp đã lọc ra Job ngon đúng ý bạn. Apply luôn
                        kẻo lỡ nhé! 🚀&rdquo;
                      </p>
                    </div>
                    {items[1].linkUrl && (
                      <a
                        href={items[1].linkUrl}
                        className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#111827] rounded-[1.5rem] font-black text-sm mt-8 hover:bg-brand-yellow transition-all shadow-xl hover:-translate-y-1"
                      >
                        {items[1].buttonText || "GỌI CHUYÊN GIA NGAY"}{" "}
                        <i className="fa-solid fa-phone-volume" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 3 — light card */}
          {items[2] && (
            <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {items[2].imageUrl && (
                <Image
                  src={items[2].imageUrl}
                  alt={items[2].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-5 group-hover:opacity-15 transition-opacity duration-700"
                  loading="lazy"
                  unoptimized
                />
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <i
                    className={`${items[2].iconClass} text-xl text-blue-600 group-hover:text-white`}
                  />
                </div>
                <h3 className="text-xl font-black text-[#111827] mb-3">
                  {items[2].title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {items[2].description}
                </p>
                {items[2].linkUrl && (
                  <a
                    href={items[2].linkUrl}
                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm group/link"
                  >
                    {items[2].buttonText || "Trải nghiệm ngay"}{" "}
                    <i className="fa-solid fa-arrow-right-long group-hover/link:translate-x-2 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Feature 4 — yellow accent card */}
          {items[3] && (
            <div className="bg-gradient-to-br from-brand-yellow to-brand-yellow rounded-[3rem] p-8 text-white shadow-2xl shadow-brand-yellow hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {items[3].imageUrl && (
                <Image
                  src={items[3].imageUrl}
                  alt={items[3].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-20 group-hover:scale-120 group-hover:opacity-40 transition-all duration-1000"
                  loading="lazy"
                  unoptimized
                />
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${items[3].iconClass} text-xl text-white`} />
                </div>
                <h3 className="text-xl font-black mb-3">{items[3].title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {items[3].description}
                </p>
                {items[3].linkUrl && (
                  <a
                    href={items[3].linkUrl}
                    className="inline-flex items-center gap-2 text-white font-black text-sm group/link"
                  >
                    {items[3].buttonText || "Khám phá"}{" "}
                    <i className="fa-solid fa-map-location-dot group-hover/link:scale-125 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 md:pt-9 border-t border-amber-100"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center rounded-2xl border border-amber-100/70 bg-gradient-to-br from-white to-amber-50/60 px-3 py-5 md:py-6 shadow-[0_10px_30px_-20px_rgba(245,158,11,0.55)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_20px_45px_-22px_rgba(245,158,11,0.65)] opacity-100 translate-y-0"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-1 tracking-tight">
                {(() => {
                  const parsed = parsedStats[idx];
                  if (!parsed) return stat.value;

                  const current = animatedValues[idx] ?? 0;
                  const value =
                    parsed.decimals > 0
                      ? current.toFixed(parsed.decimals)
                      : String(Math.round(current));

                  return `${value}${parsed.suffix}`;
                })()}
              </div>
              <div className="mx-auto mb-2 h-0.5 w-8 rounded-full bg-brand-yellow/70" />
              <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-[0.16em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
