import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useGetReviews from "../../hooks/course/useGetReviews";
import ErrorMessage from "../../ui/ErrorMessage";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { ReviewCard } from "./ReviewCard";

export function StudentFeedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [submittedSearch, setSubmittedSearch] = useState(""); // store the search term when
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  // Build query string for useGetReviews

  const param = new URLSearchParams();

  param.set("limit", visibleReviews);

  if (filterRating === "All") param.delete("rating");
  else param.set("rating", filterRating);

  if (submittedSearch.trim()) param.set("search", submittedSearch);
  else param.delete("search");

  const { data, isPending, error } = useGetReviews(param);

  const reviews = data?.data || [];
  const pagination = data?.pagination || {};

  const getFilterLabel = () => {
    if (filterRating === "All") return "All ratings";
    return `${filterRating} star${filterRating > 1 ? "s" : ""}`;
  };
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setVisibleReviews(5);
    setSubmittedSearch(searchQuery); // update submitted search
  };
  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Clear submitted search when search query changes
  useEffect(() => {
    if (searchQuery.trim() !== "") return;
    setSubmittedSearch("");
    setVisibleReviews(5);
  }, [searchQuery]);
  // Focus on input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // Handle pagination click
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search reviews"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-violet-600 dark:bg-violet-500 rounded-lg flex items-center justify-center hover:bg-violet-700 dark:hover:bg-violet-600 transition-colors"
          >
            <Search size={20} className="text-white" />
          </button>
        </form>

        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="w-full sm:w-auto px-6 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-between gap-4 hover:border-violet-500 dark:hover:border-violet-400 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          >
            <span className="text-sm font-medium">{getFilterLabel()}</span>
            <ChevronDown
              size={20}
              className="text-slate-600 dark:text-slate-400"
            />
          </button>

          {showFilterDropdown && (
            <div
              ref={selectRef}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-lg shadow-lg z-10"
            >
              <button
                onClick={() => {
                  setFilterRating("All");
                  setVisibleReviews(5);
                  setShowFilterDropdown(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100"
              >
                All ratings
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => {
                    setFilterRating(rating);
                    setVisibleReviews(5);
                    setShowFilterDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100"
                >
                  {rating} star{rating > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-0">
        {reviews.slice(0, visibleReviews).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {visibleReviews < pagination.totalItems && (
        <div className="mt-8">
          <button
            onClick={() => setVisibleReviews((prev) => prev + 5)}
            className="w-full px-6 py-3 border-2 border-violet-500 dark:border-violet-400 text-violet-600 dark:text-violet-400 font-medium rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
          >
            See more reviews
          </button>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="text-center py-12 text-slate-600 dark:text-slate-400">
          No reviews found matching your criteria.
        </div>
      )}
    </>
  );
}
