import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  JobsSection,
  SpecialtySectors,
  FeaturesSection,
  TestimonialsSection,
  NewsSection,
  FloatingActions,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <HeroSection />
        <JobsSection />
        <SpecialtySectors />
        <FeaturesSection />
        <TestimonialsSection />
        <NewsSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
