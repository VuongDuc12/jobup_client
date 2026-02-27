"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/tuyen-dung", label: "Tuyển dụng" },
];

const newsDropdown = [
    { href: "/tin-noi-bo", label: "Tin nội bộ" },
    { href: "/truyen-thong", label: "Truyền thông" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header
                className="fixed w-full top-0 z-50 transition-all duration-300 glass border-b border-gray-100"
                id="header"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/Logo.png"
                            alt="JobUp Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-semibold text-gray-600 hover:text-brand-yellow-hover transition relative group py-2"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-yellow transition-all group-hover:w-full" />
                            </Link>
                        ))}

                        {/* Dropdown Tin tức */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 font-semibold text-gray-600 hover:text-brand-yellow-hover transition py-2">
                                Tin tức
                                <i className="fa-solid fa-chevron-down text-[10px] mt-0.5 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50">
                                {newsDropdown.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-brand-yellow hover:text-brand-black"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/ve-chung-toi"
                            className="font-semibold text-gray-600 hover:text-brand-yellow-hover transition relative group py-2"
                        >
                            Về chúng tôi
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-yellow transition-all group-hover:w-full" />
                        </Link>

                        <Link
                            href="#footer"
                            className="font-semibold text-gray-600 hover:text-brand-yellow-hover transition relative group py-2"
                        >
                            Liên hệ
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-yellow transition-all group-hover:w-full" />
                        </Link>
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <a
                            href="tel:0979334143"
                            className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-yellow transition-colors"
                        >
                            <i className="fa-solid fa-phone text-xs" />
                            <span className="font-medium">0979.334.143</span>
                        </a>
                        <span className="hidden md:block w-px h-4 bg-gray-200" />
                        <a
                            href="mailto:hr@jobup.vn"
                            className="px-6 py-2.5 rounded-full bg-brand-black text-white font-bold text-sm shadow-lg hover:shadow-[0_8px_30px_rgba(245,185,20,0.4)] hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Gửi CV ngay
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden text-2xl text-gray-600 focus:outline-none"
                            aria-label="Open menu"
                        >
                            <i className="fa-solid fa-bars" />
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </>
    );
}
