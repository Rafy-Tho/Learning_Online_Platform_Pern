// src/LearningDashboard.tsx
import {
  ArrowUpRight,
  Award,
  ChevronRight,
  Code,
  Code2,
  FlaskConical,
  Gamepad2,
  History,
  Lock,
  Rocket,
  Search,
  Send,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import CourseCard from "../components/CourseCard";
import SwiperWrapper from "../components/SwiperWrapper";

const tabs = ["Home", "Recently Viewed", "In Progress", "Saved", "Completed"];

const suggestions = [
  "System Design",
  "Interview Prep",
  "Agentic System Design",
  "Gen AI Essentials",
  "LLM Essentials",
  "MCP",
];

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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100 max-w-7xl mx-auto">
      <div className=" px-4 py-8 sm:px-6">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kom"
              alt=""
              className="size-14 shrink-0 rounded-full border border-slate-200 dark:border-slate-700"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Welcome, Kom!
                </h1>
                <span className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-semibold text-violet-800 dark:bg-violet-950 dark:text-violet-300">
                  Get Started (0/2)
                </span>
              </div>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Take the first steps to building your professional skills
              </p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 self-start rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-indigo-600 dark:border-slate-600 dark:text-indigo-400"
          >
            Explore All
          </button>
        </header>

        {/* Prompt box */}
        <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:p-5">
            <Code className="size-6 shrink-0 text-blue-500" aria-hidden />
            <input
              type="search"
              placeholder="I want to learn AWS cloud..."
              className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
              defaultValue="I want to learn AWS clo"
            />
            <button
              type="button"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700"
              aria-label="Send"
            >
              <Send className="size-5" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto p-4 sm:p-5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {s}
                <ChevronRight className="size-3.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <nav
          className="mb-8 flex gap-6 overflow-x-auto border-b border-slate-200 pb-0 dark:border-slate-800"
          aria-label="Main"
        >
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={`shrink-0 border-b-2 pb-3 text-sm font-medium transition ${
                activeTab === t
                  ? "border-indigo-600 font-bold text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1.5 border-b-2 border-transparent pb-3 text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            <Gamepad2 className="size-4" />
            Coding Challenge
          </button>
        </nav>

        {/* Recently viewed */}
        <section className="mb-14">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
              <History className="size-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            Recently Viewed
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentlyViewed.slice(0, 4).map((c) => (
              <CourseCard key={c.title} course={c} />
            ))}
          </div>
        </section>

        {/* Recommended */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60">
                <ArrowUpRight className="size-4 text-indigo-600 dark:text-indigo-400" />
              </span>
              Recommended For You
            </h2>
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-indigo-600 dark:border-slate-600 dark:text-indigo-400"
            >
              Learning Preferences
            </button>
          </div>
          <SwiperWrapper>
            {recommended.map((c) => (
              <SwiperSlide key={c.title}>
                <CourseCard key={c.title} course={c} />
              </SwiperSlide>
            ))}
          </SwiperWrapper>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Explore All
            </button>
          </div>
        </section>

        {/* Activity + Certification */}
        <section className="mb-14 space-y-10">
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
                <Rocket className="size-4 text-indigo-600 dark:text-indigo-400" />
              </span>
              Your Activity
            </h2>
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-bold">Learning Streak</span>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
                >
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0 dark:divide-slate-700">
                <div className="flex items-center gap-4 pb-6 md:pb-0 md:pr-6">
                  <div className="flex size-14 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-600">
                    <span className="text-orange-500">🔥</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0 day</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Current Streak
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-6 md:pl-6 md:pt-0">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0 day</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Longest Streak
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
                <Award className="size-4 text-indigo-600 dark:text-indigo-400" />
              </span>
              Certification
            </h2>
            <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 md:flex-row md:items-center dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 bg-slate-50 dark:border-indigo-700 dark:bg-slate-800/50 md:w-40">
                <Lock className="size-10 text-slate-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">
                  Your certificate is waiting. Don&apos;t delay!
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Accelerate your career with an Educative Certification
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-lg border-2 border-purple-600 px-4 py-2 font-medium text-purple-600 dark:border-purple-400 dark:text-purple-400"
              >
                Explore
              </button>
            </div>
          </div>
        </section>

        {/* Most popular */}
        <section className="mb-14">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
              <ArrowUpRight className="size-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            Most Popular Courses
          </h2>
          <SwiperWrapper>
            {popular.map((c) => (
              <SwiperSlide key={c.title}>
                <CourseCard key={c.title} course={c} />
              </SwiperSlide>
            ))}
          </SwiperWrapper>
        </section>

        {/* Discover features */}
        <section>
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
              <Search className="size-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            Discover More Features
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                tag: "Mock Interview",
                icon: UserCheck,
                cls: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
                text: "Practice technical interviews with guided scenarios and feedback.",
              },
              {
                tag: "Cloud Labs",
                icon: FlaskConical,
                cls: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
                text: "Hands-on cloud environments to experiment safely at scale.",
              },
              {
                tag: "Projects",
                icon: Code2,
                cls: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
                text: "Ship portfolio-ready projects with structured milestones.",
              },
            ].map((f) => (
              <div
                key={f.tag}
                className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${f.cls}`}
                >
                  <f.icon className="size-3.5" />
                  {f.tag}
                </span>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
