import { useState } from "react";
import PasswordField from "./PasswordField";
import { Lock, Shield, X } from "lucide-react";
import SectionCard from "./SectionCard";
import useUpdatePassword from "../../hooks/user/useUpdatePassword";
import { toast } from "react-toastify";
const validateStrongPassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("At least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("One uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("One lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("One number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("One special character");
  }

  return errors;
};
function PasswordContainer() {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const { updatePassword, isPending } = useUpdatePassword();
  const [pwError, setPwError] = useState({});
  const isEdit =
    passwords.current && passwords.newPass && passwords.confirm && !isPending;
  const handleChangePassword = async () => {
    setPwError({});
    const errors = {};
    const required = ["current", "newPass", "confirm"];
    required.forEach((field) => {
      if (!passwords[field]) {
        errors[field] = `${field} is required`;
      }
    });
    if (Object.keys(errors).length > 0) {
      setPwError(errors);
      return;
    }
    if (passwords.newPass.length < 8) {
      setPwError({ newPass: "New password must be at least 8 characters" });
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPwError({ confirm: "Passwords do not match" });
      return;
    }
    try {
      await updatePassword({
        oldPassword: passwords.current,
        newPassword: passwords.newPass,
      });
      setPwError({});
      toast.success("Password updated successfully");
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    }
  };
  const getStrength = (pw) =>
    Math.min(
      Math.floor(pw.length / 3) +
        (pw.match(/[A-Z]/) ? 1 : 0) +
        (pw.match(/[0-9]/) ? 1 : 0) +
        (pw.match(/[^a-zA-Z0-9]/) ? 1 : 0),
      4,
    );
  return (
    <SectionCard title="Change Password" icon={<Shield size={15} />}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <PasswordField
            label="Current Password"
            value={passwords.current}
            onChange={(v) => setPasswords({ ...passwords, current: v })}
            placeholder="Enter your current password"
          />
          {pwError?.current && (
            <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
              <X size={12} /> {pwError.current}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <PasswordField
              label="New Password"
              value={passwords.newPass}
              onChange={(v) => setPasswords({ ...passwords, newPass: v })}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
            />
            {pwError?.newPass && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
                <X size={12} /> {pwError.newPass}
              </p>
            )}
          </div>
          <div>
            <PasswordField
              label="Confirm New Password"
              value={passwords.confirm}
              onChange={(v) => setPasswords({ ...passwords, confirm: v })}
              placeholder="Repeat new password"
              autoComplete="new-password"
            />
            {pwError?.confirm && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
                <X size={12} /> {pwError.confirm}
              </p>
            )}
          </div>
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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isEdit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock size={14} /> {isPending ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </SectionCard>
  );
}

export default PasswordContainer;
