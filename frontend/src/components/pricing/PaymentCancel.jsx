import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  RefreshCw,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();
  const reasons = [
    "Payment was declined by your bank",
    "Session timed out during checkout",
    "You chose to cancel the transaction",
  ];
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-slate-900/50 overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="bg-gradient-to-br from-rose-400 to-red-500 dark:from-rose-500 dark:to-red-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-8 w-24 h-24 rounded-full border-4 border-white" />
              <div className="absolute bottom-2 right-6 w-16 h-16 rounded-full border-4 border-white" />
              <div className="absolute top-10 right-16 w-8 h-8 rounded-full bg-white" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm ring-4 ring-white/30">
                <XCircle className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Payment Cancelled
              </h1>
              <p className="text-rose-100 text-sm font-medium">
                Your transaction was not completed
              </p>
            </div>

            <div className="relative mt-6 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 text-white">
              <p className="text-rose-100 text-xs uppercase tracking-widest font-semibold mb-1">
                Status
              </p>
              <p className="text-2xl font-extrabold">No charge was made</p>
            </div>
          </div>

          <div className="px-8 py-6 space-y-5">
            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 rounded-2xl px-4 py-3">
              <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-amber-700 dark:text-amber-400 text-sm font-medium">
                Your payment information is safe. No funds have been deducted
                from your account.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Possible Reasons
                </p>
              </div>
              <div className="px-5 py-4 space-y-3">
                {reasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-500 dark:text-rose-400 text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  What you can do
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  {
                    icon: RefreshCw,
                    text: "Try again with the same payment method",
                  },
                  {
                    icon: ArrowLeft,
                    text: "Go back and update your payment details",
                  },
                  {
                    icon: MessageCircle,
                    text: "Contact support if the issue persists",
                  },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => {
                  navigate("/learning-dashboard");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm py-3 px-4 rounded-2xl transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              <button
                onClick={() => {
                  navigate("/pricing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-semibold text-sm py-3 px-4 rounded-2xl transition-colors duration-200 shadow-md shadow-rose-200 dark:shadow-rose-900/30"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Need help?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                  Our team is available 24/7
                </p>
              </div>
              <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl transition-colors duration-200">
                <MessageCircle className="w-3.5 h-3.5" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
