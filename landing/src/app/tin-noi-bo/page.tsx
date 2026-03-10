import type { Metadata } from "next";
import InternalNewsPageClient from "@/components/pages/InternalNewsPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ducdev04.pro.vn";

export const metadata: Metadata = {
  title: "Tin Nội Bộ | JobUp",
  description:
    "Cập nhật tin nội bộ, kiến thức nghề nghiệp và chia sẻ chuyên sâu từ đội ngũ JobUp.",
  alternates: {
    canonical: `${SITE_URL}/tin-noi-bo`,
  },
  openGraph: {
    title: "Tin Nội Bộ | JobUp",
    description:
      "Khám phá các bài viết mới nhất về nghề nghiệp, kỹ năng và thông tin nội bộ JobUp.",
    url: `${SITE_URL}/tin-noi-bo`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin Nội Bộ | JobUp",
    description:
      "Khám phá các bài viết mới nhất về nghề nghiệp, kỹ năng và thông tin nội bộ JobUp.",
  },
};

export default function InternalNewsPage() {
  return <InternalNewsPageClient />;
}
