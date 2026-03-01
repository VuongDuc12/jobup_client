/* ────────────────────────────────────────────────
 *  Utility helpers
 * ──────────────────────────────────────────────── */

import { API_BASE_URL } from "./config";

/**
 * Prepend API_BASE_URL to a relative asset path (e.g. `/storage/about/xxx.jpg`).
 * Returns the original value when it's already an absolute URL.
 * Returns `null` for falsy inputs so callers can apply a fallback.
 */
export function getAssetUrl(path: string | null | undefined): string | null {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${API_BASE_URL}${path}`;
}

/**
 * Format salary range in VNĐ.
 * e.g. (10_000_000, 18_000_000) → "10 - 18 triệu VNĐ"
 * If both are 0 → "Thỏa thuận"
 */
export function formatSalary(from: number, to: number): string {
    if (from === 0 && to === 0) return "Thỏa thuận";
    const f = from > 0 ? Math.round(from / 1_000_000) : null;
    const t = to > 0 ? Math.round(to / 1_000_000) : null;

    if (f && t) return `${f} - ${t} triệu VNĐ`;
    if (f) return `Từ ${f} triệu VNĐ`;
    if (t) return `Lên đến ${t} triệu VNĐ`;
    return "Thỏa thuận";
}

/**
 * Map numeric workType to human readable label.
 */
const WORK_TYPE_MAP: Record<number, string> = {
    0: "Full-time",
    1: "Part-time",
    2: "Remote",
    3: "Freelance",
    4: "Thực tập",
};
export function workTypeLabel(workType: number): string {
    return WORK_TYPE_MAP[workType] ?? "Khác";
}

/**
 * Relative time string in Vietnamese.
 * e.g. "3 giờ trước", "1 ngày trước"
 */
export function timeAgo(isoDate: string): string {
    const now = Date.now();
    const then = new Date(isoDate).getTime();
    const diffMs = now - then;

    const minutes = Math.floor(diffMs / 60_000);
    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ngày trước`;

    const months = Math.floor(days / 30);
    return `${months} tháng trước`;
}

/**
 * Get first letter of company name (for logo fallback).
 */
export function companyInitial(name: string): string {
    return name.charAt(0).toUpperCase();
}

/**
 * Map experience (years) to label.
 */
export function experienceLabel(years: number): string {
    if (years === 0) return "Không yêu cầu";
    if (years === 1) return "1 năm";
    return `${years} năm`;
}
