import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  getResendTimer,
  getResendTimerRemaining,
  saveResendTimer,
} from "../../helper/ResendTimer";
import useSendResetPasswordCode from "../../hooks/auth/useSendResetPasswordCode";
import useVerifyResetPasswordCode from "../../hooks/auth/useVerifyResetPasswordCode";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

const OtpStep = ({ email, onSuccess }) => {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });
  const { verifyResetPasswordCode, isPending: isVerifying } =
    useVerifyResetPasswordCode();
  const { sendResetPasswordCode, isPending: isSending } =
    useSendResetPasswordCode();

  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // ✅ prevent duplicate
    }

    intervalRef.current = setInterval(() => {
      const remaining = getResendTimerRemaining();

      setTimer((prev) => (prev !== remaining ? remaining : prev));

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCanResend(true);
      }
    }, 1000);
  };
  const onSubmit = async (data) => {
    if (!email) {
      toast.error("Invalid request. Please try again.");
      return;
    }
    verifyResetPasswordCode(
      { email, code: data.otp },
      {
        onSuccess: () => {
          toast.success("OTP verified successfully");
          onSuccess(data.otp);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to verify OTP");
        },
      },
    );
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    if (!email) {
      toast.error("Invalid request. Please try again.");
      return;
    }
    sendResetPasswordCode(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP resent successfully");
          saveResendTimer();
          setTimer(60);
          setCanResend(false);
          startTimer();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to resent OTP");
        },
      },
    );
  };

  useEffect(() => {
    const savedExpire = getResendTimer();

    if (savedExpire) {
      const remaining = getResendTimerRemaining();

      if (remaining > 0) {
        setTimer(remaining); // ✅ IMPORTANT
        startTimer();
      } else {
        setTimer(0);
        setCanResend(true);
      }
    } else {
      // First time (no timer yet)
      saveResendTimer();
      setTimer(60);
      startTimer();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return (
    <>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Verify OTP
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          We've sent a 6-digit code to{" "}
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {email}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            maxLength={6}
            {...register("otp")}
            className={`w-full px-4 py-3 text-center text-lg tracking-widest bg-slate-50 dark:bg-slate-700 border ${
              errors.otp
                ? "border-red-500"
                : "border-slate-200 dark:border-slate-600"
            } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            placeholder="000000"
            disabled={isVerifying}
          />
          {errors.otp && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Didn't receive code?{" "}
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isSending || !canResend}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {isSending ? "Resending..." : "Resend"}
              </button>
            ) : (
              <span className="text-slate-500">Resend in {timer}s</span>
            )}
          </p>
        </div>

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {isVerifying ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Verifying...</span>
            </>
          ) : (
            "Verify OTP"
          )}
        </button>
      </form>
    </>
  );
};

export default OtpStep;
