import { Star } from "lucide-react";
import useGetReviewDetails from "../../hooks/course/useGetReviewDetails";
import SpinnerLoader from "../../ui/SpinnerLoader";
import ErrorMessage from "../../ui/ErrorMessage";
import RatingStars from "../RatingStars";

export function RatingSummary() {
  const { data, isPending, error } = useGetReviewDetails();

  const reviewSummary = data?.data[0].review_summary || {};
  const { total, average, ratings } = reviewSummary || {};

  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratings?.[`${stars}`] || 0;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { stars, percentage };
  });

  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!total || !data) return null;
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">
        Student feedback
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center lg:items-start lg:w-1/4">
          <div className="text-6xl font-bold text-orange-500 mb-2">
            {average.toFixed(1)}
          </div>
          {<RatingStars rating={average} />}
          <div className="text-orange-500 font-medium mt-2">Course Rating</div>
        </div>

        <div className="flex-1 space-y-2">
          {breakdown.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="w-full max-w-md lg:max-w-2xl bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-slate-400 dark:bg-slate-500 h-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center gap-1 min-w-[120px]">
                <RatingStars rating={stars} />
              </div>
              <div className="text-orange-500 font-medium min-w-[50px] text-right">
                {percentage < 1 ? "<1%" : `${percentage}%`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
