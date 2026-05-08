import type { MetadataRoute } from "next";
import { fetchPublicJobs, fetchPublicArticles } from "@/lib/api";
import type {
  PublicJobResponse,
  PublicArticleListItemResponse,
} from "@/lib/types";

// Revalidate mỗi 1 giờ để sitemap luôn cập nhật jobs/articles mới
export const revalidate = 3600;

const BASE_URL ="https://jobup.vn";

const PAGE_SIZE = 200;

async function getAllJobs(): Promise<PublicJobResponse[]> {
  const all: PublicJobResponse[] = [];
  let page = 1;
  while (true) {
    const { list, totalPages } = await fetchPublicJobs({
      PageSize: PAGE_SIZE,
      PageNumber: page,
    });
    all.push(...list);
    if (page >= totalPages || list.length === 0) break;
    page++;
  }
  return all;
}

async function getAllArticles(): Promise<PublicArticleListItemResponse[]> {
  const all: PublicArticleListItemResponse[] = [];
  let page = 1;
  while (true) {
    const { list, totalPages } = await fetchPublicArticles({
      PageSize: PAGE_SIZE,
      PageNumber: page,
    });
    all.push(...list);
    if (page >= totalPages || list.length === 0) break;
    page++;
  }
  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tuyen-dung`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tin-noi-bo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ve-chung-toi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/truyen-thong`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let jobRoutes: MetadataRoute.Sitemap = [];
  let articleRoutes: MetadataRoute.Sitemap = [];

  try {
    const [jobs, articles] = await Promise.all([
      getAllJobs(),
      getAllArticles(),
    ]);

    jobRoutes = jobs
      .filter((job) => job.slug)
      .map((job) => ({
        url: `${BASE_URL}/tuyen-dung/${job.slug}`,
        lastModified: new Date(job.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    articleRoutes = articles
      .filter((article) => article.slug)
      .map((article) => ({
        url: `${BASE_URL}/tin-noi-bo/${article.slug}`,
        lastModified: article.publishedAt
          ? new Date(article.publishedAt)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    // Bỏ qua nếu API lỗi, không làm hỏng build/render
  }

  return [...staticRoutes, ...jobRoutes, ...articleRoutes];
}
