import { Link, useNavigate } from "react-router-dom";
import SocialButtons from "../components/SocialButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import EmailInput from "../components/form/EmailInput";
import PasswordInput from "../components/form/PasswordInput";
import TermCheck from "../components/form/TermCheck";
import useLogin from "../hooks/auth/useLogin";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  term: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});
const defaultValues = {
  email: "",
  password: "",
  term: false,
};
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });
  const navigate = useNavigate();
  const { login, isPending } = useLogin();
  const { saveAuth } = useAuth();
  const onSubmit = (data) => {
    login(data, {
      onSuccess: (data) => {
        saveAuth(data);
        toast.success("Login successful");
        reset();
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.message || "Login failed");
      },
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 max-w-5xl w-full grid md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Social Login Options */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-slate-800 dark:text-slate-100 text-3xl font-bold mb-4">
              Instantly Login
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
              Choose your preferred method to login in seconds.
            </p>
          </div>

          {/* Social Login Buttons */}
          <SocialButtons />
          <div className="mt-8">
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-slate-800 dark:text-slate-100 font-medium underline hover:text-blue-200"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-slate-800 dark:text-slate-100 font-medium underline hover:text-blue-200"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <EmailInput register={register} errors={errors} />
            {/* Password Input */}
            <PasswordInput register={register} errors={errors} />
            {/* Reset Password Link */}
            <Link
              to="/reset-password"
              className="text-right block text-sm text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Forgot password?
            </Link>
            {/* Terms Checkbox */}
            <TermCheck register={register} errors={errors} />
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r text-white py-3 px-4 rounded-lg font-medium  focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-[1.02] bg-blue-500 cursor-pointer ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
