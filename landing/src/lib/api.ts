import { API_BASE_URL, REVALIDATE_TIME } from "./config";
import type {
  AboutSettingResponse,
  ApiResponse,
  BannerPublicResponse,
  FeatureResponse,
  HomepageSettingsResponse,
  PartnerResponse,
  PublicArticleListItemResponse,
  PublicArticleSearchResponse,
  PublicJobResponse,
  PublicJobDetailResponse,
  PublicJobSearchResponse,
  ProvinceDropdown,
  JobCategoryTreeItem,
  StatisticResponse,
  TestimonialResponse,
  PublicMediaMentionSearchResponse,
} from "./types";

/* ────────────────────────────────────────────────
 *  GET /api/HomepageSettings/public
 * ──────────────────────────────────────────────── */

export async function fetchHomepageSettingsPublic(): Promise<HomepageSettingsResponse> {
  const res = await fetch(`${API_BASE_URL}/api/HomepageSettings/public`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch homepage settings: ${res.status}`);
  }

  const json: ApiResponse<HomepageSettingsResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Partners/public
 * ──────────────────────────────────────────────── */

export async function fetchPartnersPublic(): Promise<PartnerResponse[]> {
  const res = await fetch(`${API_BASE_URL}/api/Partners/public`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch partners: ${res.status}`);
  }

  const json: ApiResponse<PartnerResponse[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Features/public
 * ──────────────────────────────────────────────── */

export async function fetchFeaturesPublic(): Promise<FeatureResponse[]> {
  const res = await fetch(`${API_BASE_URL}/api/Features/public`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch features: ${res.status}`);
  }

  const json: ApiResponse<FeatureResponse[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Testimonials/public
 * ──────────────────────────────────────────────── */

export async function fetchTestimonialsPublic(): Promise<
  TestimonialResponse[]
> {
  const res = await fetch(`${API_BASE_URL}/api/Testimonials/public`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch testimonials: ${res.status}`);
  }

  const json: ApiResponse<TestimonialResponse[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Statistics/public
 * ──────────────────────────────────────────────── */

export async function fetchStatisticsPublic(): Promise<StatisticResponse[]> {
  const res = await fetch(`${API_BASE_URL}/api/Statistics/public`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch statistics: ${res.status}`);
  }

  const json: ApiResponse<StatisticResponse[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

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
  const url = new URL(`${API_BASE_URL}/api/Jobs/public/latest`);

  if (params.limit) url.searchParams.set("limit", String(params.limit));
  if (params.categoryId) url.searchParams.set("categoryId", params.categoryId);

  const res = await fetch(url.toString(), { next: { revalidate: REVALIDATE_TIME } });

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
 *  GET /api/Jobs/recommended
 * ──────────────────────────────────────────────── */

interface FetchRecommendedJobsParams {
  limit?: number;
  excludedId?: string;
  recentCategoryIds?: string[] | string;
}

export async function fetchRecommendedJobs(
  params: FetchRecommendedJobsParams = {},
): Promise<PublicJobResponse[]> {
  const url = new URL(`${API_BASE_URL}/api/Jobs/public/recommended`);

  if (params.limit) url.searchParams.set("limit", String(params.limit));
  if (params.excludedId) url.searchParams.set("excludedId", params.excludedId);

  if (params.recentCategoryIds) {
    const value = Array.isArray(params.recentCategoryIds)
      ? params.recentCategoryIds.join(",")
      : params.recentCategoryIds;
    if (value.trim()) url.searchParams.set("recentCategoryIds", value);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch recommended jobs: ${res.status}`);
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
 *  GET /api/Jobs/{id}/similar
 * ──────────────────────────────────────────────── */

export async function fetchSimilarJobs(
  id: string,
  limit = 6,
): Promise<PublicJobResponse[]> {
  const url = new URL(`${API_BASE_URL}/api/Jobs/${id}/similar`);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch similar jobs: ${res.status}`);
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

/* ────────────────────────────────────────────────
 *  GET /api/JobCategories/public/top
 * ──────────────────────────────────────────────── */

export async function fetchTopJobCategories(
  count: number = 4,
): Promise<JobCategoryTreeItem[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/JobCategories/public/top?count=${count}`,
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch top job categories: ${res.status}`);
  }

  const json: ApiResponse<JobCategoryTreeItem[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/MediaMentions/public
 * ──────────────────────────────────────────────── */

export interface MediaMentionSearchParams {
  Keyword?: string;
  MediaMentionCategoryId?: string;
  IsFeatured?: boolean;
  PageNumber?: number;
  PageSize?: number;
}

export async function fetchMediaMentionsPublic(
  params: MediaMentionSearchParams = {},
): Promise<PublicMediaMentionSearchResponse> {
  const url = new URL(`${API_BASE_URL}/api/MediaMentions/public`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), { next: { revalidate: REVALIDATE_TIME } });
  if (!res.ok) {
    throw new Error(`Failed to fetch media mentions: ${res.status}`);
  }

  const json: ApiResponse<PublicMediaMentionSearchResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/AboutSettings/public
 * ──────────────────────────────────────────────── */

export async function fetchAboutSettingsPublic(): Promise<AboutSettingResponse> {
  const res = await fetch(`${API_BASE_URL}/api/AboutSettings/public`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch about settings: ${res.status}`);
  }

  const json: ApiResponse<AboutSettingResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ────────────────────────────────────────────────
 *  GET /api/Articles/public  (featured / hot)
 * ──────────────────────────────────────────────── */

export async function fetchFeaturedArticlesPublic(
  limit = 4,
): Promise<PublicArticleListItemResponse[]> {
  const url = new URL(`${API_BASE_URL}/api/Articles/public`);
  url.searchParams.set("IsHot", "true");
  url.searchParams.set("PageSize", String(limit));

  const res = await fetch(url.toString(), { next: { revalidate: REVALIDATE_TIME } });
  if (!res.ok) {
    throw new Error(`Failed to fetch featured articles: ${res.status}`);
  }

  const json: ApiResponse<PublicArticleSearchResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data.list;
}

/* ────────────────────────────────────────────────
 *  GET /api/Banners/public/{position}
 * ──────────────────────────────────────────────── */
export async function fetchBannerPublic(
  position: string,
): Promise<BannerPublicResponse | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/Banners/public/${position}`,
      { next: { revalidate: REVALIDATE_TIME } },
    );
    if (!res.ok) return null;

    const json: ApiResponse<BannerPublicResponse | null> = await res.json();
    if (!json.succeeded || !json.data) return null;

    return json.data;
  } catch {
    return null;
  }
}
