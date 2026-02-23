import { API_BASE_URL } from "./config";
import type { ApiResponse, PublicJobResponse } from "./types";

/* ────────────────────────────────────────────────
 *  GET /api/Jobs/latest
 * ──────────────────────────────────────────────── */

interface FetchLatestJobsParams {
    limit?: number;
    categoryId?: string;
}

export async function fetchLatestJobs(
    params: FetchLatestJobsParams = {}
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
