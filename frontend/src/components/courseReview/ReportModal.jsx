import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import useCreateReviewReport from "../../hooks/course/useCreateReviewReport";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ISSUE_TYPES = [
  "Inappropriate content",
  "Spam or promotional",
  "Offensive language",
  "False information",
  "Other",
];
const ReportSchema = z.object({
  reason: z.string().nonempty("Please select an issue type"),
  description: z.string().nonempty("Please enter details"),
});
const defaultValues = {
  reason: "",
  description: "",
};
export function ReportModal({ isOpen, onClose, reviewId, setIsReported }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ReportSchema),
    defaultValues,
  });
  const { mutate, isPending } = useCreateReviewReport();

  const onSubmit = (data) => {
    if (!user) {
      navigate("/login");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    mutate(
      { reviewId, ...data },
      {
        onSuccess: () => {
          onClose();
          setIsReported(true);
          reset();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to report abuse");
        },
      },
    );
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

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
              name="reason"
              {...register("reason")}
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
          {errors.reason && (
            <p className="text-red-500 dark:text-red-400 text-sm">
              {errors.reason.message}
            </p>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Issue details
            </label>
            <textarea
              name="description"
              {...register("description")}
              placeholder="Please provide specific details about why you're reporting this review..."
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none min-h-[120px]"
            />
          </div>

          {errors.description && (
            <p className="text-red-500 dark:text-red-400 text-sm">
              {errors.description.message}
            </p>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isPending}
              className="px-6 py-2 font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 bg-violet-600 dark:bg-violet-500 text-white font-semibold rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
