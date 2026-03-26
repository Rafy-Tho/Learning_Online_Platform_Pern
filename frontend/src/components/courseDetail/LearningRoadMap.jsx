import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Lock,
  Circle,
  Award,
} from "lucide-react";

export default function LearningRoadmap() {
  const [expandedSections, setExpandedSections] = useState([1, 2]);
  const [searchQuery, setSearchQuery] = useState("");

  const sections = [
    {
      id: 1,
      title: "Agent Design Fundamentals",
      description:
        "Learn core AI agent components, architecture, and how they perceive, reason, and act. Master orchestration, safety, and key design challenges.",
      lessons: [
        { title: "Introduction to AI Agents", locked: false },
        { title: "Agent Architecture: Core Agent Components", locked: false },
        {
          title: "Agent Architecture: Components Interaction and Agent Memory",
          locked: true,
        },
        {
          title: "Structuring Agent Behavior: Agent Orchestration Patterns",
          locked: true,
        },
        {
          title: "Building Trustworthy Agents: Guardrails and Human Oversight",
          locked: true,
        },
        {
          title: "Key Challenges and Design Strategies in Agentic AI Systems",
          locked: true,
        },
      ],
    },
    {
      id: 2,
      title: "Multi-Agent Conversational Recommender System (MACRS)",
      description:
        "Explore MACRS, a multi-agent system for goal-directed conversational recommendations. See how it plans, uses reflection, and achieves superior performance.",
      lessons: [
        {
          title: "Introduction to MACRS and the Design Challenge",
          locked: false,
        },
        { title: "MACRS Multi-Agent Act Planning Framework", locked: true },
        {
          title: "MACRS User Feedback-Aware Reflection Mechanism",
          locked: true,
        },
        { title: "Evaluating MACRS: Performance and Insights", locked: true },
      ],
    },
    {
      id: 9,
      title: "Thought Exercise: AI Hospital",
      description:
        "Design a self-improving multi-agent system for enhanced medical diagnosis.",
      lessons: [
        {
          title: "Design a Multi-Agent Medical Diagnosis System",
          locked: true,
        },
      ],
    },
    {
      id: 10,
      title: "OpenClaw Design",
      description: "",
      lessons: [
        {
          title: "Designing a Personal AI Assistant like OpenClaw",
          locked: true,
        },
      ],
    },
    {
      id: 11,
      title: "Wrapping up",
      description: "",
      lessons: [{ title: "Final Thoughts", locked: true }],
    },
  ];

  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id],
    );
  };

  const toggleExpandAll = () => {
    if (expandedSections.length === sections.length) {
      setExpandedSections([]);
    } else {
      setExpandedSections(sections.map((s) => s.id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Learning Roadmap
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              38 Lessons • 5 Quizzes
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search Lessons"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={toggleExpandAll}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium dark:text-white">
              Expand All
            </span>
            <ChevronDown className="w-4 h-4 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-5 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1 text-left">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {section.id}. {section.title}
                </h3>
                {section.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 pr-4">
                    {section.description}
                  </p>
                )}
              </div>
              <div className="shrink-0 ml-4">
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </div>
            </button>

            {expandedSections.includes(section.id) && (
              <div className="px-6 pb-5 space-y-3">
                {section.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 text-sm sm:text-base"
                  >
                    {lesson.locked ? (
                      <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    )}
                    <span
                      className={
                        lesson.locked
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-900 dark:text-white"
                      }
                    >
                      {lesson.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
          <div className="px-6 py-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Agentic System Design
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mock Interview
              </p>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              <span>Premium</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border border-indigo-200 dark:border-indigo-900 rounded-xl p-6 sm:p-8 bg-white dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Certificate of Completion
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Showcase your accomplishment by sharing your certificate of
              completion.
            </p>
            <button className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 transition-colors">
              Claim Certificate
            </button>
          </div>
          <div className="w-full lg:w-64 h-48 border-2 border-indigo-300 dark:border-indigo-800 rounded-lg bg-gradient-to-br from-indigo-50 dark:from-gray-700 to-purple-50 dark:to-gray-700 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Certificate Preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
