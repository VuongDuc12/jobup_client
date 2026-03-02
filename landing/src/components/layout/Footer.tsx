'use client';

import Image from "next/image";
import Link from "next/link";
import { useSystemConfig } from "@/hooks/useSystemConfig";

const footerAbout = [
    { href: "/ve-chung-toi", label: "Giới thiệu chung" },
    { href: "#", label: "Tuyển dụng nội bộ", badge: "Hiring" },
    { href: "/truyen-thong", label: "Truyền thông" },
    { href: "#footer", label: "Liên hệ & Hợp tác" },
];

const footerCandidate = [
    { href: "/tuyen-dung", label: "Việc làm mới nhất" },
    { href: "/tin-noi-bo", label: "Tạo CV chuyên nghiệp" },
    { href: "/tin-noi-bo", label: "Cẩm nang xin việc" },
    { href: "/tin-noi-bo", label: "Tra cứu lương" },
];

export default function Footer() {
    const { config, loading } = useSystemConfig();

    const socialLinks = [
        { icon: "fa-brands fa-facebook-f", href: config.facebookUrl || "#" },
        { icon: "fa-brands fa-linkedin-in", href: config.linkedInUrl || "#" },
        { icon: "fa-brands fa-instagram", href: config.instagramUrl || "#" },
        { icon: "fa-brands fa-tiktok", href: config.tiktokUrl || "#" },
    ].filter(link => link.href && link.href !== "#");
    return (
        <footer
            className="bg-brand-black pt-24 font-sans relative overflow-hidden text-white"
            id="footer"
        >
            {/* Decorative glow */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[120px] -z-10 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Brand */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <Image
                                src="/Logo.png"
                                alt="JobUp"
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed font-medium">
                            Nền tảng tuyển dụng & quản trị nhân sự 4.0 hàng đầu Việt Nam.
                            Kiến tạo sự nghiệp rực rỡ cho hàng triệu nhân tài Việt.
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow transition-all duration-300 shadow-sm"
                                >
                                    <i className={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* About */}
                    <div className="lg:col-span-3">
                        <h4 className="font-bold text-white text-lg mb-6 tracking-wide">
                            Về chúng tôi
                        </h4>
                        <ul className="space-y-4">
                            {footerAbout.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-400 hover:text-brand-yellow hover:translate-x-1 transition-all inline-block font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                    {item.badge && (
                                        <span className="text-[10px] font-bold bg-brand-yellow text-brand-black px-2 py-0.5 rounded-full ml-2">
                                            {item.badge}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Candidates */}
                    <div className="lg:col-span-3">
                        <h4 className="font-bold text-white text-lg mb-6 tracking-wide">
                            Dành cho Ứng viên
                        </h4>
                        <ul className="space-y-4">
                            {footerCandidate.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-400 hover:text-brand-yellow hover:translate-x-1 transition-all inline-block font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white text-lg mb-6 tracking-wide">
                            Liên hệ
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <i className="fa-solid fa-phone text-brand-yellow mt-1" />
                                <span className="text-white font-bold tracking-wider">
                                    {loading ? '...' : config.hotline}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fa-solid fa-envelope text-brand-yellow mt-1" />
                                <span className="text-gray-400">
                                    {loading ? '...' : config.email}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fa-solid fa-location-dot text-brand-yellow mt-1" />
                                <span className="text-gray-400 leading-relaxed text-sm">
                                    {loading ? '...' : config.address}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black/50 border-t border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm font-medium">
                        &copy; 2026 JobUp Corporation. Crafted with passion for recruitment
                        excellence.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-gray-500 hover:text-brand-yellow text-sm font-medium transition">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-brand-yellow text-sm font-medium transition">
                            Terms & Conditions
                        </a>
                        <a href="#" className="text-gray-500 hover:text-brand-yellow text-sm font-medium transition">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
