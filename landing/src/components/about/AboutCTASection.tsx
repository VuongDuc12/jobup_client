import Link from "next/link";
import { useSystemConfig } from "@/hooks/useSystemConfig";

interface AboutCTASectionProps {
  title?: string | null;
  description?: string | null;
  button1Text?: string | null;
  button1Url?: string | null;
  button2Text?: string | null;
  button2Url?: string | null;
}

export default function AboutCTASection({
  title,
  description,
  button1Text,
  button1Url,
  button2Text,
  button2Url,
}: AboutCTASectionProps) {
  const { config } = useSystemConfig();
  const zaloFallback =
    config.zaloUrl && config.zaloUrl !== "#"
      ? config.zaloUrl
      : config.hotline
        ? `https://zalo.me/${config.hotline.replace(/\D/g, "")}`
        : "https://zalo.me/0979334143";
  const displayTitle = title || "Sẵn sàng bắt đầu cùng JobUp?";
  const displayDescription =
    description ||
    "Dù bạn là ứng viên hay doanh nghiệp, chúng tôi luôn sẵn sàng hỗ trợ nhanh nhất.";
  const displayBtn1Text = button1Text || "Xem việc làm";
  const displayBtn1Url = button1Url || "/tuyen-dung";
  const displayBtn2Text = button2Text || "Liên hệ tư vấn";
  const displayBtn2Url = button2Url || zaloFallback;

  const isExternalBtn2 =
    displayBtn2Url.startsWith("http") || displayBtn2Url.startsWith("mailto:");

  return (
    <section className="landing-section-compact bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-brand-yellow rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
            <span className="text-[5rem] md:text-[12rem] font-extrabold text-brand-black">
              JOBUP
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-brand-black mb-5 md:mb-6 relative z-10">
            {displayTitle}
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10 relative z-10">
            {displayDescription}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 relative z-10">
            <Link
              href={displayBtn1Url}
              className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-brand-black text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl"
            >
              {displayBtn1Text}
            </Link>
            {isExternalBtn2 ? (
              <a
                href={displayBtn2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white text-brand-black font-bold rounded-full hover:bg-brand-black hover:text-white transition-all shadow-lg"
              >
                {displayBtn2Text}
              </a>
            ) : (
              <Link
                href={displayBtn2Url}
                className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white text-brand-black font-bold rounded-full hover:bg-brand-black hover:text-white transition-all shadow-lg"
              >
                {displayBtn2Text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
