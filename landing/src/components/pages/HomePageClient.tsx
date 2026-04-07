"use client";

import { useEffect, useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  SpecialtySectors,
  FeaturesSection,
  TestimonialsSection,
  NewsSection,
  FloatingActions,
} from "@/components/sections";
import {
  fetchFeaturedArticlesPublic,
  fetchFeaturesPublic,
  fetchPartnersPublic,
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
import JobsSection from "@/components/sections/JobsSection";
interface HomePageClientProps {
  initialSettings: HomepageSettingsResponse | null;
}

export default function HomePageClient({
  initialSettings,
}: HomePageClientProps) {
  const settings: HomepageSettingsResponse | null = initialSettings;
  const [partners, setPartners] = useState<PartnerResponse[] | null>(null);
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
        fetchPartnersPublic(),
        fetchProvinces(),
        fetchFeaturesPublic(),
        fetchTestimonialsPublic(),
        fetchStatisticsPublic(),
        fetchFeaturedArticlesPublic(),
      ]);

      if (!isMounted) return;

      if (results[0].status === "fulfilled") setPartners(results[0].value);
      if (results[1].status === "fulfilled") setProvinces(results[1].value);
      if (results[2].status === "fulfilled") setFeatures(results[2].value);
      if (results[3].status === "fulfilled") setTestimonials(results[3].value);
      if (results[4].status === "fulfilled") setStatistics(results[4].value);
      if (results[5].status === "fulfilled") setArticles(results[5].value);
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
