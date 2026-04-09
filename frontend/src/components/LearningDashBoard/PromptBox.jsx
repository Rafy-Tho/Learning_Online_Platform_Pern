// src/components/PromptBox.tsx
import { Code, ChevronRight, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const suggestions = [
  "JavaScript",
  "Java",
  "Web Development",
  "Mobile Development",
  "C++",
  "System Design",
];
export default function PromptBox() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/courses?search=${search}`);
  };
  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:p-5"
      >
        <Code className="size-6 shrink-0 text-blue-500" aria-hidden />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
        />
        <button
          type="submit"
          disabled={!search}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <Send className="size-5" />
        </button>
      </form>
      <div className="flex gap-2 overflow-x-auto p-4 sm:p-5">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setSearch(s)}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {s}
            <ChevronRight className="size-3.5 opacity-60" />
          </button>
        ))}
      </div>
    </div>
  );
}
