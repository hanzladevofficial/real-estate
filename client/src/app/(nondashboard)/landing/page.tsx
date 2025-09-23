import CallToActionSection from "@/components/landing/call-to-action-section";
import DiscoverSection from "@/components/landing/discover-section";
import FeatureSection from "@/components/landing/feature-section";
import HeroSection from "@/components/landing/hero-section";

export default function page() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <DiscoverSection />
      <CallToActionSection />
    </div>
  );
}
