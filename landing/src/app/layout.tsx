import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JobUp - Nền Tảng Tuyển Dụng & Việc Làm Hàng Đầu Việt Nam 2026",
  description:
    "JobUp - Cổng thông tin việc làm uy tín nhất Việt Nam. Kết nối ứng viên với 50,000+ cơ hội nghề nghiệp tại các tập đoàn hàng đầu. Tìm việc nhanh, lương cao, đãi ngộ tốt.",
  keywords:
    "tìm việc làm, tuyển dụng, jobup, việc làm it, việc làm marketing, cv chuyên nghiệp, tuyển dụng nhân sự cấp cao",
  authors: [{ name: "JobUp Corporation" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://jobup.vn/",
    title: "JobUp - Kiến Tạo Sự Nghiệp Đẳng Cấp",
    description:
      "Hàng ngàn việc làm lương cao đang chờ đón bạn. Tạo CV và ứng tuyển ngay hôm nay.",
    images: ["https://jobup.vn/assets/og-image.jpg"],
  },
  other: {
    "theme-color": "#F0B429",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://ducdev04.pro.vn/" />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans bg-brand-white text-gray-800 flex flex-col min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
