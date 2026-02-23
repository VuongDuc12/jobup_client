import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tuyển Dụng Việc Làm Toàn Quốc - JobUp 2026",
    description:
        "Khám phá 50,000+ tin tuyển dụng việc làm mới nhất từ các tập đoàn hàng đầu. Lọc theo ngành nghề, mức lương và địa điểm. Tìm việc nhanh chóng cùng JobUp.",
    keywords:
        "tuyển dụng 2026, việc làm tốt, tìm việc nhanh, việc làm hà nội, việc làm hcm, lọc việc làm",
    openGraph: {
        title: "Tuyển Dụng Việc Làm Toàn Quốc - JobUp",
        description:
            "50,000+ tin tuyển dụng đã xác thực. Tìm việc phù hợp nhất với bạn.",
        url: "https://jobup.vn/tuyen-dung",
    },
};

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
