import { useState } from "react";
import SectionCard from "./SectionCard";
import { Check, Crown, Star, Zap } from "lucide-react";
import useCreatePayment from "../../hooks/subscription/useCreatePayment";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const planConfig = {
  "1-Month": {
    id: "00c7b88f-fcf3-4d7c-a10d-c83efe587e9d",
    label: "1 Month",
    color: "bg-slate-100 text-slate-600 border-slate-200",
    darkColor: "dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    features: [
      "5 projects",
      "1 GB storage",
      "Community support",
      "Basic analytics",
    ],
  },
  "6-Months": {
    id: "618a46ae-30e6-4983-ad0b-fa3126df19e6",
    label: "6 Months",
    color: "bg-slate-700 text-white border-slate-600",
    darkColor: "dark:bg-slate-200 dark:text-slate-900 dark:border-slate-300",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
    ],
  },
  "12-Months": {
    id: "d196d5c8-3cd0-46ac-b6ec-0a676d189216",
    label: "12 Months",
    color: "bg-slate-900 text-white border-slate-800",
    darkColor: "dark:bg-slate-100 dark:text-slate-900 dark:border-slate-200",
    features: [
      "Unlimited everything",
      "1 TB storage",
      "24/7 dedicated support",
      "SSO & audit logs",
      "SLA guarantee",
      "Custom integrations",
    ],
  },
};

function Subscription() {
  const [plan, setPlan] = useState("1-Month");
  const navigate = useNavigate();
  const { mutate } = useCreatePayment();
  const { user } = useAuth();
  const planInfo = planConfig[plan];
  async function payment() {
    if (!user) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return navigate("/login");
    }
    mutate(planInfo.id);
  }
  if (!planInfo) {
    return null;
  }
  return (
    <SectionCard title="Subscription" icon={<Crown size={15} />}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${planInfo.color} ${planInfo.darkColor}`}
            >
              {planInfo.icon}
              {planInfo.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            this plan includes:
          </p>
          <ul className="space-y-1.5">
            {planInfo.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <Check
                  size={13}
                  className="text-slate-500 dark:text-slate-400 flex-shrink-0"
                />
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={payment}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white dark:text-slate-900 bg-slate-700 dark:bg-slate-200 mt-5"
          >
            Get Started
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-2.5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            choose Plan
          </p>
          {Object.keys(planConfig).map((p) => {
            const isActive = plan === p;
            return (
              <button
                key={p}
                onClick={() => {
                  if (!isActive) {
                    setPlan(p);
                  }
                }}
                disabled={isActive}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                  isActive
                    ? "border-slate-700 dark:border-slate-300 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 cursor-default"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{planConfig[p].label}</span>
                </div>
                {isActive && <Check size={14} />}
              </button>
            );
          })}
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Billing is managed securely. Changes take effect immediately.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export default Subscription;
