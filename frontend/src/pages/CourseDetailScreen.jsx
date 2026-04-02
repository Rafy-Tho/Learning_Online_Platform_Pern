import { useRef } from "react";
import HeroSection from "../components/courseDetail/HeroSection";
import LearningObjective from "../components/courseDetail/LearningObjective";
import LearningRoadmap from "../components/courseDetail/LearningRoadMap";
import ReviewContainer from "../components/courseReview/ReviewContainer";

function CourseDetailScreen() {
  const sectionRef = useRef(null);
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="bg-slate-100 dark:bg-slate-900">
      <HeroSection scrollToSection={scrollToSection} />
      <LearningObjective />
      <LearningRoadmap sectionRef={sectionRef} />
      <ReviewContainer />
    </div>
  );
}

export default CourseDetailScreen;
