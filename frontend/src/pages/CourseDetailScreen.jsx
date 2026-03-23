import HeroSection from "../components/courseDetail/HeroSection";
import LearningObjective from "../components/courseDetail/LearningObjective";
import LearningRoadmap from "../components/courseDetail/LearningRoadMap";

function CourseDetailScreen() {
  return (
    <div className="bg-slate-100 dark:bg-slate-900">
      <HeroSection />
      <LearningObjective />
      <LearningRoadmap />
    </div>
  );
}

export default CourseDetailScreen;
