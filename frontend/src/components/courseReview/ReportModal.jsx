import { useState } from "react";
import { X } from "lucide-react";

const ISSUE_TYPES = [
  "Inappropriate content",
  "Spam or promotional",
  "Offensive language",
  "False information",
  "Other",
];

export function ReportModal({ isOpen, onClose, onSubmit }) {
  const [issueType, setIssueType] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!issueType || !details.trim()) {
      alert("Please select an issue type and provide details");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(issueType, details);
      setIssueType("");
      setDetails("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-slate-800 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Report abuse
          </h2>
          <button
            onClick={onClose}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-900 dark:text-blue-100 text-sm leading-relaxed">
              Flagged content is reviewed by staff to determine whether it
              violates Terms of Service or Community Guidelines. If you have a
              question or technical issue, please contact our{" "}
              <a href="#" className="font-semibold hover:underline">
                Support team here
              </a>
              .
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Issue type
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${
                  document.documentElement.classList.contains("dark")
                    ? "9CA3AF"
                    : "4B5563"
                }'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 14l-7 7m0 0l-7-7m7 7V3'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "20px",
                paddingRight: "40px",
              }}
            >
              <option value="">Select an issue</option>
              {ISSUE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Issue details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Please provide specific details about why you're reporting this review..."
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none min-h-[120px]"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-violet-600 dark:bg-violet-500 text-white font-semibold rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
