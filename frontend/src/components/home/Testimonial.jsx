import { testimonials } from "../../constants/testimonials";
import StarRating from "../StarRating";

const Testimonial = () => {
  const getGridSpan = (index) => {
    if (index === 0) return "md:col-span-2";
    if (index === 1) return "md:col-span-1";
    if (index === 2) return "md:col-span-1";
    if (index === 3) return "md:col-span-2";
    return "";
  };

  const getMarginBottom = (index) => {
    return index === 0 || index === 3 ? "mb-14" : "mb-8";
  };

  return (
    <section className="py-16 px-4 md:px-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center md:text-left mb-4">
            Our Testimonials
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm/6 text-center md:text-left mx-auto md:mx-0 max-w-md">
            See what our customers are saying as they build and launch projects
            at lightning speed.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`
                border border-gray-200 dark:border-gray-800 
                rounded-2xl p-6 
                hover:border-gray-300 dark:hover:border-gray-700 
                hover:shadow-lg dark:hover:shadow-gray-800/50
                transition-all duration-300
                bg-white dark:bg-gray-800
                ${getGridSpan(index)}
              `}
            >
              {/* Stars */}
              <StarRating />

              {/* Testimonial Text */}
              <p
                className={`
                text-gray-700 dark:text-gray-300 
                text-sm leading-relaxed 
                ${getMarginBottom(index)}
              `}
              >
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-gray-900 dark:text-white text-sm font-medium">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
