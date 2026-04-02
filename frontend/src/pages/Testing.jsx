import { useMemo, useState } from "react";
import { Search, Star, ThumbsUp, ThumbsDown, Flag } from "lucide-react";

const REVIEWS_SEED = [
  {
    id: "1",
    name: "Johan D.",
    rating: 5,
    timeAgo: "4 weeks ago",
    text: "I was really nice, every single explanation was very clear, I take this course because I had some interviews and studying by myself it was awfull but with this course I learn and clarify a lot",
  },
  {
    id: "2",
    name: "Anoop P.",
    rating: 4,
    timeAgo: "6 months ago",
    text: "The topics were explained clearly and it was a valuable experience. Thank you.",
  },
  {
    id: "3",
    name: "Reed E.",
    rating: 3,
    timeAgo: "a month ago",
    text: "This now makes total sense!",
  },
  {
    id: "4",
    name: "Meli D.",
    rating: 2,
    timeAgo: "2 months ago",
    text: "I love my teacher’s passion",
  },
  {
    id: "5",
    name: "Sara K.",
    rating: 5,
    timeAgo: "3 days ago",
    text: "Great examples and very easy to follow. Highly recommend.",
  },
  {
    id: "6",
    name: "Mark T.",
    rating: 4,
    timeAgo: "8 months ago",
    text: "Solid content. Some sections could be a bit shorter, but overall great.",
  },
];

function Stars({ rating, size = 16 }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        const isFull = starValue <= full;
        return (
          <Star
            key={starValue}
            size={size}
            className={
              isFull
                ? "fill-orange-500 text-orange-500"
                : "text-slate-300 dark:text-slate-700"
            }
          />
        );
      })}
    </div>
  );
}

export default function Testing() {
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all"); // "all" | "5" | "4" ...
  const [helpfulVotes, setHelpfulVotes] = useState(() => ({})); // { [id]: "up" | "down" }
  const [reported, setReported] = useState(() => new Set());
  const [visibleCount, setVisibleCount] = useState(4);

  const reviews = REVIEWS_SEED;

  const ratingStats = useMemo(() => {
    const total = reviews.length;
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / total;

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of reviews) counts[r.rating]++;

    const dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      percent: total ? Math.round((counts[star] / total) * 100) : 0,
    }));

    return { total, avg, dist };
  }, [reviews]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews
      .filter((r) =>
        ratingFilter === "all" ? true : r.rating === Number(ratingFilter),
      )
      .filter((r) => (q ? r.text.toLowerCase().includes(q) : true));
  }, [query, ratingFilter, reviews]);

  const shown = filtered.slice(0, visibleCount);

  const selectedSummaryText = useMemo(() => {
    if (ratingFilter === "all") return `All ratings`;
    return `${ratingFilter} star`;
  }, [ratingFilter]);

  const handleHelpful = (id, next) => {
    setHelpfulVotes((prev) => {
      const current = prev[id];
      const shouldClear = current === next;
      const copy = { ...prev };
      if (shouldClear) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  const clearAndReset = () => {
    setQuery("");
    setRatingFilter("all");
    setVisibleCount(4);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Top summary */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
          {/* Rating summary */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Student feedback
            </h2>

            <div className="mt-6 flex items-end gap-4">
              <div className="text-6xl font-bold leading-none text-orange-600 dark:text-orange-500">
                {ratingStats.avg.toFixed(1)}
              </div>
              <div className="pb-1">
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Course Rating
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {ratingStats.dist.map((d) => (
                <div key={d.star} className="flex items-center gap-3">
                  <div className="w-10 text-sm text-slate-600 dark:text-slate-300">
                    {d.star}{" "}
                    <span className="inline-flex translate-y-0.5">
                      <Star
                        size={14}
                        className="text-orange-500 fill-orange-500"
                      />
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-orange-500"
                        style={{ width: `${d.percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="w-12 text-right text-sm text-slate-600 dark:text-slate-300">
                    {d.percent}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews area */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold">Reviews</h3>

            {/* Search + Filter */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:max-w-xl">
                <div className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2 w-full">
                    <Search className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
                      placeholder="Search reviews"
                      aria-label="Search reviews"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearAndReset}
                    className="hidden rounded bg-slate-100 px-2 py-1 text-sm text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 sm:inline-flex"
                    aria-label="Reset search and filter"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Filter ratings
                  </div>
                  <select
                    value={ratingFilter}
                    onChange={(e) => {
                      setRatingFilter(e.target.value);
                      setVisibleCount(4);
                    }}
                    className="w-44 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    aria-label="Filter ratings"
                  >
                    <option value="all">All ratings</option>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                </div>

                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Showing {shown.length} of {filtered.length} reviews ·{" "}
                  {selectedSummaryText}
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="mt-6 space-y-5">
              {shown.map((r) => {
                const initials = r.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((p) => p[0]?.toUpperCase())
                  .join("");

                const vote = helpfulVotes[r.id]; // "up" | "down"
                const isUp = vote === "up";
                const isDown = vote === "down";

                const isReported = reported.has(r.id);

                return (
                  <div
                    key={r.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-800">
                        {initials}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {r.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {r.timeAgo}
                          </div>
                        </div>

                        <div className="mt-1">
                          <Stars rating={r.rating} />
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {r.text}
                        </p>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            Was this review helpful?
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleHelpful(r.id, "up")}
                              className={[
                                "inline-flex items-center justify-center rounded-full border px-2.5 py-2 transition-colors",
                                "border-slate-200 dark:border-slate-700",
                                isUp
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "bg-white text-slate-700 hover:bg-orange-50 dark:bg-slate-900 dark:text-slate-200",
                              ].join(" ")}
                              aria-pressed={isUp}
                            >
                              <ThumbsUp className="h-4.5 w-4.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleHelpful(r.id, "down")}
                              className={[
                                "inline-flex items-center justify-center rounded-full border px-2.5 py-2 transition-colors",
                                "border-slate-200 dark:border-slate-700",
                                isDown
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "bg-white text-slate-700 hover:bg-orange-50 dark:bg-slate-900 dark:text-slate-200",
                              ].join(" ")}
                              aria-pressed={isDown}
                            >
                              <ThumbsDown className="h-4.5 w-4.5" />
                            </button>

                            <button
                              type="button"
                              disabled={isReported}
                              onClick={() => {
                                setReported((prev) => {
                                  const next = new Set(prev);
                                  next.add(r.id);
                                  return next;
                                });
                              }}
                              className={[
                                "ml-1 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                                isReported
                                  ? "cursor-not-allowed bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                  : "bg-transparent text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10",
                              ].join(" ")}
                            >
                              <Flag className="h-4 w-4" />
                              {isReported ? "Reported" : "Report"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  No reviews match your search.
                </div>
              )}
            </div>

            {/* See more */}
            {filtered.length > shown.length && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((c) => Math.min(c + 4, filtered.length))
                  }
                  className="w-full max-w-xl rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-500/10 dark:text-orange-300"
                >
                  See more reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
