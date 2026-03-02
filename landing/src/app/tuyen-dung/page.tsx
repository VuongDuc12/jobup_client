"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import {
  JobSearchHub,
  JobListings,
  SpotlightBanner,
  CVReviewCTA,
  UrgentJobsWidget,
  CareerHandbook,
} from "@/components/jobs";
import { fetchProvinces, fetchPublicJobCategories } from "@/lib/api";
import type { JobCategoryTreeItem, ProvinceDropdown } from "@/lib/types";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [experience, setExperience] = useState("");
  const [workType, setWorkType] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProvinceId, setSearchProvinceId] = useState("");
  const [searchCategoryId, setSearchCategoryId] = useState("");
  const [searchSalaryFrom, setSearchSalaryFrom] = useState<number | undefined>(
    undefined,
  );
  const [searchSalaryTo, setSearchSalaryTo] = useState<number | undefined>(
    undefined,
  );
  const [searchExperience, setSearchExperience] = useState<number | undefined>(
    undefined,
  );
  const [searchWorkType, setSearchWorkType] = useState<number | undefined>(
    undefined,
  );
  const [searchSortBy, setSearchSortBy] = useState("newest");
  const [provinces, setProvinces] = useState<ProvinceDropdown[]>([]);
  const [categories, setCategories] = useState<JobCategoryTreeItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchProvinces(), fetchPublicJobCategories()])
      .then(([provinceData, categoryData]) => {
        if (!isMounted) return;
        setProvinces(provinceData);
        setCategories(categoryData);
      })
      .catch(() => {
        if (!isMounted) return;
        setProvinces([]);
        setCategories([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Read URL params from homepage search and auto-trigger search
  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") ?? "";
    const urlProvinceId = searchParams.get("provinceId") ?? "";
    const urlCategoryId = searchParams.get("categoryId") ?? "";
    const urlCategorySlug = searchParams.get("categorySlug") ?? "";
    const urlSalaryFrom = searchParams.get("salaryFrom") ?? "";
    const urlSalaryTo = searchParams.get("salaryTo") ?? "";
    const urlExperience = searchParams.get("experience") ?? "";
    const urlWorkType = searchParams.get("workType") ?? "";
    const urlSortBy = searchParams.get("sortBy") ?? "newest";

    // Resolve categorySlug → id using the loaded categories tree
    let resolvedCategoryId = urlCategoryId;
    if (urlCategorySlug) {
      const findBySlug = (items: JobCategoryTreeItem[], slug: string): JobCategoryTreeItem | undefined => {
        for (const item of items) {
          if (item.slug === slug) return item;
          const found = findBySlug(item.children, slug);
          if (found) return found;
        }
        return undefined;
      };
      const matched = findBySlug(categories, urlCategorySlug);
      if (matched) resolvedCategoryId = matched.id;
      // If categories not yet loaded, resolvedCategoryId stays empty — effect re-runs when categories load
    }

    if (urlKeyword || urlProvinceId || resolvedCategoryId || (urlCategorySlug && categories.length === 0)) {
      setKeyword(urlKeyword);
      setProvinceId(urlProvinceId);
      setCategoryId(resolvedCategoryId);
      setSalaryFrom(urlSalaryFrom);
      setSalaryTo(urlSalaryTo);
      setExperience(urlExperience);
      setWorkType(urlWorkType);
      setSortBy(urlSortBy);

      if (!urlCategorySlug || resolvedCategoryId) {
        setSearchKeyword(urlKeyword);
        setSearchProvinceId(urlProvinceId);
        setSearchCategoryId(resolvedCategoryId);
        setSearchSalaryFrom(urlSalaryFrom ? Number(urlSalaryFrom) : undefined);
        setSearchSalaryTo(urlSalaryTo ? Number(urlSalaryTo) : undefined);
        setSearchExperience(urlExperience ? Number(urlExperience) : undefined);
        setSearchWorkType(urlWorkType ? Number(urlWorkType) : undefined);
        setSearchSortBy(urlSortBy);
      }
    }
  }, [searchParams, categories]);

  const handleSearch = () => {
    const parseSalary = (value: string) => {
      const digits = value.replace(/\./g, "").trim();
      return digits ? Number(digits) : undefined;
    };
    setSearchKeyword(keyword);
    setSearchProvinceId(provinceId);
    setSearchCategoryId(categoryId);
    setSearchSalaryFrom(parseSalary(salaryFrom));
    setSearchSalaryTo(parseSalary(salaryTo));
    setSearchExperience(experience ? Number(experience) : undefined);
    setSearchWorkType(workType ? Number(workType) : undefined);
    setSearchSortBy(sortBy || "newest");
  };

  const categoryOptions = categories.flatMap((item) => {
    const flatten = (
      node: JobCategoryTreeItem,
      depth: number,
    ): { id: string; name: string; depth: number }[] => {
      const children = node.children.flatMap((child) =>
        flatten(child, depth + 1),
      );
      return [{ id: node.id, name: node.name, depth }, ...children];
    };
    return flatten(item, 0);
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <JobSearchHub
            keyword={keyword}
            provinceId={provinceId}
            provinces={provinces}
            categories={categoryOptions}
            categoryId={categoryId}
            salaryFrom={salaryFrom}
            salaryTo={salaryTo}
            experience={experience}
            workType={workType}
            sortBy={sortBy}
            onKeywordChange={setKeyword}
            onProvinceChange={setProvinceId}
            onCategoryChange={setCategoryId}
            onSalaryFromChange={setSalaryFrom}
            onSalaryToChange={setSalaryTo}
            onExperienceChange={setExperience}
            onWorkTypeChange={setWorkType}
            onSortByChange={setSortBy}
            onSearch={handleSearch}
          />

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <JobListings
                keyword={searchKeyword}
                provinceId={searchProvinceId}
                categoryId={searchCategoryId}
                salaryFrom={searchSalaryFrom}
                salaryTo={searchSalaryTo}
                experience={searchExperience}
                workType={searchWorkType}
                sortBy={searchSortBy}
              />
              <SpotlightBanner />
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <CVReviewCTA />
              <div className="sticky top-24 space-y-6">
                <UrgentJobsWidget />
                <CareerHandbook />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
