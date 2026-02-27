export default function CVReviewCTA() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-brand-yellow bg-gradient-to-br from-brand-yellow via-white to-white p-6 text-brand-black shadow-lg">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-yellow blur-2xl" />
      <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-brand-yellow blur-2xl" />
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-yellow bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-yellow">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
          Nhận xét CV
        </span>
        <h3 className="text-xl font-black mt-4 mb-2">CV của bạn đã đủ tốt?</h3>
        <p className="text-sm font-medium text-gray-700 mb-5">
          80% nhà tuyển dụng loại hồ sơ vì CV xấu. Để chuyên gia JobUp giúp bạn.
        </p>
        <button className="w-full py-3 bg-brand-black text-white font-black rounded-xl shadow-md hover:bg-brand-yellow hover:text-brand-black transition-all flex items-center justify-center gap-2 cursor-pointer">
          <i className="fa-solid fa-wand-magic-sparkles" /> Review CV miễn phí
        </button>
      </div>
    </div>
  );
}
