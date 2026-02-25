import { API_BASE_URL } from "./config";
import type {
  ApiResponse,
  PublicJobResponse,
  PublicJobDetailResponse,
  PublicJobSearchResponse,
  ProvinceDropdown,
  JobCategoryTreeItem,
} from "./types";

/* ────────────────────────────────────────────────
 *  GET /api/Jobs/latest
 * ──────────────────────────────────────────────── */

interface FetchLatestJobsParams {
  limit?: number;
  categoryId?: string;
}

export async function fetchLatestJobs(
  params: FetchLatestJobsParams = {},
): Promise<PublicJobResponse[]> {
  const url = new URL(`${API_BASE_URL}/api/Jobs/latest`);

  if (params.limit) url.searchParams.set("limit", String(params.limit));
  if (params.categoryId) url.searchParams.set("categoryId", params.categoryId);

  const res = await fetch(url.toString(), { next: { revalidate: 60 } }); // cache 60s

  if (!res.ok) {
    throw new Error(`Failed to fetch latest jobs: ${res.status}`);
  }

  const json: ApiResponse<PublicJobResponse[]> = await res.json();

  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Jobs/public
 * ──────────────────────────────────────────────── */

export interface PublicJobSearchParams {
  Keyword?: string;
  CategoryId?: string;
  ProvinceId?: string;
  SalaryFrom?: number;
  SalaryTo?: number;
  Experience?: number;
  WorkType?: number;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
}

export async function fetchPublicJobs(
  params: PublicJobSearchParams = {},
): Promise<PublicJobSearchResponse> {
  const url = new URL(`${API_BASE_URL}/api/Jobs/public`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch public jobs: ${res.status}`);
  }

  const json: ApiResponse<PublicJobSearchResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Jobs/public/{slug}
 * ──────────────────────────────────────────────── */

export async function fetchPublicJobBySlug(
  slug: string,
): Promise<PublicJobDetailResponse> {
  const res = await fetch(`${API_BASE_URL}/api/Jobs/public/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch job detail: ${res.status}`);
  }

  const json: ApiResponse<PublicJobDetailResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Jobs/public/{id}/related
 * ──────────────────────────────────────────────── */

export async function fetchRelatedJobs(
  id: string,
  limit = 6,
): Promise<PublicJobResponse[]> {
  const url = new URL(`${API_BASE_URL}/api/Jobs/public/${id}/related`);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch related jobs: ${res.status}`);
  }

  const json: ApiResponse<PublicJobResponse[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Provinces
 * ──────────────────────────────────────────────── */

export async function fetchProvinces(): Promise<ProvinceDropdown[]> {
  const res = await fetch(`${API_BASE_URL}/api/Provinces`);
  if (!res.ok) {
    throw new Error(`Failed to fetch provinces: ${res.status}`);
  }

  const json: ApiResponse<ProvinceDropdown[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/JobCategories/public
 * ──────────────────────────────────────────────── */

export async function fetchPublicJobCategories(): Promise<
  JobCategoryTreeItem[]
> {
  const res = await fetch(`${API_BASE_URL}/api/JobCategories/public`);
  if (!res.ok) {
    throw new Error(`Failed to fetch job categories: ${res.status}`);
  }

  const json: ApiResponse<JobCategoryTreeItem[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}
