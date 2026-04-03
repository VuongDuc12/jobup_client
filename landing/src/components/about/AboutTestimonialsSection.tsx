"use client";

import { useRef } from "react";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import type { TestimonialResponse } from "@/lib/types";
import { getAssetUrl } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const fallbackTestimonials = [
  {
    name: "Linh Đan",
    position: "Senior UI/UX Designer",
    avatarUrl: "/candidate_feedback_2_1770740265205.png",
    content:
      "JobUp làm việc rất chuyên nghiệp. Tôi nhận được offer tại công ty mơ ước chỉ sau 5 ngày. Thực sự ấn tượng!",
    rating: 5,
  },
  {
    name: "Quốc Huy",
    position: "Project Manager",
    avatarUrl:
      "/images/about-avatar-man.jpg",
    content:
      "Điểm tôi thích nhất là sự chân thành. Các chuyên gia không chỉ tìm việc mà còn tư vấn định hướng sự nghiệp sâu sắc.",
    rating: 5,
  },
  {
    name: "Minh Châu",
    position: "Marketing Director",
    avatarUrl:
      "/images/about-avatar-woman.jpg",
    content:
      "Uy tín là điều tôi cảm nhận rõ nhất. JobUp giữ đúng cam kết về thời gian và chất lượng. Recommend cho nhân sự cấp cao.",
    rating: 5,
  },
  {
    name: "Anh Ngọc",
    position: "Software Engineer",
    avatarUrl: null,
    content:
      "Dịch vụ tận tâm, hỗ trợ nhiệt tình. Cảm ơn JobUp rất nhiều vì đã đồng hành cùng tôi.",
    rating: 5,
  },
];

interface AboutTestimonialsSectionProps {
  testimonials: TestimonialResponse[] | null;
}

export default function AboutTestimonialsSection({
  testimonials,
}: AboutTestimonialsSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const items =
    testimonials && testimonials.length > 0
      ? testimonials
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((t) => ({
            name: t.name ?? "Ứng viên",
            position: t.position ?? "",
            avatarUrl: getAssetUrl(t.avatarUrl),
            content: t.content ?? "",
            rating: t.rating,
          }))
      : fallbackTestimonials;

  return (
    <section className="py-12 bg-brand-light-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <SectionHeader
          badge="Phản hồi ứng viên"
          title="Họ nói gì về JobUp?"
          align="center"
          className="mb-8"
        />

        <div className="mb-14 flex justify-center gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-black cursor-pointer"
            aria-label="Xem phản hồi trước"
          >
            <i className="fa-solid fa-chevron-left text-sm" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-black cursor-pointer"
            aria-label="Xem phản hồi tiếp theo"
          >
            <i className="fa-solid fa-chevron-right text-sm" />
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12 [&_.swiper-pagination-bullet-active]:!bg-brand-yellow [&_.swiper-pagination]:!static [&_.swiper-pagination]:mt-8"
        >
          {items.map((item, idx) => {
            const isDark = idx % 3 === 1;
            return (
              <SwiperSlide key={idx} className="!h-[280px] !flex">
                <div
                  className={`h-full rounded-3xl p-8 flex flex-col w-full ${
                    isDark
                      ? "bg-brand-black text-white"
                      : "bg-white border border-gray-100 hover:-translate-y-1 transition-transform"
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 text-brand-yellow mb-5">
                    {[...Array(item.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-sm" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    className={`italic leading-relaxed mb-6 flex-grow overflow-hidden line-clamp-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    &ldquo;{item.content}&rdquo;
                  </p>

                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        width={40}
                        height={40}
                        className={`w-10 h-10 rounded-full object-cover ${
                          isDark ? "border border-brand-yellow/30" : ""
                        }`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black font-bold">
                        {item.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(-2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p
                        className={`font-bold text-sm ${
                          isDark ? "text-white" : "text-brand-black"
                        }`}
                      >
                        {item.name}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-brand-yellow" : "text-gray-400"
                        }`}
                      >
                        {item.position}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
