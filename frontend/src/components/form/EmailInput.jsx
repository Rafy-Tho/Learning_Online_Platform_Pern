function EmailInput({ register, errors }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        Email Address
      </label>
      <div className="relative">
        <input
          type="email"
          name="email"
          {...register("email")}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        <i className="fas fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>
      {errors?.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>
  );
}

export default EmailInput;
