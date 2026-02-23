/* ────────────────────────────────────────────────
 *  Types for GET /api/Jobs/latest
 * ──────────────────────────────────────────────── */

export interface ContactStaff {
    fullName: string;
    avatar: string | null;
    zaloPhone: string | null;
}

export interface PublicJobResponse {
    id: string;
    title: string;
    slug: string;
    displayCompanyName: string;
    categoryName: string;
    categorySlug: string;
    provinceName: string;
    salaryFrom: number;
    salaryTo: number;
    experience: number;
    workType: number; // 0 = Full-time, 1 = Part-time, 2 = Remote, …
    isHot: boolean;
    tags: string[];
    deadline: string;   // ISO 8601
    createdAt: string;  // ISO 8601
    viewCount: number;
    contactStaff: ContactStaff;
}

export interface ApiResponse<T> {
    succeeded: boolean;
    code: number;
    message: string;
    errors: string | null;
    data: T;
}
