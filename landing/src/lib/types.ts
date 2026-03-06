/* ────────────────────────────────────────────────
 *  Types for GET /api/Jobs/latest
 * ──────────────────────────────────────────────── */

export interface ContactStaff {
  fullName: string;
  avatar: string | null;
  email: string | null;
  zaloPhone: string | null;
}

export interface PublicCategoryInfo {
  id: string;
  name: string;
  slug: string | null;
}

export interface PublicLocationInfo {
  id: string;
  name: string;
}

export interface PublicJobResponse {
  id: string;
  title: string;
  slug: string | null;
  displayCompanyName: string;
  categoryName: string;
  categorySlug: string;
  provinceName: string;
  salaryFrom: number;
  salaryTo: number;
  experience: number;
  workType: number; // 0 = Full-time, 1 = Part-time, 2 = Remote, …
  isHot: boolean;
  tags: string[];
  deadline: string; // ISO 8601
  createdAt: string; // ISO 8601
  viewCount: number;
  contactStaff: ContactStaff | null;
}

export interface PublicJobDetailResponse {
  id: string;
  title: string;
  slug: string | null;
  displayCompanyName: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  additionalInfo: string | null;
  category: PublicCategoryInfo | null;
  province: PublicLocationInfo | null;
  salaryFrom: number | null;
  salaryTo: number | null;
  quantity: number | null;
  gender: number | null;
  experience: number | null;
  level: number | null;
  workType: number | null;
  ageFrom: number | null;
  ageTo: number | null;
  contactStaff: ContactStaff | null;
  isHot: boolean;
  tags: string[] | null;
  deadline: string | null;
  viewCount: number;
  applicationCount: number;
  createdAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface PublicJobSearchResponse {
  list: PublicJobResponse[];
  totalCount: number;
  totalPages: number;
}

export interface ProvinceDropdown {
  id: string;
  name: string;
  slug: string | null;
  sortOrder: number;
}

export interface JobCategoryTreeItem {
  id: string;
  name: string;
  slug: string | null;
  tag: string | null;
  backgroundImage: string | null;
  description: string | null;
  jobCount: number;
  children: JobCategoryTreeItem[];
}

export interface PublicArticleListItemResponse {
  id: string;
  title: string;
  slug: string | null;
  avatar: string | null;
  summary: string | null;
  categoryName: string;
  categorySlug: string | null;
  authorName: string;
  authorAvatar: string | null;
  isHot: boolean;
  publishedAt: string | null;
}

export interface PublicArticleResponse {
  id: string;
  title: string;
  slug: string | null;
  avatar: string | null;
  summary: string | null;
  content: string | null;
  categoryName: string;
  categorySlug: string | null;
  authorName: string;
  authorAvatar: string | null;
  tags: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  isHot: boolean;
  viewCount: number;
  publishedAt: string | null;
}

export interface PublicArticleSearchResponse {
  list: PublicArticleListItemResponse[];
  totalCount: number;
  totalPages: number;
}

export interface PublicStaffResponse {
  id: string;
  fullName: string;
  roleName: string;
  avatar: string | null;
}

export interface PublicNewsCategoryResponse {
  id: string;
  name: string;
  slug: string | null;
  isActive: boolean;
  articleCount: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface PublicMediaMentionListItemResponse {
  id: string;
  title: string;
  summary: string | null;
  categoryName: string;
  categorySlug: string | null;
  sourceName: string | null;
  sourceLogo: string | null;
  articleUrl: string | null;
  thumbnailUrl: string | null;
  isFeatured: boolean;
  isHot: boolean;
  publishedAt: string | null;
}

export interface PublicMediaMentionSearchResponse {
  list: PublicMediaMentionListItemResponse[];
  totalCount: number;
  totalPages: number;
}

export interface PublicMediaMentionCategoryResponse {
  id: string;
  name: string;
  slug: string | null;
  sortOrder: number;
  isActive: boolean;
  mediaMentionCount: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface HomepageSettingsResponse {
  id: string;
  metaTitle: string | null;
  metaDescription: string | null;
  heroBadgeText: string | null;
  heroTitle1: string | null;
  heroTitleHighlight: string | null;
  heroSubtitle: string | null;
  heroImage: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface PartnerResponse {
  id: string;
  name: string | null;
  logoUrl: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface FeatureResponse {
  id: string;
  title: string;
  description: string | null;
  iconClass: string | null;
  imageUrl: string | null;
  tag1: string | null;
  tag2: string | null;
  linkUrl: string | null;
  buttonText: string | null;
  displayOrder: number;
  status: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface TestimonialResponse {
  id: string;
  name: string | null;
  position: string | null;
  avatarUrl: string | null;
  content: string | null;
  rating: number;
  displayOrder: number;
  status: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface StatisticResponse {
  id: string;
  numberText: string | null;
  label: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface PublicMediaMentionListItemResponse {
  id: string;
  title: string;
  summary: string | null;
  categoryName: string;
  categorySlug: string | null;
  sourceName: string | null;
  sourceLogo: string | null;
  articleUrl: string | null;
  thumbnailUrl: string | null;
  isFeatured: boolean;
  isHot: boolean;
  publishedAt: string | null;
}

export interface PublicMediaMentionSearchResponse {
  list: PublicMediaMentionListItemResponse[];
  totalCount: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  succeeded: boolean;
  code: number;
  message: string;
  errors: string | null;
  data: T;
}

/* ────────────────────────────────────────────────
 *  About Settings
 * ──────────────────────────────────────────────── */

export interface AboutSettingResponse {
  id: string;

  // SEO
  metaTitle: string | null;
  metaDescription: string | null;

  // Hero
  heroBadgeText: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroBackgroundImage: string | null;

  // Journey
  journeyBadgeText: string | null;
  journeyTitle: string | null;
  journeyParagraph1: string | null;
  journeyParagraph2: string | null;
  journeyImage1: string | null;
  journeyImage2: string | null;
  journeyImage3: string | null;
  journeyImage4: string | null;

  // Difference
  differenceBadgeText: string | null;
  differenceTitle: string | null;
  differenceSubtitle: string | null;
  differenceImage: string | null;
  differenceHeading1: string | null;
  differenceParagraph1: string | null;
  differenceHeading2: string | null;
  differenceParagraph2: string | null;
  differenceStatIcon: string | null;
  differenceStatTitle: string | null;
  differenceStatSubtitle: string | null;

  // Core Values
  coreValuesTitle: string | null;
  coreValue1Icon: string | null;
  coreValue1Title: string | null;
  coreValue1Description: string | null;
  coreValue2Icon: string | null;
  coreValue2Title: string | null;
  coreValue2Description: string | null;
  coreValue3Icon: string | null;
  coreValue3Title: string | null;
  coreValue3Description: string | null;

  // Leadership
  leadershipBadgeText: string | null;
  leadershipTitle: string | null;
  ceoRoleLabel: string | null;
  ceoName: string | null;
  ceoImage: string | null;
  ceoAchievements: string | null;
  advisorRoleLabel: string | null;
  advisorName: string | null;
  advisorImage: string | null;
  advisorAchievements: string | null;

  // CTA
  ctaTitle: string | null;
  ctaDescription: string | null;
  ctaButton1Text: string | null;
  ctaButton1Url: string | null;
  ctaButton2Text: string | null;
  ctaButton2Url: string | null;

  createdAt: string;
  updatedAt: string | null;
}

/* ────────────────────────────────────────────────
 *  Articles (public)
 * ──────────────────────────────────────────────── */

export interface PublicArticleListItemResponse {
  id: string;
  title: string;
  slug: string | null;
  avatar: string | null;
  summary: string | null;
  categoryName: string;
  categorySlug: string | null;
  isHot: boolean;
  publishedAt: string | null;
}

export interface PublicArticleSearchResponse {
  list: PublicArticleListItemResponse[];
  totalCount: number;
  totalPages: number;
}

/* ────────────────────────────────────────────────
 *  Types for GET /api/Banners/public/{position}
 * ──────────────────────────────────────────────── */
export interface BannerPublicResponse {
  position: string | null;
  badgeText: string | null;
  title: string | null;
  highlightText: string | null;
  description: string | null;
  buttonText: string | null;
  linkUrl: string | null;
  target: string;
  image: string | null;
  imageMobile: string | null;
}
