export default function SidebarBannerFallback() {
  return (
    <div className="relative rounded-[32px] overflow-hidden h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] group border border-gray-100">
      <img
        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        alt="Tuyển dụng chuyên gia"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/50 to-transparent flex flex-col justify-end p-8">
        <div className="mb-4">
          <span className="px-4 py-1 bg-amber-400 text-[#111827] text-[10px] font-extrabold rounded-full tracking-wider uppercase shadow-lg shadow-amber-400/20">
            Headhunting
          </span>
        </div>
        <h3 className="text-white text-3xl font-extrabold mb-3 leading-tight">
          Tìm việc <br />
          <span className="text-amber-400">đúng người, đúng việc</span>
        </h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed font-medium">
          Đội ngũ chuyên gia JobUp kết nối bạn với những cơ hội phù hợp nhất.
        </p>
        <div className="flex items-center gap-2 group/btn">
          <span className="h-0.5 w-8 bg-amber-400 transition-all duration-300 group-hover/btn:w-12" />
          <span className="text-white font-bold text-sm tracking-wide uppercase transition-colors group-hover/btn:text-amber-400">
            Khám phá ngay
          </span>
        </div>
      </div>
    </div>
  );
}
