// src/LearningDashboard.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/LearningDashBoard/Header";
import PromptBox from "../components/LearningDashBoard/PromptBox";
import Tabs from "../components/LearningDashBoard/Tabs";

export default function LearningDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100 max-w-7xl mx-auto">
      <div className="px-4 py-8 sm:px-6">
        <Header />
        <PromptBox />
        <Tabs />
        <Outlet />
      </div>
    </div>
  );
}
