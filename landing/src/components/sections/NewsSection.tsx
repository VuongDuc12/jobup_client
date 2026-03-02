import Link from "next/link";

const sideNews = [
  {
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=300",
    category: "Sự kiện",
    categoryColor: "text-blue-600",
    title: "Team Building 2026: Vượt Sóng Cùng JobUp tại Phú Quốc",
    date: "15/05/2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=300",
    category: "Hoạt động chuyên môn",
    categoryColor: "text-green-600",
    title: "Workshop: Ứng dụng AI trong tối ưu hóa quy trình HR",
    date: "12/05/2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=300",
    category: "Văn hóa",
    categoryColor: "text-purple-600",
    title: "Happy Friday: Gắn kết tình thân giữa các phòng ban",
    date: "08/05/2026",
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-16 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs mb-3 block">
            Tin tức & Hoạt động
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Cập nhật mới nhất từ{" "}
            <span className="text-brand-yellow">Gia đình JobUp</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-5">
            Những sự kiện, văn hoá và workshop chuyển đổi số nổi bật nhất tháng
            này.
          </p>
          <Link
            href="/tin-noi-bo"
            className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-brand-yellow-hover transition"
          >
            Xem tất cả tin tức <i className="fa-solid fa-arrow-right-long" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Highlighted Post */}
          <Link
            href="/tin-noi-bo/xu-huong-nhan-su-2025-ai"
            className="lg:col-span-8 group cursor-pointer block"
          >
            <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="News"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="px-3 py-1 bg-brand-yellow text-brand-black text-[10px] font-bold rounded-full uppercase mb-4 inline-block">
                  Tin tiêu biểu
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-brand-yellow transition">
                  Chào đón thành viên thứ 200 gia nhập đại gia đình JobUp
                </h3>
                <div className="flex items-center gap-4 text-gray-300 text-sm font-medium">
                  <span>
                    <i className="fa-regular fa-calendar mr-2" />
                    20/05/2026
                  </span>
                  <span>
                    <i className="fa-regular fa-user mr-2" />
                    Ban Truyền Thông
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Side News */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {sideNews.map((news, idx) => (
              <Link
                key={idx}
                href="/tin-noi-bo"
                className="group flex gap-4 cursor-pointer"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <img
                    src={news.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={news.title}
                    loading="lazy"
                  />
                </div>
                <div>
                  <span
                    className={`text-[10px] font-bold ${news.categoryColor} uppercase mb-1 block`}
                  >
                    {news.category}
                  </span>
                  <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-brand-yellow-hover transition">
                    {news.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium">
                    {news.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
