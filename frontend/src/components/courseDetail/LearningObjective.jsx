import { Check } from "lucide-react";

export default function LearningObjective() {
  const objectives = [
    "An understanding of AI agents and how they differ from AI models",
    "The ability to identify and explain core AI agent components and memory systems",
    "An explanation of different agent orchestration patterns and how to choose among them",
    "Hands-on experience designing and implementing AI agent safety guardrails",
    "Knowledge of integrating human oversight into agent workflows",
    "Understanding and applying strategies to overcome challenges in agentic systems",
    "Hands-on experience deconstructing real-world AI agent case studies",
    "Understanding the design and architecture of adaptive and robust AI agent systems",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10">
        <h2 className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-6">
          LEARNING OBJECTIVES
        </h2>
        <div className="space-y-4">
          {objectives.map((objective, index) => (
            <div key={index} className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 dark:text-green-400" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {objective}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
