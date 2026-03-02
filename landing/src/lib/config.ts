// API base URL — set in .env.local as NEXT_PUBLIC_API_URL
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://api.ducdev04.pro.vn";

// ISR revalidate time in seconds — set in .env.local as NEXT_PUBLIC_REVALIDATE_TIME
export const REVALIDATE_TIME = parseInt(
    process.env.NEXT_PUBLIC_REVALIDATE_TIME || "300",
    10
);
