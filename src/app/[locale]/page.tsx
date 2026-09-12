import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import TechBanner from "@/components/sections/tech-banner";
import PortfolioSection from "@/components/sections/portfolio-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TechBanner />
      <PortfolioSection />
    </>
  );
}
