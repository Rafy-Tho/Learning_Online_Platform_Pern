import React from "react";

const Coaching = () => {
  // Featured coaches (just for display)
  const coaches = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      role: "Senior System Design Coach",
      expertise: ["System Design", "Distributed Systems"],
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Algorithms Expert",
      expertise: ["LeetCode", "Interview Prep"],
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Frontend Coach",
      expertise: ["React", "Performance"],
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Accelerate Your Tech Career
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Work 1-on-1 with industry experts from top tech companies.
            Personalized coaching to help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                50+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Expert Coaches
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                2000+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Students
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                4.9
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Avg Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coaches */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Meet Our Coaches
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Learn from experienced professionals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6 text-center"
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
              />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {coach.name}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                {coach.role}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {coach.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            View All Coaches →
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Three simple steps to start learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Choose a Coach
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Browse our expert coaches and pick the one that fits your goals
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Schedule Sessions
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Book 1-on-1 sessions at times that work for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Achieve Goals
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get personalized guidance and accelerate your learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 text-center">
          <div className="text-4xl mb-4">"</div>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            The coaching program helped me land my dream job at Google. My coach
            provided invaluable guidance on system design and interview
            preparation.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
            <div className="text-left">
              <p className="font-semibold text-slate-900 dark:text-white">
                Alex Rivera
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Software Engineer at Google
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-500 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 dark:bg-blue-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of developers who've accelerated their careers with
            our coaching program
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Find Your Coach
          </button>
        </div>
      </section>
    </div>
  );
};

export default Coaching;
