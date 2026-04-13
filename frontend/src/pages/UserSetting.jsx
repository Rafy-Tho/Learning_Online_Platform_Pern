import PasswordContainer from "../components/setting/PasswordContainer";
import SubscriptionContainer from "../components/setting/SubscriptionContainer";
import UserProfile from "../components/setting/UserProfile";

export default function UserSetting() {
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
            <SubscriptionContainer />
            {/* Change Password */}
            <PasswordContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
