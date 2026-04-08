// src/LearningDashboard.tsx
import { useState } from "react";
import Header from "../components/LearningDashBoard/Header";
import PromptBox from "../components/LearningDashBoard/PromptBox";
import Tabs from "../components/LearningDashBoard/Tabs";
import RecentlyViewed from "../components/LearningDashBoard/RecentlyViewed";
import RecommendedSection from "../components/LearningDashBoard/RecommendedSection";
import ActivitySection from "../components/LearningDashBoard/ActivitySection";
import CertificationSection from "../components/LearningDashBoard/CertificationSection";
import PopularCourses from "../components/LearningDashBoard/PopularCoursesProps";
import DiscoverFeatures from "../components/LearningDashBoard/DiscoverFeatures";

const tabs = ["Home", "Recently Viewed", "In Progress", "Saved", "Completed"];

const recommended = [
  {
    title: "Distributed Systems for Practitioners",
    description:
      "Delve into distributed systems, exploring core principles, key algorithms, and protocols...",
    duration: "9 h 30 m",
    level: "Beginner",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Everything you need for Grokking the System Design Interview, developed by FAANG engineers...",
    duration: "26 h",
    level: "Intermediate",
  },
  {
    title: "Generative AI Essentials",
    description:
      "Explore AI fundamentals, history, models, and ethics in our generative AI course...",
    duration: "7 h",
    level: "Beginner",
  },
  {
    title: "Claude Code: Workflows and Tools",
    description:
      "Learn AI-powered development with Claude Code using models like Opus 4.6 and Sonnet 4.6...",
    duration: "4 h",
    level: "Beginner",
  },
  {
    title: "Distributed Systems for Practitioners",
    description:
      "Delve into distributed systems, exploring core principles, key algorithms, and protocols...",
    duration: "9 h 30 m",
    level: "Beginner",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Everything you need for Grokking the System Design Interview, developed by FAANG engineers...",
    duration: "26 h",
    level: "Intermediate",
  },
  {
    title: "Generative AI Essentials",
    description:
      "Explore AI fundamentals, history, models, and ethics in our generative AI course...",
    duration: "7 h",
    level: "Beginner",
  },
  {
    title: "Claude Code: Workflows and Tools",
    description:
      "Learn AI-powered development with Claude Code using models like Opus 4.6 and Sonnet 4.6...",
    duration: "4 h",
    level: "Beginner",
  },
];

const recentlyViewed = [
  {
    title: "Agentic System Design",
    description:
      "Build intelligent agents, orchestration patterns, and production-ready AI systems with clear architecture and tooling.",
    duration: "6 h",
    level: "Advanced",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Practice scalable system design with real-world examples and interview-focused breakdowns.",
    duration: "26 h",
    level: "Intermediate",
  },
  {
    title: "Agentic System Design",
    description:
      "Build intelligent agents, orchestration patterns, and production-ready AI systems with clear architecture and tooling.",
    duration: "6 h",
    level: "Advanced",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Practice scalable system design with real-world examples and interview-focused breakdowns.",
    duration: "26 h",
    level: "Intermediate",
  },
  {
    title: "Agentic System Design",
    description:
      "Build intelligent agents, orchestration patterns, and production-ready AI systems with clear architecture and tooling.",
    duration: "6 h",
    level: "Advanced",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Practice scalable system design with real-world examples and interview-focused breakdowns.",
    duration: "26 h",
    level: "Intermediate",
  },
  {
    title: "Agentic System Design",
    description:
      "Build intelligent agents, orchestration patterns, and production-ready AI systems with clear architecture and tooling.",
    duration: "6 h",
    level: "Advanced",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Practice scalable system design with real-world examples and interview-focused breakdowns.",
    duration: "26 h",
    level: "Intermediate",
  },
  {
    title: "Agentic System Design",
    description:
      "Build intelligent agents, orchestration patterns, and production-ready AI systems with clear architecture and tooling.",
    duration: "6 h",
    level: "Advanced",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Practice scalable system design with real-world examples and interview-focused breakdowns.",
    duration: "26 h",
    level: "Intermediate",
  },
  {
    title: "Agentic System Design",
    description:
      "Build intelligent agents, orchestration patterns, and production-ready AI systems with clear architecture and tooling.",
    duration: "6 h",
    level: "Advanced",
  },
  {
    title: "Grokking Modern System Design Interview",
    description:
      "Practice scalable system design with real-world examples and interview-focused breakdowns.",
    duration: "26 h",
    level: "Intermediate",
  },
];

const popular = [
  {
    title: "Grokking Modern System Design Interview",
    description:
      "End-to-end preparation for system design rounds with diagrams, tradeoffs, and FAANG-style drills.",
    duration: "26 h",
    level: "Intermediate",
  },
  ...recommended,
];

export default function LearningDashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100 max-w-7xl mx-auto">
      <div className="px-4 py-8 sm:px-6">
        <Header />
        <PromptBox />
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <RecentlyViewed courses={recentlyViewed.slice(0, 4)} />
        <RecommendedSection courses={recommended} />
        <ActivitySection />
        <CertificationSection />
        <PopularCourses courses={popular} />
        <DiscoverFeatures />
      </div>
    </div>
  );
}
