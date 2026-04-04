import { X } from "lucide-react";
import { useState } from "react";

import { useOutletContext } from "react-router-dom";
import StarRating from "../../ui/StarRating";

export default function CourseRating() {
  const { ratingOpen, setRatingOpen } = useOutletContext();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      setError("Please select a rating");
      return;
    }
    console.log({ rating, description });
  };
  if (!ratingOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8"
      >
        <button
          onClick={() => setRatingOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
        >
          <X size={16} />
        </button>

        <p className="text-xs text-slate-500 mb-1">Share your experience</p>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">
          Rate this course
        </h2>

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs text-slate-500 block mb-2">
              Your rating
            </label>
            <StarRating
              value={rating}
              onChange={setRating}
              setError={setError}
            />
          </div>
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
          )}
          <div>
            <label className="text-xs text-slate-500 block mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell others what you thought about this course..."
              rows={4}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 hover:bg-orange-600 text-white py-2.5 text-sm font-medium transition-colors"
          >
            Submit review
          </button>
        </div>
      </form>
    </div>
  );
}
