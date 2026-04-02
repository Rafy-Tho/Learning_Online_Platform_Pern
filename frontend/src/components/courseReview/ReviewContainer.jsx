import { RatingSummary } from "./RatingSummary";
import { StudentFeedback } from "./StudentFeedback";

function ReviewContainer() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
            Reviews
          </h2>
          <RatingSummary />
          <StudentFeedback />
        </div>
      </div>
    </div>
  );
}

export default ReviewContainer;
