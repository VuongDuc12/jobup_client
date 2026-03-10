import type { Metadata } from "next";
import JobDetailPageClient from "@/components/pages/JobDetailPageClient";
import { fetchPublicJobBySlug } from "@/lib/api";
import { resolveAssetUrl } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ducdev04.pro.vn";

type JobDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const job = await fetchPublicJobBySlug(slug);
    const title = job.title;
    const description =
      job.seoDescription?.trim() ||
      job.description
        ?.replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim() ||
      `Ứng tuyển vị trí ${job.title} tại ${job.displayCompanyName} trên JobUp.`;
    const image = resolveAssetUrl(job.contactStaff?.avatar) || undefined;
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
        images: image ? [image] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
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
