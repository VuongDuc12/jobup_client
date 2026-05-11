// API base URL — set in .env.local as NEXT_PUBLIC_API_URL
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://jobup.vn";

// ISR revalidate time in seconds — set in .env.local as NEXT_PUBLIC_REVALIDATE_TIME
export const REVALIDATE_TIME = parseInt(
    process.env.NEXT_PUBLIC_REVALIDATE_TIME || "300",
    10
);

// Jobs thay đổi thường xuyên → cache 10 phút
export const REVALIDATE_JOBS = 600;

// Nội dung tĩnh (ảnh, banner, đối tác) → cache 1 giờ
export const REVALIDATE_STATIC = 3600;

// Settings chứa ảnh (homepage, about) → cache 5 phút để admin thấy ảnh mới ngay
export const REVALIDATE_SETTINGS = 300;
