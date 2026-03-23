import { Star, BookOpen, Users, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const companies = [
    { name: "Meta", logo: "Meta" },
    { name: "Amazon", logo: "amazon" },
    { name: "Apple", logo: "" },
    { name: "Netflix", logo: "NETFLIX" },
    { name: "Google", logo: "Google" },
    { name: "Coinbase", logo: "coinbase" },
    { name: "Stripe", logo: "stripe" },
    { name: "Airbnb", logo: "airbnb" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-b-[3rem] pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Agentic System Design
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 px-4">
            Learn to design the next generation of AI systems. Explore the
            architectures and strategies behind autonomous agents that solve
            complex, real-world problems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-orange-400 text-orange-400"
                  />
                ))}
                <Star
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-orange-400 text-orange-400"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </div>
              <span className="ml-1 text-gray-700 dark:text-gray-300 font-medium">
                4.5
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span>38 Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span>2 Breakout Sessions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Updated yesterday</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span>6h</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/learning/1"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-medium transition-colors block"
            >
              Start Learning
            </Link>
            <button className="w-full sm:w-auto border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              Course Content
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          <span>Join</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            2.9 million
          </span>
          <span>developers at</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 mt-6">
          {companies.map((company) => (
            <div
              key={company.name}
              className="text-gray-500 dark:text-gray-500 font-medium text-sm sm:text-base opacity-70"
            >
              {company.logo || company.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
