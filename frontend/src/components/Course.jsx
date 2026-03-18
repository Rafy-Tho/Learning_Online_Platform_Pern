import React from "react";

const Course = () => {
  const courses = [
    {
      title: "Grokking Modern System Design Interview",
      description:
        "Everything you need for Grokking the System Design Interview, developed by FAANG engineers. Master distributed system fundamentals and practice real-world interview questions.",
      duration: "26 h",
      level: "Intermediate",
      icon: "🎯",
      students: "12.5k",
      rating: 4.8,
    },
    {
      title: "Grokking the Coding Interview Patterns",
      description:
        "Grokking the Coding Interview is the best course that saves countless hours wasted in grinding LeetCode. Master 28 coding patterns; unlock all LeetCode problems. Developed by and for MAANG engineers.",
      duration: "85 h",
      level: "Intermediate",
      icon: "💡",
      students: "18.2k",
      rating: 4.9,
    },
    {
      title: "Agentic System Design Crash Course",
      description:
        "Short on time? Learn how to design real-world AI agents, analyze agentic architectures, and apply proven design frameworks through focused, high-impact lessons in just 8 hours.",
      duration: "4 h",
      level: "Intermediate",
      icon: "⚡",
      students: "5.8k",
      rating: 4.7,
    },
    {
      title: "Agentic System Design",
      description:
        "Learn to design the next generation of AI systems. Explore the architectures and strategies behind autonomous agents that solve complex, real-world problems.",
      duration: "6 h",
      level: "Advanced",
      icon: "🤖",
      students: "3.4k",
      rating: 4.9,
    },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Advanced":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Accelerate Your Engineering Career
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Master system design and coding interviews with courses crafted by
            FAANG engineers
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Card Content */}
              <div className="relative p-6 flex flex-col h-full">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-md bg-slate-300 dark:bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2">
                    <i className="fa-solid fa-book-open"></i>
                    <span className="text-xs">Course</span>
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <svg
                      className="w-4 h-4 mr-1 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white dark:text-slate-800 font-medium rounded-lg  dark:hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer">
            View All Courses
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Course;
