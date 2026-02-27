export default function SpotlightBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-auto min-h-[320px] lg:h-[350px] group shadow-xl cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        className="w-full h-full absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
        alt="Event Banner"
        loading="lazy"
      />
      <div className="relative h-full bg-gradient-to-r from-black/95 via-black/60 to-transparent flex flex-col justify-center p-8 lg:p-14">
        <span className="text-brand-yellow font-black uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-brand-yellow" /> Chương trình đặc biệt
        </span>
        <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
          Ngày hội tuyển dụng <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-500">
            Big Tech 2026
          </span>
        </h3>
        <p className="text-gray-200 mb-8 max-w-lg text-base lg:text-lg font-medium leading-relaxed opacity-90">
          Cơ hội phỏng vấn trực tiếp với Google, Microsoft, VNG.{" "}
          <br className="hidden lg:block" />
          Nhận Offer ngay tại sự kiện ngày mai.
        </p>
        <button className="bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-black w-fit hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20 cursor-pointer">
          ĐĂNG KÝ THAM GIA NGAY
        </button>
      </div>
    </div>
  );
}
