import type { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ducdev04.pro.vn";

export const metadata: Metadata = {
  title: "Liên hệ | JobUp",
  description:
    "Liên hệ JobUp để tìm ứng viên, tìm việc và nhận tư vấn nhanh chóng.",
  alternates: {
    canonical: `${SITE_URL}/lien-he`,
  },
  openGraph: {
    title: "Liên hệ | JobUp",
    description: "Thông tin liên hệ, địa chỉ và bản đồ JobUp.",
    url: `${SITE_URL}/lien-he`,
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
