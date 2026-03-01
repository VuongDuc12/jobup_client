"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const mobileLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/tuyen-dung", label: "Tuyển dụng" },
    { href: "/tin-noi-bo", label: "Tin tức nội bộ" },
    { href: "/truyen-thong", label: "Truyền thông" },
    { href: "/ve-chung-toi", label: "Về chúng tôi" },
    { href: "#footer", label: "Liên hệ" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const pathname = usePathname();

    return (
        <div
            className={`fixed inset-0 z-[100] bg-white transform transition-transform duration-500 lg:hidden flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="p-6 flex justify-between items-center border-b border-gray-50">
                <Image
                    src="/Logo.png"
                    alt="JobUp"
                    width={96}
                    height={32}
                    className="h-8 w-auto"
                />
                <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                >
                    <i className="fa-solid fa-xmark text-xl" />
                </button>
            </div>

            <nav className="flex-grow p-8 flex flex-col gap-8 text-xl font-black text-gray-900">
                {mobileLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={`flex items-center justify-between transition-colors ${
                                isActive
                                    ? "text-brand-yellow"
                                    : "hover:text-brand-yellow"
                            }`}
                        >
                            {link.label}
                            <i className="fa-solid fa-chevron-right text-xs opacity-20" />
                        </Link>
                    );
                })}
            </nav>

            <div className="p-8 border-t border-gray-50">
                <a
                    href="mailto:hr@jobup.vn"
                    className="block w-full py-5 bg-brand-black text-white text-center rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 active:scale-95 transition-transform"
                >
                    Gửi CV Ngay
                </a>
                <div className="mt-6 flex justify-center gap-6 text-gray-400">
                    <i className="fa-brands fa-facebook text-xl" />
                    <i className="fa-brands fa-linkedin text-xl" />
                    <i className="fa-brands fa-instagram text-xl" />
                </div>
            </div>
        </div>
    );
}
