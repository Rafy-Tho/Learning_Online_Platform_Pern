import useGetActiveSubscription from "../../hooks/subscription/useGetActiveSubscription";
import PricingCard from "./PricingCard";

const plans = [
  {
    id: "00c7b88f-fcf3-4d7c-a10d-c83efe587e9d",
    tier: "1 Month",
    duration: 30,
    price: 5,
    description: "Perfect for getting started with your learning journey",
    features: [
      { text: "Access to 500+ Courses", hasInfo: true },
      { text: "AI Learning Assistant", hasInfo: true },
      { text: "Track Your Learning Progress" },
      { text: "Certificate on Course Completion" },
      { text: "Live Chat Support", hasInfo: true },
    ],
    highlighted: false,
  },
  {
    id: "618a46ae-30e6-4983-ad0b-fa3126df19e6",
    tier: "6 Months",
    duration: 180,
    price: 20,
    description: "Best value for consistent learners and skill builders",
    features: [
      { text: "Unlimited Access to All Courses", hasInfo: true },
      { text: "AI Learning Assistant (Advanced)", hasInfo: true },
      { text: "Personalized Learning Paths" },
      { text: "Downloadable Resources & Materials" },
      { text: "Priority Live Chat Support", hasInfo: true },
    ],
    highlighted: true,
  },
  {
    id: "d196d5c8-3cd0-46ac-b6ec-0a676d189216",
    tier: "12 Months",
    duration: 360,
    price: 30,
    description: "Complete package for mastering skills and career growth",
    features: [
      { text: "Full Access to All Courses & Future Updates", hasInfo: true },
      { text: "Advanced AI Assistant + Career Guidance", hasInfo: true },
      { text: "1-on-1 Mentorship Sessions" },
      { text: "Official Certificates & Career Support" },
      { text: "24/7 Premium Support", hasInfo: true },
    ],
    highlighted: false,
  },
];
export default function PricingSection() {
  const { data } = useGetActiveSubscription();
  const activeSubscription = data?.data || null;
  return (
    <section className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header - Updated for E-Learning */}
        <div className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Pricing Plans
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white mt-2">
            Start your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              learning journey
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-slate-300">
            Choose the perfect plan for your online course needs. Learn at your
            own pace, anytime, anywhere.
          </p>
        </div>

        {/* Enhanced Grid Layout with better responsiveness and spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center">
          {plans.map((plan) => (
            <PricingCard
              key={plan.tier}
              plan={plan}
              activeSubscription={activeSubscription}
            />
          ))}
        </div>

        {/* Optional: Footer note for transparency */}
        <p className="text-center text-gray-400 dark:text-slate-500 text-sm mt-12">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
