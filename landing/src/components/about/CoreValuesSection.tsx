import SectionHeader from "@/components/shared/SectionHeader";

interface CoreValuesSectionProps {
  visionDescription?: string | null;
  missionDescription?: string | null;
  title?: string | null;
  value1Icon?: string | null;
  value1Title?: string | null;
  value1Description?: string | null;
  value2Icon?: string | null;
  value2Title?: string | null;
  value2Description?: string | null;
  value3Icon?: string | null;
  value3Title?: string | null;
  value3Description?: string | null;
}

const defaultValues = [
  {
    icon: "fa-solid fa-bolt",
    title: "Tốc độ",
    description:
      "Chúng tôi đề cao tốc độ phục vụ khách hàng, hỗ trợ ứng viên với mong muốn để không ai phải chờ.",
  },
  {
    icon: "fa-solid fa-medal",
    title: "Chất lượng",
    description:
      "Chất lượng là thước đo thành công của chúng tôi trong mọi hoạt động tư vấn và kết nối nhân sự.",
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Uy tín",
    description:
      "Chúng tôi trân trọng lời nói, giữ cam kết và luôn có hành động cụ thể để minh chứng.",
  },
];

const missionVisionData = [
  {
    label: "Tầm nhìn",
    title:
      "Trở thành đối tác tin cậy cung cấp dịch vụ tuyển dụng đa ngành nghề phổ biến khắp Việt Nam.",
    icon: "fa-solid fa-binoculars",
  },
  {
    label: "Sứ mệnh",
    title:
      "Tư vấn dịch vụ tuyển dụng giúp kết nối những ứng viên tiềm năng với các doanh nghiệp đang có nhu cầu tuyển dụng nhân sự.",
    icon: "fa-solid fa-bullseye",
  },
];

export default function CoreValuesSection({
  visionDescription,
  missionDescription,
  title,
  value1Icon,
  value1Title,
  value1Description,
  value2Icon,
  value2Title,
  value2Description,
  value3Icon,
  value3Title,
  value3Description,
}: CoreValuesSectionProps) {
  const displayTitle = title || "Giá trị cốt lõi";

  const coreValues = [
    {
      icon: value1Icon || defaultValues[0].icon,
      title: value1Title || defaultValues[0].title,
      description: value1Description || defaultValues[0].description,
    },
    {
      icon: value2Icon || defaultValues[1].icon,
      title: value2Title || defaultValues[1].title,
      description: value2Description || defaultValues[1].description,
    },
    {
      icon: value3Icon || defaultValues[2].icon,
      title: value3Title || defaultValues[2].title,
      description: value3Description || defaultValues[2].description,
    },
  ];

  // All 5 items in one unified array: Vision, Mission, then 3 Core Values
  const allItems = [
    ...[
      {
        label: "Tầm nhìn",
        title: visionDescription || missionVisionData[0].title,
        icon: missionVisionData[0].icon,
      },
      {
        label: "Sứ mệnh",
        title: missionDescription || missionVisionData[1].title,
        icon: missionVisionData[1].icon,
      },
    ].map((item) => ({
      type: "pillar" as const,
      icon: item.icon,
      label: item.label,
      title: item.title,
      description: null,
    })),
    ...coreValues.map((value) => ({
      type: "value" as const,
      icon: value.icon,
      label: displayTitle,
      title: value.title,
      description: value.description,
    })),
  ];

  return (
    <section className="landing-section bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Single Section Header */}
        <SectionHeader
          badge="DNA của chúng tôi"
          title={
            <span className="whitespace-nowrap">
              Tầm nhìn · Sứ mệnh · Giá trị cốt lõi
            </span>
          }
          description="Những nguyên tắc định hướng mọi hoạt động tư vấn tuyển dụng tại JobUp."
          align="center"
        />

        {/* Unified 5-item grid: 2 pillars top, 3 values bottom — one visual flow */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-7">
          {allItems.map((item, idx) => {
            const isPillar = item.type === "pillar";
            return (
              <article
                key={idx}
                className={`group relative rounded-3xl border p-7 md:p-9 transition-all duration-300 overflow-hidden ${
                  isPillar
                    ? "md:col-span-3 bg-brand-black border-brand-black hover:shadow-hover"
                    : "md:col-span-2 bg-brand-light-gray border-gray-100 hover:border-brand-yellow/30 hover:shadow-hover"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                    isPillar
                      ? "bg-brand-yellow/15 group-hover:bg-brand-yellow"
                      : "bg-white shadow-soft group-hover:bg-brand-yellow group-hover:shadow-glow"
                  }`}
                >
                  <i
                    className={`${item.icon} text-xl transition-colors duration-300 ${
                      isPillar
                        ? "text-brand-yellow group-hover:text-brand-black"
                        : "text-brand-yellow group-hover:text-white"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-bold uppercase tracking-[0.18em] ${
                    isPillar ? "text-brand-yellow" : "text-brand-yellow"
                  }`}
                >
                  {item.label}
                </span>

                {/* Title */}
                <h4
                  className={`mt-3 font-extrabold leading-snug ${
                    isPillar
                      ? "text-xl md:text-2xl text-white"
                      : "text-lg text-brand-black"
                  }`}
                >
                  {item.title}
                </h4>

                {/* Description (only for core values) */}
                {item.description && (
                  <p className="mt-3 text-gray-400 leading-relaxed text-[15px] text-justify [text-justify:inter-word]">
                    {item.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
