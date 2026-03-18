function Pricing() {
  return (
    <section id="pricing" className="px-4 sm:px-10 md:mt-28 mt-16">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
            FLEXIBLE PLANS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed">
            Choose your learning path
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-sm:max-w-sm max-sm:mx-auto mt-16">
          {/* Basic */}
          <div className="relative bg-white dark:bg-gray-800 shadow-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-600 transition-all">
            <h4 className="text-lg font-medium mb-4">Basic</h4>
            <h3 className="text-4xl font-semibold">
              $9
              <sub className="text-slate-500 dark:text-slate-400 font-medium text-sm ml-1">
                / month
              </sub>
            </h3>
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
            <ul className="space-y-4">
              <li className="flex items-center font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                20 courses / month
              </li>
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Community access
              </li>
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Basic support
              </li>
            </ul>
            <div className="min-h-[40px] mt-6">
              <button className="cursor-pointer absolute bottom-6 left-0 right-0 mx-auto w-11/12 px-4 py-2 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Start
              </button>
            </div>
          </div>
          {/* Pro */}
          <div className="relative bg-white dark:bg-gray-800 shadow-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-600 transition-all">
            <h4 className="text-lg font-medium mb-4">Pro</h4>
            <h3 className="text-4xl font-semibold">
              $29
              <sub className="text-slate-500 dark:text-slate-400 font-medium text-sm ml-1">
                / month
              </sub>
            </h3>
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
            <ul className="space-y-4">
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Unlimited courses
              </li>
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Certificates included
              </li>
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Priority support
              </li>
            </ul>
            <div className="min-h-[40px] mt-6">
              <button className="cursor-pointer absolute bottom-6 left-0 right-0 mx-auto w-11/12 px-4 py-2 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Start
              </button>
            </div>
          </div>
          {/* Enterprise -> Team */}
          <div className="relative bg-white dark:bg-gray-800 shadow-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-600 transition-all">
            <h4 className="text-lg font-medium mb-4">Team</h4>
            <h3 className="text-4xl font-semibold">
              $49
              <sub className="text-slate-500 dark:text-slate-400 font-medium text-sm ml-1">
                / month
              </sub>
            </h3>
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
            <ul className="space-y-4">
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Everything in Pro
              </li>
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Team management
              </li>
              <li className="flex items-center font-medium">
                <svg
                  className="mr-3 bg-blue-100 fill-blue-600 rounded-full p-[3px] w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </svg>
                Analytics
              </li>
            </ul>
            <div className="min-h-[40px] mt-6">
              <button className="cursor-pointer absolute bottom-6 left-0 right-0 mx-auto w-11/12 px-4 py-2 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
