function InputField({
  label,
  icon,
  value,
  onChange,
  type = "text",
  disabled = false,
  hidden = false,
  placeholder = "",
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          disabled={disabled}
          placeholder={placeholder}
          hidden={hidden}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
export default InputField;
