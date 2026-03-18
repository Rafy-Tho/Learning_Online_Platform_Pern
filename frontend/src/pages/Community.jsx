import React from "react";

const Community = () => {
  // Events data
  const events = [
    {
      id: 1,
      title: "React Advanced Workshop",
      date: "April 15, 2024",
      time: "6:00 PM EST",
      attendees: 45,
      host: "Sarah Chen",
      type: "Workshop",
    },
    {
      id: 2,
      title: "System Design Interview Prep",
      date: "April 18, 2024",
      time: "7:30 PM EST",
      attendees: 32,
      host: "Mike Johnson",
      type: "Study Group",
    },
    {
      id: 3,
      title: "Code & Coffee Morning",
      date: "April 20, 2024",
      time: "9:00 AM EST",
      attendees: 28,
      host: "Community",
      type: "Casual",
    },
  ];

  // Learning stories
  const stories = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Frontend Developer at Google",
      story:
        "From self-taught to FAANG in 18 months. The community support was incredible!",
      image: "https://i.pravatar.cc/150?img=1",
      achievement: "Hired at Google",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Full Stack Engineer",
      story:
        "Started with zero coding experience. Now leading a team of 5 developers.",
      image: "https://i.pravatar.cc/150?img=2",
      achievement: "Promoted to Lead",
    },
    {
      id: 3,
      name: "James Wilson",
      role: "DevOps Specialist",
      story:
        "Career transitioned from IT support to cloud architecture in 1 year.",
      image: "https://i.pravatar.cc/150?img=3",
      achievement: "AWS Certified",
    },
  ];

  // Code crew members
  const crew = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      role: "AI/ML Mentor",
      expertise: "Machine Learning",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 2,
      name: "Marcus Brown",
      role: "Backend Lead",
      expertise: "System Design",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Lisa Wong",
      role: "Frontend Expert",
      expertise: "React & Vue",
      image: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer",
      expertise: "Cloud & Docker",
      image: "https://i.pravatar.cc/150?img=7",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-950 dark:to-slate-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Community
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Learn together, grow together. Join 10,000+ developers sharing
            knowledge and building careers.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
            Join the Community
          </button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                10K+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Members
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                500+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Study Groups
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                200+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Mentors
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                50+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Events/Month
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            📅 Upcoming Events
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Join live workshops, study groups, and coding sessions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                  {event.type}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {event.attendees} going
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                📅 {event.date}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                ⏰ {event.time}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                👤 Hosted by {event.host}
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                RSVP Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            View All Events →
          </button>
        </div>
      </section>

      {/* Learning Stories Section */}
      <section className="py-16 px-4 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              📖 Success Stories
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Real stories from our community members
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {story.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {story.role}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 italic">
                  "{story.story}"
                </p>
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                  🏆 {story.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Crew Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            👨‍💻 Our Code Crew
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Meet the experts who mentor and guide our community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {crew.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 text-center border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-500"
              />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                {member.role}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                {member.expertise}
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-16 px-4 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect with learners, share knowledge, and accelerate your tech
            career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Create Free Account
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors border border-slate-500">
              Browse Discussions
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Already have an account?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Community;
