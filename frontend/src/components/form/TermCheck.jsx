function TermCheck({ register, errors }) {
  return (
    <div className="flex  flex-col ">
      <div>
        <input
          type="checkbox"
          name="rememberMe"
          id="terms"
          {...register("term")}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="terms"
          className="ml-2 text-sm text-gray-600 dark:text-gray-400"
        >
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Privacy Policy
          </a>
        </label>
      </div>
      {errors?.term && (
        <p className="text-red-500 text-sm mt-1">{errors.term.message}</p>
      )}
    </div>
  );
}

export default TermCheck;
