import type { TestimonialResponse } from "@/lib/types";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import { getAssetUrl } from "@/lib/utils";

interface TestimonialsSectionProps {
  testimonials?: TestimonialResponse[] | null;
}

const defaultTestimonials = [
  {
    quote:
      "Nhờ JobUp, mình đã tìm được vị trí Senior React Developer tại VNG chỉ sau 2 tuần ứng tuyển. Quy trình cực kỳ minh bạch và chuyên nghiệp.",
    name: "Minh Hoàng",
    role: "Software Engineer tại VNG",
    avatar: "/images/testimonial-avatar-1.jpg",
    rating: 5,
  },
  {
    quote:
      "Giao diện dễ sử dụng, nhiều việc làm chất lượng. Mình rất ấn tượng với tính năng nhận tin tuyển dụng qua email rất đúng mục tiêu.",
    name: "Thùy Chi",
    role: "Digital Marketing Manager",
    avatar: "/images/testimonial-avatar-2.svg",
    rating: 5,
  },
  {
    quote:
      "Là nhà tuyển dụng, mình thấy JobUp cung cấp nguồn ứng viên rất chất lượng, phù hợp với tiêu chí khắt khe của Microsoft.",
    name: "James Wilson",
    role: "HR Director @ Microsoft",
    avatar: "/images/testimonial-avatar-3.png",
    rating: 5,
  },
];

export default function TestimonialsSection({
  testimonials: apiTestimonials,
}: TestimonialsSectionProps) {
  const activeItems =
    apiTestimonials && apiTestimonials.length > 0
      ? [...apiTestimonials]
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .slice(0, 6)
      : null;

  const items = activeItems
    ? activeItems.map((t) => ({
        quote: t.content || "",
        name: t.name || "Ẩn danh",
        role: t.position || "",
        avatar: getAssetUrl(t.avatarUrl) || "/images/testimonial-avatar-1.jpg",
        rating: t.rating,
      }))
    : defaultTestimonials;

  return (
    <section className="landing-section bg-brand-black relative overflow-visible">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{
          backgroundImage: "url('/images/carbon-fibre-texture.png')",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Câu chuyện thành công"
          title={
            <>
              Ứng viên nói gì về <span className="text-brand-yellow">JobUp?</span>
            </>
          }
          align="center"
          className="mb-8"
          titleClassName="text-white"
        />

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {items.map((testimonial, idx) => (
            <div
              key={idx}
              className="relative group overflow-visible z-0 hover:z-40"
            >
              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-[2rem] border border-gray-700 hover:border-brand-yellow transition-all duration-500 h-full flex flex-col justify-between">
                {/* Stars */}
                <div className="flex gap-1 text-brand-yellow mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-sm" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 italic leading-relaxed text-sm line-clamp-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* User */}
                <div className="flex items-center gap-4 mt-6">
                  <Image
                    src={testimonial.avatar}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow"
                    alt={testimonial.name}
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover quote-only card */}
              <div className="absolute inset-0 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden md:flex items-center justify-center p-3">
                <div className="bg-gray-900/95 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-brand-yellow transform scale-95 group-hover:scale-100 transition-transform duration-300 w-full">
                  <p className="text-gray-200 italic leading-relaxed text-sm text-center">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
