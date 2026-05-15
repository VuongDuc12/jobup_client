import type { MetadataRoute } from "next";
import { fetchPublicJobs, fetchPublicArticles } from "@/lib/api";
import type {
  PublicJobResponse,
  PublicArticleListItemResponse,
} from "@/lib/types";

export const revalidate = 3600; // Regenerate sitemap every 1 hour

const BASE_URL = "https://jobup.vn";
const PAGE_SIZE = 200;

async function getAllJobs(): Promise<PublicJobResponse[]> {
  const all: PublicJobResponse[] = [];
  let page = 1;

  while (true) {
    const res = await fetchPublicJobs({
      PageSize: PAGE_SIZE,
      PageNumber: page,
    });

    console.log("SITEMAP JOBS PAGE:", page, "total:", res?.totalPages, "count:", res?.list?.length);

    const list = res?.list ?? [];
    const totalPages = res?.totalPages ?? 1;

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
    const res = await fetchPublicArticles({
      PageSize: PAGE_SIZE,
      PageNumber: page,
    });

    console.log("SITEMAP ARTICLES PAGE:", page, "total:", res?.totalPages, "count:", res?.list?.length);

    const list = res?.list ?? [];
    const totalPages = res?.totalPages ?? 1;

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
    const jobs = await getAllJobs();

    const now = new Date();

    jobRoutes = jobs
      .filter((job) => job.slug && new Date(job.deadline) >= now)
      .map((job) => ({
        url: `${BASE_URL}/tuyen-dung/${encodeURIComponent(job.slug!)}`,
        lastModified: job.createdAt ? new Date(job.createdAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    console.log("SITEMAP JOB ROUTES:", jobRoutes.length);
  } catch (error) {
    console.error("SITEMAP JOBS ERROR:", error);
  }

  try {
    const articles = await getAllArticles();

    articleRoutes = articles
      .filter((article) => article.slug)
      .map((article) => ({
        url: `${BASE_URL}/tin-noi-bo/${encodeURIComponent(article.slug!)}`,
        lastModified: article.publishedAt
          ? new Date(article.publishedAt)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    console.log("SITEMAP ARTICLE ROUTES:", articleRoutes.length);
  } catch (error) {
    console.error("SITEMAP ARTICLES ERROR:", error);
  }

  return [...staticRoutes, ...jobRoutes, ...articleRoutes];
}
