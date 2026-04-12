import { Check, Crown, Lock, Shield, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import PasswordField from "../components/setting/PasswordField";
import SectionCard from "../components/setting/SectionCard";
import UserProfile from "../components/setting/UserProfile";

const planConfig = {
  Free: {
    icon: <Star size={14} />,
    label: "Free Plan",
    color: "bg-slate-100 text-slate-600 border-slate-200",
    darkColor: "dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    features: [
      "5 projects",
      "1 GB storage",
      "Community support",
      "Basic analytics",
    ],
  },
  Pro: {
    icon: <Zap size={14} />,
    label: "Pro Plan",
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
  Enterprise: {
    icon: <Crown size={14} />,
    label: "Enterprise Plan",
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

export default function UserSetting() {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [pwError, setPwError] = useState("");

  const handleChangePassword = () => {
    setPwError("");
    if (!passwords.current) {
      setPwError("Current password is required");
      return;
    }
    if (passwords.newPass.length < 8) {
      setPwError("New password must be at least 8 characters");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPwError("Passwords do not match");
      return;
    }
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  const getStrength = (pw) =>
    Math.min(
      Math.floor(pw.length / 3) +
        (pw.match(/[A-Z]/) ? 1 : 0) +
        (pw.match(/[0-9]/) ? 1 : 0) +
        (pw.match(/[^a-zA-Z0-9]/) ? 1 : 0),
      4,
    );

  // const planInfo = planConfig[user.plan];

  return (
    <div>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Account Settings
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Manage your profile and preferences
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Profile */}

            <UserProfile />

            {/* Subscription */}
            {/* <SectionCard title="Subscription" icon={<Crown size={15} />}>
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
                    Your current plan includes:
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
                </div>

                <div className="flex-1 flex flex-col gap-2.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Change Plan
                  </p>
                  {Object.keys(planConfig).map((plan) => {
                    const isActive = user.plan === plan;
                    return (
                      <button
                        key={plan}
                        onClick={() => {
                          if (!isActive) {
                            setUser({ ...user, plan });
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
                          {planConfig[plan].icon}
                          <span className="font-medium">
                            {planConfig[plan].label}
                          </span>
                        </div>
                        {isActive && <Check size={14} />}
                      </button>
                    );
                  })}
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Billing is managed securely. Changes take effect
                    immediately.
                  </p>
                </div>
              </div>
            </SectionCard> */}

            {/* Change Password */}
            {/* <SectionCard title="Change Password" icon={<Shield size={15} />}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangePassword();
                }}
                className="flex flex-col gap-4"
              >
                <PasswordField
                  label="Current Password"
                  value={passwords.current}
                  onChange={(v) => setPasswords({ ...passwords, current: v })}
                  placeholder="Enter your current password"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PasswordField
                    label="New Password"
                    value={passwords.newPass}
                    onChange={(v) => setPasswords({ ...passwords, newPass: v })}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                  />
                  <PasswordField
                    label="Confirm New Password"
                    value={passwords.confirm}
                    onChange={(v) => setPasswords({ ...passwords, confirm: v })}
                    placeholder="Repeat new password"
                    autoComplete="new-password"
                  />
                </div>

                {passwords.newPass && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => {
                        const strength = getStrength(passwords.newPass);
                        return (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength
                                ? strength <= 1
                                  ? "bg-red-400"
                                  : strength <= 2
                                    ? "bg-amber-400"
                                    : strength <= 3
                                      ? "bg-slate-400"
                                      : "bg-slate-700 dark:bg-slate-300"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {passwords.newPass.length < 4
                        ? "Too short"
                        : passwords.newPass.length < 6
                          ? "Weak"
                          : passwords.newPass.length < 10
                            ? "Fair"
                            : "Strong"}
                    </p>
                  </div>
                )}

                {pwError && (
                  <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
                    <X size={12} /> {pwError}
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-white transition-all shadow-sm"
                  >
                    <Lock size={14} /> Update Password
                  </button>
                </div>
              </form>
            </SectionCard> */}
          </div>
        </div>
      </div>
    </div>
  );
}
