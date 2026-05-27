import type { Metadata } from "next";
import JobDetailPageClient from "@/components/pages/JobDetailPageClient";
import { fetchPublicJobBySlug } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jobup.vn";
const PREVIEW_IMAGE = `${SITE_URL}/jobdetail-og.jpg`;

type JobDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const job = await fetchPublicJobBySlug(slug);
    const title = job.seoTitle?.trim() || job.title;
    const description =
      job.seoDescription?.trim() ||
      job.description
        ?.replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim() ||
      `Ứng tuyển vị trí ${job.title} tại ${job.displayCompanyName} trên JobUp.`;
    const canonical = `${SITE_URL}/tuyen-dung/${slug}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        images: [
          {
            url: PREVIEW_IMAGE,
            width: 1448,
            height: 1086,
            alt: "JobUp",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [PREVIEW_IMAGE],
      },
    };
  } catch {
    return {
      title: "Chi tiết công việc | JobUp",
      description: "Thông tin chi tiết công việc và cách ứng tuyển tại JobUp.",
      alternates: {
        canonical: `${SITE_URL}/tuyen-dung/${slug}`,
      },
    };
  }
}

export default function JobDetailPage() {
  return <JobDetailPageClient />;
}
