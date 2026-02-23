"use client";

import { useState } from "react";
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

export default function JobsPage() {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    const handleSearch = () => {
        // TODO: Implement search with keyword + location filters
        console.log("Search:", { keyword, location });
    };

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-24 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    {/* Search Hub */}
                    <JobSearchHub
                        keyword={keyword}
                        location={location}
                        onKeywordChange={setKeyword}
                        onLocationChange={setLocation}
                        onSearch={handleSearch}
                    />

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* LEFT: Main Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            {/* Job Listings (from API) */}
                            <JobListings keyword={keyword} location={location} />

                            {/* Spotlight Banner */}
                            <SpotlightBanner />
                        </div>

                        {/* RIGHT: Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* CV Review CTA */}
                            <CVReviewCTA />

                            {/* Sticky Sidebar Widgets */}
                            <div className="sticky top-24 space-y-6">
                                {/* Urgent Jobs Widget (from API) */}
                                <UrgentJobsWidget />

                                {/* Career Handbook Slider */}
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
