import Course from "../components/Course";
import Feature from "../components/home/Feature";
import FreAskQuestion from "../components/home/FreAskQuestion";
import Guide from "../components/home/Guide";
import Hero from "../components/home/Hero";
import StartLearning from "../components/home/StartLearning";
import Testimonial from "../components/home/Testimonial";
import ErrorMessage from "../ui/ErrorMessage";
const Home = () => {
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-gray-100 text-[15px] transition-colors duration-300 min-w-xs`}
    >
      {/* ========== HERO SECTION (e-learning) ========== */}
      <Hero />
      <ErrorMessage />
      {/*  ========== FEATURES SECTION (e-learning themed) ========== */}
      <Feature />
      {/* ========== COURSES SECTION (e-learning themed) ========== */}
      <Course />
      {/* ========== HOW IT WORKS (simplified) ========== */}
      <Guide />
      {/* ========== TESTIMONIALS (shortened) ========== */}
      <Testimonial />
      {/* ========== CTA ========== */}
      <StartLearning />
      {/* ========== FAQ (accordion) ========== */}
      <FreAskQuestion />
    </div>
  );
};

export default Home;
