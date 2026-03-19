import type { TestimonialResponse } from "@/lib/types";
import Image from "next/image";
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

export default function TestimonialsSection({ testimonials: apiTestimonials }: TestimonialsSectionProps) {
  const activeItems =
    apiTestimonials && apiTestimonials.length > 0
      ? apiTestimonials
            .sort((a, b) => a.displayOrder - b.displayOrder)
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
    <section className="py-16 bg-brand-black relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{
          backgroundImage:
            "url('/images/carbon-fibre-texture.png')",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-3 block">
            Câu chuyện thành công
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Ứng viên nói gì về <span className="text-brand-yellow">JobUp?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-[2rem] border border-gray-700 hover:border-brand-yellow transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 text-brand-yellow mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-sm" />
                ))}
              </div>

              <p className="text-gray-300 italic mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow"
                  alt={testimonial.name}
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {testimonial.role}
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
