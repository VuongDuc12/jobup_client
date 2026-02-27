import Image from "next/image";
import type { PartnerResponse, ProvinceDropdown } from "@/lib/types";

const partnerLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    alt: "Google",
    height: "h-5",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png",
    alt: "Meta",
    height: "h-6",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
    alt: "Microsoft",
    height: "h-5",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    alt: "Amazon",
    height: "h-5",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    alt: "Netflix",
    height: "h-4",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/2048px-Linkedin_icon.svg.png",
    alt: "LinkedIn",
    height: "h-6",
  },
];

const trendingKeywords = ["Java Spring", "AI/ML", "Product Manager", "Remote"];

interface HeroSectionProps {
  badgeText?: string | null;
  title1?: string | null;
  titleHighlight?: string | null;
  subtitle?: string | null;
  heroImage?: string | null;
  partners?: PartnerResponse[] | null;
  provinces?: ProvinceDropdown[] | null;
}

export default function HeroSection({
  badgeText,
  title1,
  titleHighlight,
  subtitle,
  heroImage,
  partners,
  provinces,
}: HeroSectionProps) {
  const partnerItems =
    partners && partners.length > 0
      ? partners
          .filter((item) => item.logoUrl)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => ({
            src: item.logoUrl as string,
            alt: item.name || "Partner",
            height: "h-6",
          }))
      : partnerLogos;

  return (
    <section
      id="hero"
      className="relative min-h-screen  pb-16 overflow-hidden bg-[#FFFDF8] "
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#111827 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/40 to-yellow-50/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-100/50 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: 5/7 Split */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-180px)]">
          {/* LEFT CONTENT (5 Columns) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex mt-7 mb-2 items-center self-start gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200/60 shadow-[0_2px_20px_rgba(180,83,9,0.1)] text-[#B45309] font-semibold text-xs uppercase tracking-wider mb-8 hover:shadow-[0_4px_30px_rgba(180,83,9,0.18)] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B45309]" />
              </span>
              {badgeText || "Top #1 Nền tảng Tuyển dụng 2026"}
            </div>

            {/* Main Heading */}
            <h1 className="mb-6">
              <span className="block text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold text-[#111827] leading-[1.1] tracking-tight">
                {title1 || "Khơi Nguồn"}
              </span>
              <span className="block text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.1] tracking-tight mt-1">
                <span className="text-brand-yellow">
                  {titleHighlight || "Sự Nghiệp Vàng"}
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-[#4B5563] leading-[1.7] font-light max-w-md mb-8">
              {subtitle ||
                "Kết nối ứng viên tài năng với hơn 15,000+ cơ hội nghề nghiệp tại các tập đoàn hàng đầu Việt Nam."}
            </p>

            {/* Search Form */}
            <form
              action="/tuyen-dung"
              className="bg-white p-2 md:p-2.5 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mt-0 hero-search-form"
            >
              <div className="flex-grow flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-100">
                <i className="fa-solid fa-magnifying-glass text-gray-400 mr-3" />
                <input
                  name="keyword"
                  type="text"
                  placeholder="Tên công việc, vị trí..."
                  className="w-full py-2 focus:outline-none text-gray-700 bg-transparent text-sm"
                />
              </div>
              <div className="flex-grow flex items-center px-4">
                <i className="fa-solid fa-location-dot text-gray-400 mr-3" />
                <select
                  name="provinceId"
                  className="w-full py-2 focus:outline-none text-gray-700 bg-transparent appearance-none text-sm focus:ring-0"
                >
                  <option value="">Tất cả địa điểm</option>
                  {(provinces || []).map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-brand-yellow text-brand-black font-bold px-8 py-3 rounded-xl md:rounded-full hover:bg-brand-black hover:text-white transition-all text-sm whitespace-nowrap cursor-pointer"
              >
                Tìm kiếm
              </button>
            </form>

            {/* Trending Keywords */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500 font-medium">Hot:</span>
              {trendingKeywords.map((keyword) => (
                <a
                  key={keyword}
                  href="#"
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 font-medium text-xs hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200"
                >
                  {keyword}
                </a>
              ))}
            </div>

            {/* Partner Logos */}
            <div className="relative z-10 mt-12 lg:mt-0 pt-12 border-t border-slate-100/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
                  Được tin tưởng bởi 500+ doanh nghiệp hàng đầu
                </p>
                <div className="relative overflow-hidden mask-image-gradient pb-4">
                  <div className="flex gap-16 items-center animate-loop-scroll whitespace-nowrap">
                    {/* First set */}
                    {partnerItems.map((logo, idx) => (
                      <img
                        key={`a-${idx}`}
                        src={logo.src}
                        className={`${logo.height} w-auto opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0`}
                        alt={logo.alt}
                        loading="lazy"
                      />
                    ))}
                    {/* Duplicate for seamless loop */}
                    {partnerItems.map((logo, idx) => (
                      <img
                        key={`b-${idx}`}
                        src={logo.src}
                        className={`${logo.height} w-auto opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0`}
                        alt={logo.alt}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL (7 Columns) */}
          <div className="col-span-12 lg:col-span-7 relative order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Main Image Container */}
            <div className="relative w-full max-w-[560px]">
              {/* Background Decorations */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/50 to-slate-100/30 rounded-[2.5rem] rotate-2 -z-10" />
              <div className="absolute -inset-6 border-2 border-dashed border-amber-200/40 rounded-[2.5rem] -rotate-3 -z-10" />

              {/* Main Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-[6px] ring-white">
                <img
                  src={heroImage || "/hero-image.jpg"}
                  alt="Chuyên viên tuyển dụng JobUp"
                  className="w-full h-auto object-cover aspect-[4/5] hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Card 1: Tìm Việc Ngay */}
              <div
                className="absolute -left-6 lg:-left-16 top-12 animate-float-slow group/card cursor-pointer"
                style={{ animationDelay: "0s" }}
              >
                <div className="relative bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-[1px] rounded-[1.5rem] shadow-[0_25px_60px_-15px_rgba(245,158,11,0.4)] hover:shadow-[0_30px_70px_-15px_rgba(245,158,11,0.5)] transition-all duration-500">
                  <div className="bg-white/95 backdrop-blur-xl rounded-[1.4rem] px-5 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-amber-500 blur-lg opacity-40 group-hover/card:opacity-70 transition-opacity animate-pulse" />
                          <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover/card:scale-110 transition-transform duration-300">
                            <i className="fa-solid fa-magnifying-glass text-white text-lg" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-[#111827] tracking-tight leading-tight">
                            TÌM VIỆC NGAY!
                          </h4>
                          <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                            15,400+ cơ hội
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-100/50">
                        <i className="fa-solid fa-arrow-right text-amber-600 group-hover/card:translate-x-1 transition-transform" />
                        <span>Khám phá việc làm hot</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Gửi CV Ngay */}
              <div
                className="absolute -right-4 lg:-right-12 bottom-44 animate-float-slow group/card cursor-pointer"
                style={{ animationDelay: "-2s" }}
              >
                <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-[1px] rounded-[1.5rem] shadow-[0_25px_60px_-15px_rgba(16,185,129,0.4)] hover:shadow-[0_30px_70px_-15px_rgba(16,185,129,0.5)] transition-all duration-500">
                  <div className="bg-white/95 backdrop-blur-xl rounded-[1.4rem] px-5 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="relative w-12 h-12 group-hover/card:scale-110 transition-transform duration-300">
                            <Image
                              src="/Icon_of_Zalo.svg"
                              width={48}
                              height={48}
                              className="w-12 h-12 object-contain"
                              alt="Zalo"
                            />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-[#111827] tracking-tight leading-tight">
                            GỬI CV NGAY
                          </h4>
                          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                            Miễn phí tư vấn
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-100/50">
                        <div className="flex -space-x-2">
                          <img
                            src="https://ui-avatars.com/api/?name=HR&background=10b981&color=fff"
                            className="w-4 h-4 rounded-full border border-white"
                            alt="HR"
                          />
                          <img
                            src="https://ui-avatars.com/api/?name=JD&background=3b82f6&color=fff"
                            className="w-4 h-4 rounded-full border border-white"
                            alt="HR"
                          />
                        </div>
                        <span>Nhận tư vấn 1-1 miễn phí</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Liên Hệ Ngay */}
              <div
                className="absolute -left-2 lg:-left-8 bottom-20 animate-float-slow hidden sm:block group/card cursor-pointer"
                style={{ animationDelay: "-4s" }}
              >
                <a
                  href="tel:0979334143"
                  className="block relative bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-[1px] rounded-[1.5rem] shadow-[0_25px_60px_-15px_rgba(139,92,246,0.4)] hover:shadow-[0_30px_70px_-15px_rgba(139,92,246,0.5)] transition-all duration-500"
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-[1.4rem] px-4 py-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-violet-500 blur-lg opacity-40 group-hover/card:opacity-70 transition-opacity animate-pulse" />
                        <div className="relative w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover/card:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-headset text-white text-base" />
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500 border-2 border-white" />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-black text-[#111827] tracking-tight leading-tight">
                          0979.334.143
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <p className="text-[10px] text-violet-600 font-bold uppercase tracking-wider">
                            Hotline 24/7
                          </p>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-amber-600">
                          <i className="fa-solid fa-phone text-[9px]" />
                          <span className="text-[9px] font-bold uppercase">
                            Ấn để gọi ngay
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
