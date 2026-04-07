import { API_BASE_URL, REVALIDATE_TIME } from "./config";
import type {
  AboutSettingResponse,
  ApiResponse,
  BannerPublicResponse,
  FeatureResponse,
  HomepageSettingsResponse,
  PartnerResponse,
  PublicArticleResponse,
  PublicArticleSearchResponse,
  PublicJobResponse,
  PublicJobDetailResponse,
  PublicJobSearchResponse,
  PublicMediaMentionCategoryResponse,
  PublicMediaMentionSearchResponse,
  PublicNewsCategoryResponse,
  PublicStaffResponse,
  ProvinceDropdown,
  JobCategoryTreeItem,
  StatisticResponse,
  TestimonialResponse,
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
 *  GET /api/Jobs/public (paged)
 * ──────────────────────────────────────────────── */

interface FetchLatestJobsParams {
  limit?: number;
  categoryId?: string;
  IsHot?: boolean;
}

export async function fetchLatestJobs(
  params: FetchLatestJobsParams = {},
): Promise<PublicJobResponse[]> {
  const url = new URL(`${API_BASE_URL}/api/Jobs/public`);

  if (params.limit) url.searchParams.set("PageSize", String(params.limit));
  url.searchParams.set("PageNumber", "1");
  if (params.categoryId) url.searchParams.set("CategoryId", params.categoryId);
  if (params.IsHot !== undefined) {
    url.searchParams.set("IsHot", String(params.IsHot));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch latest jobs: ${res.status}`);
  }

  const json: ApiResponse<PublicJobResponse[] | PublicJobSearchResponse> =
    await res.json();

  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  const data = json.data;
  if (Array.isArray(data)) return data;
  return data?.list || [];
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

export interface CreateEmployerContactPayload {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  position?: string;
  companySize?: string;
  message?: string;
}

export async function createEmployerContactPublic(
  payload: CreateEmployerContactPayload,
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/EmployerContacts/public`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    let apiMessage = "";
    try {
      const json = (await res.json()) as ApiResponse<unknown>;
      apiMessage = json.message || "";
    } catch {
      // Ignore parse errors and throw with status fallback.
    }
    throw new Error(apiMessage || `Submit contact failed: ${res.status}`);
  }
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

export async function fetchTopJobCategories(
  count = 4,
): Promise<JobCategoryTreeItem[]> {
  const url = new URL(`${API_BASE_URL}/api/JobCategories/public/top`);
  url.searchParams.set("count", String(count));

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch top job categories: ${res.status}`);
  }

  const json: ApiResponse<JobCategoryTreeItem[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

export interface PublicArticleSearchParams {
  Keyword?: string;
  NewsCategoryId?: string;
  PageNumber?: number;
  PageSize?: number;
  MostViewed?: boolean;
}

export async function fetchPublicArticles(
  params: PublicArticleSearchParams = {},
): Promise<PublicArticleSearchResponse> {
  const url = new URL(`${API_BASE_URL}/api/Articles/public`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), { next: { revalidate: 120 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch public articles: ${res.status}`);
  }

  const json: ApiResponse<PublicArticleSearchResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

export async function fetchPublicArticlesByCategorySlug(
  categorySlug: string,
  params: PublicArticleSearchParams = {},
): Promise<PublicArticleSearchResponse> {
  const encodedSlug = encodeURIComponent(categorySlug.trim());
  const url = new URL(
    `${API_BASE_URL}/api/Articles/public/by-category-slug/${encodedSlug}`,
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), { next: { revalidate: 120 } });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch public articles by category slug: ${res.status}`,
    );
  }

  const json: ApiResponse<PublicArticleSearchResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

export async function fetchFeaturedArticlesPublic(
  limit = 4,
): Promise<PublicArticleSearchResponse["list"]> {
  const data = await fetchPublicArticles({
    PageSize: limit,
    PageNumber: 1,
    MostViewed: true,
  });

  return data.list;
}

export async function fetchPublicArticleBySlug(
  slug: string,
): Promise<PublicArticleResponse> {
  const res = await fetch(`${API_BASE_URL}/api/Articles/public/${slug}`, {
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch public article by slug: ${res.status}`);
  }

  const json: ApiResponse<PublicArticleResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

export async function trackPublicArticleView(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Articles/public/${id}/view`, {
    method: "POST",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to track article view: ${res.status}`);
  }
}

export async function fetchPublicStaff(
  limit = 10,
): Promise<PublicStaffResponse[]> {
  const url = new URL(`${API_BASE_URL}/api/Users/public`);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { next: { revalidate: 120 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch public staff: ${res.status}`);
  }

  const json: ApiResponse<PublicStaffResponse[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

export async function fetchPublicNewsCategories(): Promise<
  PublicNewsCategoryResponse[]
> {
  const res = await fetch(`${API_BASE_URL}/api/NewsCategories/public`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch news categories: ${res.status}`);
  }

  const json: ApiResponse<PublicNewsCategoryResponse[]> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

export interface PublicMediaMentionSearchParams {
  Keyword?: string;
  MediaMentionCategoryId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export async function fetchPublicMediaMentions(
  params: PublicMediaMentionSearchParams = {},
): Promise<PublicMediaMentionSearchResponse> {
  const url = new URL(`${API_BASE_URL}/api/MediaMentions/public`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), { next: { revalidate: 120 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch public media mentions: ${res.status}`);
  }

  const json: ApiResponse<PublicMediaMentionSearchResponse> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

export async function fetchMediaMentionsPublic(
  params: PublicMediaMentionSearchParams = {},
): Promise<PublicMediaMentionSearchResponse> {
  return fetchPublicMediaMentions(params);
}

export async function trackPublicMediaMentionView(id: string): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/MediaMentions/public/${id}/track`,
    {
      method: "POST",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to track media mention view: ${res.status}`);
  }
}

export async function fetchPublicMediaMentionCategories(): Promise<
  PublicMediaMentionCategoryResponse[]
> {
  const res = await fetch(`${API_BASE_URL}/api/MediaMentionCategories/public`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch media mention categories: ${res.status}`);
  }

  const json: ApiResponse<PublicMediaMentionCategoryResponse[]> =
    await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

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

export async function fetchBannerPublic(
  position: string,
): Promise<BannerPublicResponse | null> {
  const safePosition = encodeURIComponent(position);
  const res = await fetch(
    `${API_BASE_URL}/api/Banners/public/${safePosition}`,
    {
      next: { revalidate: REVALIDATE_TIME },
    },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch banner: ${res.status}`);
  }

  const json: ApiResponse<BannerPublicResponse | null> = await res.json();
  if (!json.succeeded) {
    throw new Error(json.message || "API error");
  }

  return json.data;
}

/* ── Tracking: Jobs ── */

export async function trackPublicJobView(id: string): Promise<void> {
  await fetch(`${API_BASE_URL}/api/Jobs/public/${id}/view`, {
    method: "POST",
    cache: "no-store",
  }).catch(() => {});
}

export async function trackPublicJobApply(id: string): Promise<void> {
  await fetch(`${API_BASE_URL}/api/Jobs/public/${id}/apply`, {
    method: "POST",
    cache: "no-store",
  }).catch(() => {});
}

/* ── Tracking: Banners ── */

export async function trackBannerView(position: string): Promise<void> {
  const safePosition = encodeURIComponent(position);
  await fetch(`${API_BASE_URL}/api/Banners/public/${safePosition}/view`, {
    method: "POST",
    cache: "no-store",
  }).catch(() => {});
}

export async function trackBannerClick(position: string): Promise<void> {
  const safePosition = encodeURIComponent(position);
  await fetch(`${API_BASE_URL}/api/Banners/public/${safePosition}/click`, {
    method: "POST",
    cache: "no-store",
  }).catch(() => {});
}
