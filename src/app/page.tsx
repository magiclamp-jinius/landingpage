import { Hero } from "@/components/ui/animated-hero";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <SocialProofSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
