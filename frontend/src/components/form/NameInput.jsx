function NameInput({ register, errors }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        Full Name
      </label>
      <div className="relative">
        <input
          type="text"
          name="name"
          {...register("name")}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:bg-gray-700 dark:text-white"
          placeholder="John Doe"
          required
          autoComplete="name"
        />
        <i className="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>
      {errors?.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>
  );
}

export default NameInput;
