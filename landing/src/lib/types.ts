/* ────────────────────────────────────────────────
 *  Types for GET /api/Jobs/latest
 * ──────────────────────────────────────────────── */

export interface ContactStaff {
  fullName: string;
  avatar: string | null;
  zaloPhone: string | null;
}

export interface PublicCategoryInfo {
  id: string;
  name: string;
  slug: string | null;
}

export interface PublicLocationInfo {
  id: string;
  name: string;
}

export interface PublicJobResponse {
  id: string;
  title: string;
  slug: string | null;
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
  deadline: string; // ISO 8601
  createdAt: string; // ISO 8601
  viewCount: number;
  contactStaff: ContactStaff | null;
}

export interface PublicJobDetailResponse {
  id: string;
  title: string;
  slug: string | null;
  displayCompanyName: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  additionalInfo: string | null;
  category: PublicCategoryInfo | null;
  province: PublicLocationInfo | null;
  salaryFrom: number | null;
  salaryTo: number | null;
  quantity: number | null;
  gender: number | null;
  experience: number | null;
  level: number | null;
  workType: number | null;
  ageFrom: number | null;
  ageTo: number | null;
  contactStaff: ContactStaff | null;
  isHot: boolean;
  tags: string[] | null;
  deadline: string | null;
  viewCount: number;
  applicationCount: number;
  createdAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface PublicJobSearchResponse {
  list: PublicJobResponse[];
  totalCount: number;
  totalPages: number;
}

export interface ProvinceDropdown {
  id: string;
  name: string;
  slug: string | null;
  sortOrder: number;
}

export interface JobCategoryTreeItem {
  id: string;
  name: string;
  slug: string | null;
  icon: string | null;
  jobCount: number;
  children: JobCategoryTreeItem[];
}

export interface ApiResponse<T> {
  succeeded: boolean;
  code: number;
  message: string;
  errors: string | null;
  data: T;
}
