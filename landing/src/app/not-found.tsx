import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Trang không tìm thấy | JobUp",
  description: "Trang bạn đang tìm kiếm không tồn tại trên JobUp.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-white text-center px-4">
      <h1 className="text-8xl font-extrabold text-brand-yellow mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Trang không tìm thấy
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc địa chỉ URL
        không hợp lệ.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-yellow text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
