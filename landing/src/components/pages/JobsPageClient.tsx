"use client";

import { useEffect, useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/sections";
import {
  JobSearchHub,
  JobListings,
  UrgentJobsWidget,
  CareerHandbook,
} from "@/components/jobs";
import DynamicBanner from "@/components/shared/DynamicBanner";
import { fetchProvinces, fetchPublicJobCategories } from "@/lib/api";
import type { JobCategoryTreeItem, ProvinceDropdown } from "@/lib/types";

export default function JobsPage() {
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

  useEffect(() => {
    const raw = sessionStorage.getItem("jobup_jobs_filters");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as {
        keyword?: string;
        provinceId?: string;
        categoryId?: string;
        salaryFrom?: string;
        salaryTo?: string;
        experience?: string;
        workType?: string;
        sortBy?: string;
      };

      const nextKeyword = parsed.keyword ?? "";
      const nextProvinceId = parsed.provinceId ?? "";
      const nextCategoryId = parsed.categoryId ?? "";
      const nextSalaryFrom = parsed.salaryFrom ?? "";
      const nextSalaryTo = parsed.salaryTo ?? "";
      const nextExperience = parsed.experience ?? "";
      const nextWorkType = parsed.workType ?? "";
      const nextSortBy = parsed.sortBy ?? "newest";

      setKeyword(nextKeyword);
      setProvinceId(nextProvinceId);
      setCategoryId(nextCategoryId);
      setSalaryFrom(nextSalaryFrom);
      setSalaryTo(nextSalaryTo);
      setExperience(nextExperience);
      setWorkType(nextWorkType);
      setSortBy(nextSortBy);

      setSearchKeyword(nextKeyword);
      setSearchProvinceId(nextProvinceId);
      setSearchCategoryId(nextCategoryId);
      setSearchSalaryFrom(nextSalaryFrom ? Number(nextSalaryFrom) : undefined);
      setSearchSalaryTo(nextSalaryTo ? Number(nextSalaryTo) : undefined);
      setSearchExperience(nextExperience ? Number(nextExperience) : undefined);
      setSearchWorkType(nextWorkType ? Number(nextWorkType) : undefined);
      setSearchSortBy(nextSortBy);
    } catch {
      // no-op
    } finally {
      sessionStorage.removeItem("jobup_jobs_filters");
    }
  }, []);

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
      <main className="flex-grow pt-24 bg-[#F8F9FA] overflow-x-hidden">
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
            <div className="lg:col-span-8 min-w-0 flex flex-col gap-6">
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
              <DynamicBanner position="jobs_spotlight" variant="spotlight" />
            </div>

            <aside className="lg:col-span-4 min-w-0 space-y-8">
              <DynamicBanner position="jobs_sidebar" variant="sidebar" />
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
