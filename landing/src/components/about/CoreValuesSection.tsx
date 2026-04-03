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
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black">
              Tầm nhìn & Sứ mệnh
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-gray-500 leading-relaxed">
              JobUp là một đơn vị cung cấp dịch vụ tư vấn tuyển dụng chuyên
              nghiệp.
            </p>
            <div className="w-12 h-1 bg-brand-yellow mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {missionVisionData.map((item) => (
              <article
                key={item.label}
                className="rounded-3xl border border-gray-100 bg-[#FCFCFC] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0">
                    <i className={`${item.icon} text-brand-yellow text-sm`} />
                  </div>
                  <span className="text-md font-extrabold uppercase tracking-wider text-brand-black">
                    {item.label}
                  </span>
                </div>

                <p className="text-gray-500 leading-relaxed">{item.title}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-brand-black">
            {displayTitle}
          </h2>
          <div className="w-12 h-1 bg-brand-yellow mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {coreValues.map((value, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-brand-light-gray flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-yellow transition-all">
                <i
                  className={`${value.icon} text-brand-yellow text-2xl group-hover:text-brand-black transition-colors`}
                />
              </div>
              <h4 className="text-xl font-extrabold text-brand-black mb-3">
                {value.title}
              </h4>
              <p className="text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
