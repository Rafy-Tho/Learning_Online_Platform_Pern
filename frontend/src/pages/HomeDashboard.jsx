import ActivitySection from "../components/LearningDashBoard/ActivitySection";
import CertificationSection from "../components/LearningDashBoard/CertificationSection";
import DiscoverFeatures from "../components/LearningDashBoard/DiscoverFeatures";
import PopularCourses from "../components/LearningDashBoard/PopularCourses";
import RecentlyViewed from "../components/LearningDashBoard/RecentlyViewed";
import RecommendedSection from "../components/LearningDashBoard/RecommendedSection";

function HomeDashboard() {
  return (
    <>
      <RecentlyViewed />
      <RecommendedSection />
      <PopularCourses />
      <ActivitySection />
      <CertificationSection />
      <DiscoverFeatures />
    </>
  );
}

export default HomeDashboard;
