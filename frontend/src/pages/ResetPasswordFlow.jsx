import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmailStep from "../components/resetPasswordForm/EmailStep";
import OtpStep from "../components/resetPasswordForm/OtpStep";
import ProgressStep from "../components/resetPasswordForm/ProgressStep";
import PasswordStep from "../components/resetPasswordForm/PasswordStep";
import { getResetPasswordFlow } from "../helper/ResetFlow";

const ResetPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // ✅ Load from sessionStorage
  useEffect(() => {
    const saved = getResetPasswordFlow();
    if (saved) {
      const { step, email, otp } = saved;
      setStep(step);
      setEmail(email);
      setOtp(otp);
    }
  }, []);

  // ✅ Persist state
  useEffect(() => {
    sessionStorage.setItem(
      "reset-password-flow",
      JSON.stringify({ step, email, otp }),
    );
  }, [step, email, otp]);

  // ✅ Guard steps
  useEffect(() => {
    if (step === 2 && !email) setStep(1);
    if (step === 3 && (!email || !otp)) setStep(1);
  }, [step, email, otp]);

  const handleEmailSuccess = (email) => {
    setEmail(email.trim());
    setStep(2);
  };

  const handleOtpSuccess = (otp) => {
    setOtp(otp);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Steps */}
        <ProgressStep currentStep={step} totalSteps={3} />

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          <div className="p-8">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-4 text-sm text-blue-500 hover:underline"
              >
                ← Back
              </button>
            )}
            {/* Step 1: Email Form */}
            {step === 1 && <EmailStep onSuccess={handleEmailSuccess} />}

            {/* Step 2: OTP Form */}
            {step === 2 && email && (
              <OtpStep email={email} onSuccess={handleOtpSuccess} />
            )}

            {/* Step 3: Password Form */}
            {step === 3 && <PasswordStep email={email} otp={otp} />}
            {/* Back Button */}

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordFlow;
