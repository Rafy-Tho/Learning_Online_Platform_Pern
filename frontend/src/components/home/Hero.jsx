import banner from "../../assets/banner.jpg";

function Hero() {
  return (
    <section className="xl:min-h-[500px] bg-blue-50 dark:bg-gray-800 px-4 sm:px-10 py-10">
      <div className="grid xl:grid-cols-2 justify-center items-center gap-10 max-w-7xl mx-auto">
        <div>
          <div className="max-w-3xl max-xl:mx-auto max-xl:text-center">
            <p className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
              <span className="rotate-90 inline-block mr-2">|</span> LEARN
              ANYTIME, ANYWHERE
            </p>
            <h1 className="md:text-5xl text-4xl font-bold md:!leading-[55px]">
              Master new skills with expert-led courses
            </h1>
            <p className="text-base leading-relaxed mt-6">
              Access 1000+ interactive courses, live workshops, and earn
              certificates. Learn at your own pace with personalized
              recommendations.
            </p>
          </div>

          {/* Stats */}
          <section className="mt-12 container mx-auto">
            <div className="grid min-[450px]:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  500+
                </h3>
                <p className="mt-3 font-medium">Expert Instructors</p>
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  50K+
                </h3>
                <p className="mt-3 font-medium">Active Learners</p>
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  1.5K+
                </h3>
                <p className="mt-3 font-medium">Courses Available</p>
              </div>
            </div>
          </section>
        </div>

        <div className="xl:aspect-[350/251]">
          <img
            src={banner}
            alt="e-learning"
            className="w-full h-full object-contain max-xl:object-top"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
