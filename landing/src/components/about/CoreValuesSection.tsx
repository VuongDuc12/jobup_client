interface CoreValuesSectionProps {
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
      "Trở thành đối tác tin cậy cung cấp dịch vụ tuyển dụng đa ngành nghề phổ biến khắp VN.",
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

  return (
    <section className="border-t border-gray-100 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-24 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="text-center lg:col-span-4 lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-black md:text-4xl">
              Tầm nhìn & Sứ mệnh
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-gray-500 lg:mx-0 md:text-lg">
              JobUp là một đơn vị cung cấp dịch vụ tư vấn tuyển dụng chuyên
              nghiệp.
            </p>
            <div className="mx-auto mt-6 h-1.5 w-16 rounded-full bg-brand-yellow lg:mx-0" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {missionVisionData.map((item, idx) => (
              <article
                key={item.label}
                className={`group rounded-[1.75rem] border border-gray-100 bg-[#FCFCFC] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/30 hover:bg-white hover:shadow-[0_18px_34px_-20px_rgba(0,0,0,0.3)] ${
                  idx === 1 ? "sm:mt-8" : ""
                }`}
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-yellow/10 transition-colors group-hover:bg-brand-yellow">
                    <i
                      className={`${item.icon} text-brand-yellow text-lg transition-colors group-hover:text-brand-black`}
                    />
                  </div>
                  <span className="text-lg font-extrabold uppercase tracking-wide text-brand-black">
                    {item.label}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-14 border-t border-gray-100 pt-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-black md:text-4xl">
            {displayTitle}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gray-200 md:block" />
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {coreValues.map((value, idx) => (
              <article
                key={idx}
                className="group relative rounded-[1.75rem] border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/30 hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute left-1/2 top-10 z-10 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-brand-yellow md:block" />
                <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-yellow/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-yellow">
                  <i
                    className={`${value.icon} text-brand-yellow text-3xl transition-colors duration-300 group-hover:text-brand-black`}
                  />
                </div>
                <h4 className="mb-4 text-xl font-extrabold text-brand-black">
                  {value.title}
                </h4>
                <p className="leading-relaxed text-gray-500">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
