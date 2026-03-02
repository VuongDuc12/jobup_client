export interface InternalNewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  heroImage: string;
  coverImage: string;
  tags: string[];
  content: string[];
}

export interface MediaMentionItem {
  id: string;
  source: string;
  sourceLogo: string;
  title: string;
  label: string;
  publishedAt: string;
  articleUrl: string;
}

export const internalNewsArticles: InternalNewsArticle[] = [];

export const mediaMentions: MediaMentionItem[] = [];
