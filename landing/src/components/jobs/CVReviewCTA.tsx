export default function CVReviewCTA() {
    return (
        <div className="bg-gradient-to-br from-brand-yellow to-amber-500 rounded-2xl p-6 text-brand-black shadow-lg relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-xl font-black mb-2">CV của bạn đã đủ tốt?</h3>
            <p className="text-sm font-medium opacity-80 mb-4">
                80% Nhà tuyển dụng loại hồ sơ vì CV xấu. Để chuyên gia JobUp giúp bạn.
            </p>
            <button className="w-full py-3 bg-brand-black text-white font-bold rounded-xl shadow-md hover:bg-white hover:text-brand-black transition-all flex items-center justify-center gap-2 cursor-pointer">
                <i className="fa-solid fa-wand-magic-sparkles" /> Review CV Miễn Phí
            </button>
        </div>
    );
}
