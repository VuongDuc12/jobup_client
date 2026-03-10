import type { Metadata } from "next";
import JobsPageClient from "@/components/pages/JobsPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ducdev04.pro.vn";

export const metadata: Metadata = {
  title: "Việc Làm Mới Nhất | JobUp",
  description:
    "Khám phá hàng nghìn cơ hội việc làm mới nhất theo ngành nghề, khu vực và mức lương tại JobUp.",
  alternates: {
    canonical: `${SITE_URL}/tuyen-dung`,
  },
  openGraph: {
    title: "Việc Làm Mới Nhất | JobUp",
    description:
      "Tìm việc nhanh với danh sách việc làm cập nhật liên tục tại JobUp.",
    url: `${SITE_URL}/tuyen-dung`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Việc Làm Mới Nhất | JobUp",
    description:
      "Tìm việc nhanh với danh sách việc làm cập nhật liên tục tại JobUp.",
  },
};

export default function JobsPage() {
  return <JobsPageClient />;
}
