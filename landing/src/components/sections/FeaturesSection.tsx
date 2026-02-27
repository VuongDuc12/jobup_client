export default function FeaturesSection() {
    return (
        <section id="features" className="py-16 bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-yellow rounded-full blur-[120px] -z-10 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px] -z-10 translate-y-1/4" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-brand-yellow font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                        Giải pháp toàn diện
                    </span>
                    <h2 className="text-3xl md:text-5xl font-[1000] text-[#111827] mb-5 tracking-tight">
                        Hệ sinh thái{" "}
                        <span className="text-brand-yellow">Hỗ Trợ Toàn Diện</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Không chỉ dừng lại ở việc kết nối, JobUp đồng hành cùng bạn trên
                        từng bước ngoặt sự nghiệp với nền tảng công nghệ dẫn đầu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Feature 1: AI Smart Match */}
                    <div className="md:col-span-2 bg-[#FAFAFA] rounded-[3rem] p-1 lg:p-1.5 border border-gray-100 hover:border-brand-yellow hover:shadow-[0_40px_80px_-20px_rgba(245,185,20,0.15)] transition-all duration-700 group relative overflow-hidden">
                        <div className="bg-white rounded-[2.8rem] p-8 lg:p-10 h-full relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                                <img
                                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                    alt="AI Logic"
                                />
                            </div>

                            <div className="relative z-10 max-w-md">
                                <div className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm mb-4">
                                    <span className="w-8 h-[2px] bg-brand-yellow" /> AI
                                    TECHNOLOGY
                                </div>
                                <h3 className="text-3xl font-black text-[#111827] mb-4 leading-tight">
                                    Công nghệ{" "}
                                    <span className="text-brand-yellow">Match Job 4.0</span> ⚡
                                </h3>
                                <p className="text-gray-500 mb-8 leading-relaxed text-lg font-light italic">
                                    &ldquo;Thuật toán thông minh tự động &lsquo;ghép đôi&rsquo;
                                    bạn với Job ngon dựa trên 50+ tiêu chí dữ liệu. Tìm việc
                                    chuẩn xác như tìm người yêu!&rdquo;
                                </p>

                                {/* Analytical UI */}
                                <div className="bg-[#F8FAFC] p-6 rounded-[2rem] border border-gray-100 shadow-sm group-hover:border-brand-yellow transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center text-white shadow-lg shadow-brand-yellow">
                                                <i className="fa-solid fa-brain" />
                                            </div>
                                            <span className="font-bold text-gray-800">
                                                Đang quét hồ sơ...
                                            </span>
                                        </div>
                                        <span className="text-green-600 font-black text-xl">
                                            98%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-brand-yellow to-green-500 w-[98%] animate-pulse" />
                                    </div>
                                    <p className="mt-3 text-[11px] text-gray-400 font-medium uppercase tracking-widest text-center">
                                        Kết quả hiển thị sau 1.2s
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: 24/7 Support */}
                    <div className="md:row-span-2 bg-[#111827] rounded-[3rem] p-1 border border-gray-800 hover:shadow-2xl transition-all duration-700 group overflow-hidden">
                        <div className="bg-gray-900/40 rounded-[2.9rem] p-8 lg:p-10 h-full flex flex-col relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
                                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                                alt="Consultant"
                            />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-inner mb-8">
                                    <i className="fa-solid fa-headset text-2xl text-brand-yellow" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4">
                                    Support <br />
                                    <span className="text-brand-yellow">
                                        &ldquo;Không ngủ&rdquo; 24/7
                                    </span>
                                </h3>
                                <p className="text-gray-400 mb-8 leading-relaxed font-light">
                                    Bạn thức, JobUp cũng thức! Đội ngũ CSKH nhiệt tình
                                    &ldquo;cân&rdquo; mọi thắc mắc, hỗ trợ tìm việc và nộp hồ sơ
                                    siêu tốc mọi khung giờ.
                                </p>

                                <div className="mt-auto space-y-4">
                                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-[1.5rem] rounded-tl-none border border-white/5 self-start max-w-[90%] transform -rotate-1">
                                        <p className="text-xs text-gray-200">
                                            Em cần tối ưu CV ngành Tech ạ?
                                        </p>
                                    </div>
                                    <div className="bg-brand-yellow text-[#111827] p-4 rounded-[1.5rem] rounded-tr-none self-end max-w-[90%] ml-auto shadow-2xl shadow-brand-yellow transform rotate-1">
                                        <p className="text-xs font-bold leading-relaxed italic">
                                            &ldquo;JobUp đã lọc ra Job ngon đúng ý bạn. Apply luôn kẻo
                                            lỡ nhé! 🚀&rdquo;
                                        </p>
                                    </div>
                                    <a
                                        href="tel:0979334143"
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#111827] rounded-[1.5rem] font-black text-sm mt-8 hover:bg-brand-yellow transition-all shadow-xl hover:-translate-y-1"
                                    >
                                        GỌI CHUYÊN GIA NGAY{" "}
                                        <i className="fa-solid fa-phone-volume" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: CV Optimization */}
                    <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400"
                            className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-15 transition-opacity duration-700"
                            alt="CV Writing"
                        />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <i className="fa-solid fa-file-signature text-xl text-blue-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-black text-[#111827] mb-3">
                                CV Doctor - &ldquo;Chữa bệnh&rdquo; hồ sơ
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Nhận và &ldquo;khám&rdquo; CV miễn phí. Biến hồ sơ nhạt nhòa
                                thành bản CV &ldquo;sát thủ&rdquo;, đánh bại mọi đối thủ cạnh
                                tranh.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm group/link"
                            >
                                Trải nghiệm ngay{" "}
                                <i className="fa-solid fa-arrow-right-long group-hover/link:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Feature 4: Career Path */}
                    <div className="bg-gradient-to-br from-brand-yellow to-brand-yellow rounded-[3rem] p-8 text-white shadow-2xl shadow-brand-yellow hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1507679799987-c7377f5da5b2?auto=format&fit=crop&q=80&w=600"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-120 group-hover:opacity-40 transition-all duration-1000"
                            alt="Success Path"
                        />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                                <i className="fa-solid fa-rocket text-xl text-white" />
                            </div>
                            <h3 className="text-xl font-black mb-3">
                                Bí kíp Phỏng vấn & Deal lương
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-6">
                                Trang bị &ldquo;vũ khí&rdquo; tận răng: Bộ câu hỏi phỏng vấn
                                thường gặp, mẹo deal lương khéo léo để bạn tự tin chinh phục
                                mọi HR khó tính.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-white font-black text-sm group/link"
                            >
                                Khám phá bản đồ{" "}
                                <i className="fa-solid fa-map-location-dot group-hover/link:scale-125 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-gray-100">
                    {[
                        { value: "3 Giây", label: "Tốc độ tìm việc" },
                        { value: "24/7", label: "Hỗ trợ trực tuyến" },
                        { value: "100%", label: "Bảo mật thông tin" },
                        { value: "Free", label: "Tư vấn miễn phí" },
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-3xl font-extrabold text-[#111827] mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
