import FreAskQuestion from "../components/home/FreAskQuestion";
import PricingSection from "../components/pricing/PricingSection";

export default function PricingScreen() {
  return (
    <div className="min-h-screen dark:text-white mb-16">
      <PricingSection />
      <FreAskQuestion />
    </div>
  );
}
