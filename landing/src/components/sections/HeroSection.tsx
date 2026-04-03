import Image from "next/image";
import Link from "next/link";
import BadgeText from "@/components/shared/BadgeText";
import type { PartnerResponse, ProvinceDropdown } from "@/lib/types";
import { useSystemConfig } from "@/hooks/useSystemConfig";
import { getAssetUrl } from "@/lib/utils";

const partnerLogos = [
  {
    src: "/images/google-logo.svg",
    alt: "Google",
    height: "h-5",
  },
  {
    src: "/images/meta-logo.svg",
    alt: "Meta",
    height: "h-6",
  },
  {
    src: "/images/microsoft-logo.svg",
    alt: "Microsoft",
    height: "h-5",
  },
  {
    src: "/images/amazon-logo.svg",
    alt: "Amazon",
    height: "h-5",
  },
  {
    src: "/images/netflix-logo.svg",
    alt: "Netflix",
    height: "h-4",
  },
  {
    src: "/images/linkedin-logo.svg",
    alt: "LinkedIn",
    height: "h-6",
  },
];

const trendingKeywords = ["Nhân sự", "Kế toán", "Marketing", "Sale"];

interface HeroSearchPayload {
  keyword: string;
  provinceId: string;
  categoryId: string;
  salaryFrom: string;
  salaryTo: string;
  experience: string;
  workType: string;
  sortBy: string;
}

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
  const { config } = useSystemConfig();

  const zaloLink =
    config.zaloUrl ||
    (config.hotline
      ? `https://zalo.me/${config.hotline.replace(/\D/g, "")}`
      : "#");

  const hotlineValue = config.hotline || "0979334143";
  const hotlineDisplay = hotlineValue.replace(
    /(\d{4})(\d{3})(\d{3})/,
    "$1.$2.$3",
  );
  const heroImageSrc = getAssetUrl(heroImage) || "/hero-image.jpg";

  const partnerItems =
    partners && partners.length > 0
      ? partners
          .filter((item) => Boolean(item.logoUrl))
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .flatMap((item) => {
            if (!item.logoUrl) {
              return [];
            }

            return [
              {
                src: getAssetUrl(item.logoUrl) || item.logoUrl,
                alt: item.name || "Partner",
                height: "h-6",
              },
            ];
          })
      : partnerLogos;

  const createSearchPayload = (
    keyword: string,
    provinceId: string,
  ): HeroSearchPayload => ({
    keyword,
    provinceId,
    categoryId: "",
    salaryFrom: "",
    salaryTo: "",
    experience: "",
    workType: "",
    sortBy: "newest",
  });

  const persistJobsFilters = (payload: HeroSearchPayload) => {
    try {
      sessionStorage.setItem("jobup_jobs_filters", JSON.stringify(payload));
      return true;
    } catch {
      return false;
    }
  };

  const redirectToJobs = (payload: HeroSearchPayload) => {
    persistJobsFilters(payload);
    window.location.href = "/tuyen-dung";
  };

  const handleHeroSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const keyword = String(formData.get("keyword") || "").trim();
    const provinceId = String(formData.get("provinceId") || "").trim();

    redirectToJobs(createSearchPayload(keyword, provinceId));
  };

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] overflow-hidden bg-[#FFFDF8] md:min-h-[90vh]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#111827 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="pointer-events-none absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-100/40 to-yellow-50/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-slate-100/50 to-transparent blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-150px)] grid-cols-12 items-center gap-8 py-8 sm:py-10 md:min-h-[calc(100vh-180px)] lg:gap-12 lg:py-0">
          <div className="order-2 col-span-12 flex flex-col items-center justify-center text-center lg:order-1 lg:col-span-5 lg:items-start lg:text-left">
            <div className="mb-6 mt-7 self-center lg:self-start">
              <BadgeText
                text={badgeText || "Top #1 Nền tảng Tuyển dụng 2026"}
                variant="pill"
                className="border border-amber-200/60 bg-white/90 font-semibold text-[#B45309] shadow-[0_2px_20px_rgba(180,83,9,0.1)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(180,83,9,0.18)]"
                prefix={
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B45309]" />
                  </span>
                }
              />
            </div>

            <h1 className="mb-4 max-w-3xl">
              <span className="block text-[clamp(2.35rem,8vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111827]">
                {title1 || "Đơn vị cung cấp dịch vụ"}
              </span>
              <span className="mt-1 block text-[clamp(2.35rem,8vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight sm:inline sm:pl-2">
                <span className="text-brand-yellow">
                  {titleHighlight || "Tư vấn tuyển dụng"}
                </span>
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-base font-light leading-[1.75] text-[#4B5563] md:text-lg lg:max-w-xl">
              {subtitle ||
                "Kết nối ứng viên tài năng với hơn 1200+ cơ hội nghề nghiệp tại các tập đoàn hàng đầu Việt Nam."}
            </p>

            <div className="relative mb-8 mt-1 w-full max-w-[24rem] md:hidden">
              <div className="absolute inset-x-6 top-8 h-40 rounded-full bg-gradient-to-r from-amber-200/70 via-yellow-100/80 to-white blur-3xl" />
              <div className="absolute -left-1 top-20 h-20 w-20 rounded-full border border-white/70 bg-white/45 backdrop-blur-xl" />
              <div className="absolute -right-2 top-10 rounded-[1.25rem] border border-amber-100/80 bg-white/90 px-3 py-2 text-left shadow-[0_20px_45px_-22px_rgba(245,158,11,0.55)] backdrop-blur-xl">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-amber-700">
                  Trusted
                </p>
                <p className="mt-0.5 text-sm font-black text-[#111827]">
                  250+ doanh nghiệp
                </p>
              </div>

              <div className="relative rounded-[2rem] border border-white/70 bg-white/55 p-2 shadow-[0_35px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/80">
                  <Image
                    src={heroImageSrc}
                    alt="Chuyên viên tuyển dụng JobUp"
                    width={560}
                    height={700}
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/5 to-transparent" />

                  {/* <div className="absolute left-4 top-4 max-w-[11.5rem] rounded-[1.35rem] border border-white/80 bg-white/90 px-4 py-3 text-left shadow-[0_20px_45px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-amber-700">
                      Tư vấn tuyển dụng premium
                    </p>
                    <p className="mt-1 text-sm font-black leading-snug text-[#111827]">
                      Kết nối đúng người, đúng thời điểm.
                    </p>
                  </div> */}

                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div className="rounded-[1.35rem] bg-[#111827]/78 px-4 py-3 text-left text-white shadow-[0_20px_45px_-24px_rgba(15,23,42,0.5)] backdrop-blur-md">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-amber-200">
                        Dành cho ứng viên
                      </p>
                      <p className="mt-1 text-sm font-bold leading-snug">
                        1200+ cơ hội đang chờ bạn.
                      </p>
                    </div>
                    <Link
                      href="/tuyen-dung"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-yellow text-brand-black shadow-[0_18px_35px_-18px_rgba(245,158,11,0.8)] transition-transform duration-300 active:scale-95"
                      aria-label="Khám phá việc làm"
                    >
                      <i className="fa-solid fa-arrow-right text-base" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleHeroSearchSubmit}
              className="hero-search-form mt-0 flex w-full max-w-3xl flex-col gap-2.5 rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-3 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.25)] ring-1 ring-white/60 backdrop-blur-xl md:flex-row md:gap-2 md:rounded-full md:p-2.5"
            >
              <div className="flex flex-grow items-center rounded-2xl border border-slate-100 border-b border-gray-100 bg-slate-50/85 px-4 md:rounded-none md:border-0 md:border-r md:bg-transparent">
                <i className="fa-solid fa-magnifying-glass mr-3 w-5 text-center text-gray-400" />
                <input
                  name="keyword"
                  type="text"
                  placeholder="Tên công việc, vị trí..."
                  aria-label="Tìm kiếm việc làm theo từ khóa"
                  className="w-full bg-transparent py-3 pl-1 text-sm text-gray-700 focus:outline-none md:py-2"
                />
              </div>
              <div className="flex flex-grow md:flex-[0_0_120px] items-center rounded-2xl border border-slate-100 border-b border-gray-100 bg-slate-50/85 px-4 md:rounded-none md:border-0 md:bg-transparent">
                <i className="fa-solid fa-location-dot mr-3 w-5 text-center text-gray-400" />
                <select
                  name="provinceId"
                  aria-label="Chọn địa điểm làm việc"
                  className="w-full appearance-none bg-transparent py-3 pl-1 text-sm text-gray-700 focus:outline-none focus:ring-0 md:py-2"
                >
                  <option value="">Địa điểm</option>
                  {(provinces || []).map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="cursor-pointer whitespace-nowrap rounded-2xl bg-brand-yellow px-8 py-3.5 text-sm font-bold text-brand-black transition-all hover:bg-brand-black hover:text-white md:rounded-full"
              >
                Tìm kiếm
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm lg:justify-start">
              <span className="font-medium text-slate-500">Hot:</span>
              {trendingKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => {
                    redirectToJobs(createSearchPayload(kw, ""));
                  }}
                  className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.2)] transition-all duration-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                >
                  {kw}
                </button>
              ))}
            </div>

            <div className="relative z-10 mt-7 w-full border-t border-slate-100/70 pt-6 sm:mt-8 sm:pt-7 lg:mt-0 lg:pt-12">
              <div className="mx-auto w-full max-w-7xl">
                <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mb-6 lg:mb-8">
                  Được tin tưởng bởi 250+ doanh nghiệp hàng đầu
                </p>
                <div className="mask-image-gradient relative overflow-hidden pb-4">
                  <div className="animate-loop-scroll flex items-center gap-0.5 whitespace-nowrap sm:gap-1 lg:gap-1.5">
                    {partnerItems.map((logo, idx) => (
                      <div
                        key={`a-${idx}`}
                        className="flex h-16 min-w-[88px] items-center justify-center px-0 transition-transform duration-300 hover:-translate-y-1 sm:h-20 sm:min-w-[100px] sm:px-0.5 lg:h-20 lg:min-w-[112px] lg:px-0.5"
                      >
                        <Image
                          src={logo.src}
                          width={150}
                          height={40}
                          className="h-8 w-auto object-contain opacity-95 transition-all duration-300 hover:scale-105 sm:h-9 lg:h-10"
                          alt={logo.alt}
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    ))}
                    {partnerItems.map((logo, idx) => (
                      <div
                        key={`b-${idx}`}
                        className="flex h-16 min-w-[100px] items-center justify-center px-0 transition-transform duration-300 hover:-translate-y-1 sm:h-20 sm:min-w-[114px] sm:px-1 lg:h-20 lg:min-w-[128px] lg:px-1"
                      >
                        <Image
                          src={logo.src}
                          width={150}
                          height={40}
                          className="h-8 w-auto object-contain opacity-95 transition-all duration-300 hover:scale-105 sm:h-9 lg:h-10"
                          alt={logo.alt}
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 col-span-12 hidden justify-center md:flex lg:order-2 lg:col-span-7 lg:justify-end">
            <div className="relative w-full max-w-[560px]">
              <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2.5rem] bg-gradient-to-br from-amber-100/50 to-slate-100/30" />
              <div className="absolute -inset-6 -z-10 -rotate-3 rounded-[2.5rem] border-2 border-dashed border-amber-200/40" />

              <div className="relative overflow-hidden rounded-[2rem] ring-[6px] ring-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
                <Image
                  src={heroImageSrc}
                  alt="Chuyên viên tuyển dụng JobUp"
                  width={560}
                  height={700}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 560px"
                  className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-[1.5s] ease-out hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
              </div>

              <Link
                href="/tuyen-dung"
                className="group/card absolute -left-6 top-12 cursor-pointer animate-float-slow lg:-left-16"
                style={{ animationDelay: "0s" }}
              >
                <div className="relative rounded-[1.5rem] bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-[1px] shadow-[0_25px_60px_-15px_rgba(245,158,11,0.4)] transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(245,158,11,0.5)]">
                  <div className="relative overflow-hidden rounded-[1.4rem] bg-white/95 px-5 py-4 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-amber-500 opacity-40 blur-lg transition-opacity group-hover/card:opacity-70" />
                          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover/card:scale-110">
                            <i className="fa-solid fa-magnifying-glass text-lg text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-black leading-tight tracking-tight text-[#111827]">
                            TÌM VIỆC NGAY!
                          </h4>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            100+ cơ hội
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-amber-100/50 bg-amber-50/80 px-3 py-1.5 text-[11px] font-bold text-gray-600">
                        <i className="fa-solid fa-arrow-right text-amber-600 transition-transform group-hover/card:translate-x-1" />
                        <span>Khám phá việc làm hot</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div
                className="group/card absolute -right-4 bottom-44 cursor-pointer animate-float-slow lg:-right-12"
                style={{ animationDelay: "-2s" }}
              >
                <a
                  href={zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block rounded-[1.5rem] bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-[1px] shadow-[0_25px_60px_-15px_rgba(16,185,129,0.4)] transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(16,185,129,0.5)]"
                >
                  <div className="relative overflow-hidden rounded-[1.4rem] bg-white/95 px-5 py-4 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="relative h-12 w-12 transition-transform duration-300 group-hover/card:scale-110">
                            <Image
                              src="/Icon_of_Zalo.svg"
                              width={48}
                              height={48}
                              className="h-12 w-12 object-contain"
                              alt="Zalo"
                            />
                            <span className="absolute -top-1 -right-1 h-3 w-3 animate-mini-ping rounded-full bg-red-400" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-red-500" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-black leading-tight tracking-tight text-[#111827]">
                            GỬI CV NGAY
                          </h4>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                            Miễn phí tư vấn
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-emerald-100/50 bg-emerald-50/80 px-3 py-1.5 text-[11px] font-bold text-gray-600">
                        <div className="flex -space-x-2">
                          <Image
                            src="/images/avatar-hr.png"
                            width={16}
                            height={16}
                            className="h-4 w-4 rounded-full border border-white"
                            alt="HR"
                          />
                          <Image
                            src="/images/avatar-jd.svg"
                            width={16}
                            height={16}
                            className="h-4 w-4 rounded-full border border-white"
                            alt="HR"
                          />
                        </div>
                        <span>Nhận tư vấn 1-1 miễn phí</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div
                className="group/card absolute -left-2 bottom-20 hidden cursor-pointer animate-float-slow sm:block lg:-left-8"
                style={{ animationDelay: "-4s" }}
              >
                <a
                  href={`tel:${hotlineValue}`}
                  className="relative block rounded-[1.5rem] bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-[1px] shadow-[0_25px_60px_-15px_rgba(139,92,246,0.4)] transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(139,92,246,0.5)]"
                >
                  <div className="relative overflow-hidden rounded-[1.4rem] bg-white/95 px-4 py-3 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-violet-500 opacity-40 blur-lg transition-opacity group-hover/card:opacity-70" />
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover/card:scale-110">
                          <i className="fa-solid fa-headset text-base text-white" />
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-mini-ping rounded-full bg-violet-400 opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-violet-500" />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-black leading-tight tracking-tight text-[#111827]">
                          {hotlineDisplay}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
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
