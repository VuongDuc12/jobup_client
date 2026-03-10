import type { Metadata } from "next";
import InternalNewsDetailPageClient from "@/components/pages/InternalNewsDetailPageClient";
import { fetchPublicArticleBySlug } from "@/lib/api";
import { resolveAssetUrl } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ducdev04.pro.vn";

type InternalNewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: InternalNewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await fetchPublicArticleBySlug(slug);
    const title = article.title;
    const description =
      article.seoDescription?.trim() ||
      article.summary?.trim() ||
      "Bài viết chi tiết từ chuyên mục tin nội bộ JobUp.";
    const image = resolveAssetUrl(article.avatar) || undefined;
    const canonical = `${SITE_URL}/tin-noi-bo/${slug}`;

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
      title: "Chi tiết tin nội bộ | JobUp",
      description: "Nội dung chi tiết bài viết từ chuyên mục tin nội bộ JobUp.",
      alternates: {
        canonical: `${SITE_URL}/tin-noi-bo/${slug}`,
      },
    };
  }
}

export default function InternalNewsDetailPage() {
  return <InternalNewsDetailPageClient />;
}
