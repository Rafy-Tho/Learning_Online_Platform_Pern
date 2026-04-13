import { CreditCard, Zap, Calendar, ArrowUpRight } from "lucide-react";

const Subscribed = ({ data }) => {
  const plan = {
    name: data?.name || "",
    price: data?.price || "",
    period: "/price",
    status: "Active",
    nextBilling: new Date(data?.end_date).toDateString() || "" || "",
    features: [
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
  };

  return (
    <div
      className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
            Subscription
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your plan and billing
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/10 dark:bg-blue-400/10 text-slate-700 dark:text-blue-400">
          <Zap className="w-3.5 h-3.5 mr-1" />
          {plan.name}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl bg-slate-100/50 dark:bg-slate-800/50 p-4 border border-slate-300/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Current Plan
            </span>
          </div>
          <p className="text-slate-800 dark:text-slate-100 font-semibold">
            {plan.price}
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
              {plan.period}
            </span>
          </p>
        </div>

        <div className="rounded-xl bg-slate-100/50 dark:bg-slate-800/50 p-4 border border-slate-300/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Next Billing
            </span>
          </div>
          <p className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
            {plan.nextBilling}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100/50 dark:bg-slate-800/50 p-4 border border-slate-300/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Status
            </span>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-700/10 dark:bg-green-400/10 text-green-700 dark:text-green-400">
            {plan.status}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Plan Features
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plan.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-100"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 dark:bg-blue-400" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscribed;
