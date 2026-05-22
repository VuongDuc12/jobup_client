"use client";

import dynamic from "next/dynamic";
import { Navbar, Footer } from "@/components/layout";
import {
  AboutHeroSection,
  OurJourneySection,
  DifferenceSection,
  CoreValuesSection,
  PartnersSection,
} from "@/components/about";
import { FloatingActions } from "@/components/sections";
import type {
  PartnerResponse,
  TestimonialResponse,
  StatisticResponse,
  PublicMediaMentionListItemResponse,
  AboutSettingResponse,
} from "@/lib/types";

// Below-fold / heavy sections — lazy loaded after initial paint
const LeadershipSection = dynamic(
  () => import("@/components/about/LeadershipSection"),
  { ssr: false },
);
const StatsBarSection = dynamic(
  () => import("@/components/about/StatsBarSection"),
  { ssr: false },
);
// const PressMediaSection = dynamic(() => import("@/components/about/PressMediaSection"), { ssr: false });
const AboutTestimonialsSection = dynamic(
  () => import("@/components/about/AboutTestimonialsSection"),
  { ssr: false },
); // contains Swiper
const AboutCTASection = dynamic(
  () => import("@/components/about/AboutCTASection"),
  { ssr: false },
);

interface AboutPageClientProps {
  initialTestimonials: TestimonialResponse[] | null;
  initialStatistics: StatisticResponse[] | null;
  initialMediaMentions: PublicMediaMentionListItemResponse[] | null;
  initialPartners: PartnerResponse[] | null;
  initialAboutSettings: AboutSettingResponse | null;
}

export default function AboutPageClient({
  initialTestimonials,
  initialStatistics,
  // initialMediaMentions,
  initialPartners,
  initialAboutSettings,
}: AboutPageClientProps) {
  const s = initialAboutSettings;

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 landing-page-shell-tight">
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
          visionDescription={s?.visionDescription}
          missionDescription={s?.missionDescription}
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
        <PartnersSection
          badge="ĐỐI TÁC CHIẾN LƯỢC"
          title={
            <>
              <span className="text-brand-black">Mạng lưới </span>
              <span className="inline-block rounded-xl bg-brand-yellow px-3 py-1 font-black text-brand-black">
                đối tác
              </span>
              <br />
              <span className="text-brand-black">
                tạo lực đẩy cho tuyển dụng hiện đại
              </span>
            </>
          }
          description="Chúng tôi kết nối cùng các doanh nghiệp, tập đoàn và thương hiệu công nghệ để mở rộng cơ hội nghề nghiệp chất lượng cao trên toàn quốc."
          partners={initialPartners}
        />
        {/* <PressMediaSection mediaMentions={initialMediaMentions} /> */}
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
