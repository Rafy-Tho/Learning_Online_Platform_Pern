import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import EmailInput from "../components/form/EmailInput";
import NameInput from "../components/form/NameInput";
import PasswordInput from "../components/form/PasswordInput";
import TermCheck from "../components/form/TermCheck";
import SocialButtons from "../components/SocialButtons";
import useRegister from "../hooks/auth/useRegister";
import useAuth from "../hooks/useAuth";

const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  term: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});
const defaultValues = {
  name: "",
  email: "",
  password: "",
  term: false,
};
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues,
  });
  const navigate = useNavigate();
  const { registerUser, isPending } = useRegister();
  const { saveAuth } = useAuth();
  const onSubmit = (data) => {
    registerUser(data, {
      onSuccess: (data) => {
        toast.success("Register successfully");
        saveAuth(data);
        reset();
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.message || "Register failed");
      },
    });
  };
  return (
    <div className="min-h-screen  flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <div className="bg-slate-50 dark:bg-slate-800 max-w-5xl w-full grid md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Social Login Options */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-gray-900 dark:text-slate-50 text-3xl font-bold mb-4">
              Instantly Register
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Choose your preferred method to login or create a new account in
              seconds.
            </p>
          </div>
          {/* Social Login Buttons */}
          <SocialButtons />
          <div className="mt-8">
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-gray-600 dark:text-slate-50 font-medium underline hover:text-blue-200"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-gray-600 dark:text-slate-50 font-medium underline hover:text-blue-200"
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
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <NameInput register={register} errors={errors} />
            {/* Email Input */}
            <EmailInput register={register} errors={errors} />
            {/* password Input */}
            <PasswordInput register={register} errors={errors} />
            {/* Terms Checkbox */}
            <TermCheck register={register} errors={errors} />
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r text-white py-3 px-4 rounded-lg font-medium  focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-[1.02] bg-blue-500 cursor-pointer ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "Registering..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
