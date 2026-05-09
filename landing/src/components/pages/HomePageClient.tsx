"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar, Footer } from "@/components/layout";
import { HeroSection, FloatingActions } from "@/components/sections";
import {
  fetchFeaturedArticlesPublic,
  fetchFeaturesPublic,
  fetchProvinces,
  fetchStatisticsPublic,
  fetchTestimonialsPublic,
} from "@/lib/api";
import type {
  FeatureResponse,
  HomepageSettingsResponse,
  PartnerResponse,
  ProvinceDropdown,
  PublicArticleListItemResponse,
  StatisticResponse,
  TestimonialResponse,
} from "@/lib/types";

// Below-fold sections — loaded lazily after initial paint to reduce TBT/main-thread work
const JobsSection = dynamic(() => import("@/components/sections/JobsSection"), { ssr: false });
const SpecialtySectors = dynamic(() => import("@/components/sections/SpecialtySectors"), { ssr: false });
const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"), { ssr: false });
const NewsSection = dynamic(() => import("@/components/sections/NewsSection"), { ssr: false });
interface HomePageClientProps {
  initialSettings: HomepageSettingsResponse | null;
  initialPartners: PartnerResponse[] | null;
}

export default function HomePageClient({
  initialSettings,
  initialPartners,
}: HomePageClientProps) {
  const settings: HomepageSettingsResponse | null = initialSettings;
  const [partners, setPartners] = useState<PartnerResponse[] | null>(initialPartners);
  const [features, setFeatures] = useState<FeatureResponse[] | null>(null);
  const [testimonials, setTestimonials] = useState<
    TestimonialResponse[] | null
  >(null);
  const [statistics, setStatistics] = useState<StatisticResponse[] | null>(
    null,
  );
  const [provinces, setProvinces] = useState<ProvinceDropdown[] | null>(null);
  const [articles, setArticles] = useState<
    PublicArticleListItemResponse[] | null
  >(null);

  useEffect(() => {
    let isMounted = true;

    const loadHomepageData = async () => {
      const results = await Promise.allSettled([
        fetchProvinces(),
        fetchFeaturesPublic(),
        fetchTestimonialsPublic(),
        fetchStatisticsPublic(),
        fetchFeaturedArticlesPublic(),
      ]);

      if (!isMounted) return;

      if (results[0].status === "fulfilled") setProvinces(results[0].value);
      if (results[1].status === "fulfilled") setFeatures(results[1].value);
      if (results[2].status === "fulfilled") setTestimonials(results[2].value);
      if (results[3].status === "fulfilled") setStatistics(results[3].value);
      if (results[4].status === "fulfilled") setArticles(results[4].value);
    };

    loadHomepageData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 landing-page-shell-tight">
        <HeroSection
          badgeText={settings?.heroBadgeText}
          title1={settings?.heroTitle1}
          titleHighlight={settings?.heroTitleHighlight}
          subtitle={settings?.heroSubtitle}
          heroImage={settings?.heroImage}
          partners={partners}
          provinces={provinces}
        />
        <JobsSection />
        <SpecialtySectors />
        <FeaturesSection features={features} statistics={statistics} />
        {/* <TestimonialsSection testimonials={testimonials} /> */}
        <NewsSection articles={articles} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
