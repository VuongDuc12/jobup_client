"use client";

import { Navbar, Footer } from "@/components/layout";
import {
    AboutHeroSection,
    OurJourneySection,
    DifferenceSection,
    CoreValuesSection,
    LeadershipSection,
    StatsBarSection,
    PressMediaSection,
    AboutTestimonialsSection,
    AboutCTASection,
} from "@/components/about";
import { FloatingActions } from "@/components/sections";
import type {
    TestimonialResponse,
    StatisticResponse,
    PartnerResponse,
    PublicMediaMentionListItemResponse,
    AboutSettingResponse,
} from "@/lib/types";

interface AboutPageClientProps {
    initialTestimonials: TestimonialResponse[] | null;
    initialStatistics: StatisticResponse[] | null;
    initialPartners: PartnerResponse[] | null;
    initialMediaMentions: PublicMediaMentionListItemResponse[] | null;
    initialAboutSettings: AboutSettingResponse | null;
}

export default function AboutPageClient({
    initialTestimonials,
    initialStatistics,
    initialPartners,
    initialMediaMentions,
    initialAboutSettings,
}: AboutPageClientProps) {
    const s = initialAboutSettings;

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-20">
                <AboutHeroSection
                    badgeText={s?.heroBadgeText}
                    title={s?.heroTitle}
                    subtitle={s?.heroSubtitle}
                    backgroundImage={s?.heroBackgroundImage}
                />
                <OurJourneySection
                    badgeText={s?.journeyBadgeText}
                    title={s?.journeyTitle}
                    paragraph1={s?.journeyParagraph1}
                    paragraph2={s?.journeyParagraph2}
                    image1={s?.journeyImage1}
                    image2={s?.journeyImage2}
                    image3={s?.journeyImage3}
                    image4={s?.journeyImage4}
                />
                <DifferenceSection
                    badgeText={s?.differenceBadgeText}
                    title={s?.differenceTitle}
                    subtitle={s?.differenceSubtitle}
                    image={s?.differenceImage}
                    heading1={s?.differenceHeading1}
                    paragraph1={s?.differenceParagraph1}
                    heading2={s?.differenceHeading2}
                    paragraph2={s?.differenceParagraph2}
                    statIcon={s?.differenceStatIcon}
                    statTitle={s?.differenceStatTitle}
                    statSubtitle={s?.differenceStatSubtitle}
                />
                <CoreValuesSection
                    title={s?.coreValuesTitle}
                    value1Icon={s?.coreValue1Icon}
                    value1Title={s?.coreValue1Title}
                    value1Description={s?.coreValue1Description}
                    value2Icon={s?.coreValue2Icon}
                    value2Title={s?.coreValue2Title}
                    value2Description={s?.coreValue2Description}
                    value3Icon={s?.coreValue3Icon}
                    value3Title={s?.coreValue3Title}
                    value3Description={s?.coreValue3Description}
                />
                <LeadershipSection
                    badgeText={s?.leadershipBadgeText}
                    title={s?.leadershipTitle}
                    ceoRoleLabel={s?.ceoRoleLabel}
                    ceoName={s?.ceoName}
                    ceoImage={s?.ceoImage}
                    ceoAchievements={s?.ceoAchievements}
                    advisorRoleLabel={s?.advisorRoleLabel}
                    advisorName={s?.advisorName}
                    advisorImage={s?.advisorImage}
                    advisorAchievements={s?.advisorAchievements}
                />
                <StatsBarSection statistics={initialStatistics} />
                <PressMediaSection
                    partners={initialPartners}
                    mediaMentions={initialMediaMentions}
                />
                <AboutTestimonialsSection testimonials={initialTestimonials} />
                <AboutCTASection
                    title={s?.ctaTitle}
                    description={s?.ctaDescription}
                    button1Text={s?.ctaButton1Text}
                    button1Url={s?.ctaButton1Url}
                    button2Text={s?.ctaButton2Text}
                    button2Url={s?.ctaButton2Url}
                />
            </main>
            <Footer />
            <FloatingActions />
        </>
    );
}
