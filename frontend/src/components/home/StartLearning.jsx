function StartLearning() {
  return (
    <div className="py-16 bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 md:mt-28 mt-16 px-4 sm:px-10">
      <div className="container mx-auto text-center">
        <h2 className="text-white text-2xl md:text-3xl font-bold leading-relaxed">
          Start your learning journey today
        </h2>
        <p className="mt-6 text-white">
          Join thousands of learners and upgrade your skills.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button className="cursor-pointer bg-white px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-900">
            Get Started Free
          </button>
          <button className="cursor-pointer bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition font-medium">
            View Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartLearning;
