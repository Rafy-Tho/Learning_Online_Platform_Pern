import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import formatTimeAgo from "../../utils/formatTimeAgo";
import RatingStars from "../RatingStars";
import { ReportModal } from "./ReportModal";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useHelpfulVote from "../../hooks/course/useHelpfulVote";

export function ReviewCard({ review }) {
  const [showReportModal, setShowReportModal] = useState(false);
  const { mutate } = useHelpfulVote();
  const [helpfulVote, setHelpfulVote] = useState(
    () => review.is_helpful ?? null,
  ); // true, false, or null
  const [isReported, setIsReported] = useState(
    () => review.is_reported ?? false,
  );
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleHelpfulVote = (voteType) => {
    if (!user) {
      navigate("/login");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setHelpfulVote((prev) => (prev === voteType ? null : voteType));
    mutate({ reviewId: review.id, isHelpful: voteType });
  };

  return (
    <div className="py-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="lg:w-14 lg:h-14 w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-white font-semibold text-lg">
            <img
              src={review.user_profile}
              alt={review.user_name}
              className="lg:w-12 lg:h-12 w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {review.user_name}
            </h3>
            <div className="flex items-center gap-2">
              <RatingStars rating={review.rating} />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {formatTimeAgo(review.created_at)}
              </span>
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            {review.review}
          </p>

          <div className="flex items-center gap-4">
            {helpfulVote === null && (
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Was this review helpful?
              </span>
            )}
            {helpfulVote !== null && (
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Thank you for your vote!
              </span>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleHelpfulVote(true)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  Boolean(helpfulVote) === Boolean(true)
                    ? "bg-violet-500 border-violet-500 hover:bg-violet-600"
                    : "border-violet-500 dark:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                }`}
              >
                <ThumbsUp
                  size={18}
                  className={`transition-colors ${
                    helpfulVote === true
                      ? "text-white"
                      : "text-violet-500 dark:text-violet-400"
                  }`}
                />
              </button>
              <button
                onClick={() => handleHelpfulVote(false)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  helpfulVote === false
                    ? "bg-violet-500 border-violet-500 hover:bg-violet-600"
                    : "border-violet-500 dark:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                }`}
              >
                <ThumbsDown
                  size={18}
                  className={`transition-colors ${
                    helpfulVote === false
                      ? "text-white"
                      : "text-violet-500 dark:text-violet-400"
                  }`}
                />
              </button>
            </div>
            {!isReported && (
              <button
                onClick={() => setShowReportModal(true)}
                className="text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors underline"
              >
                Report
              </button>
            )}
            {isReported && (
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Reported
              </span>
            )}
          </div>
        </div>
      </div>

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        reviewId={review.id}
        setIsReported={setIsReported}
      />
    </div>
  );
}
