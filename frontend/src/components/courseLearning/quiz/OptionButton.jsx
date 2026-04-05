// components/OptionButton.jsx
const OptionButton = ({
  index,
  text,
  isSelected,
  isAnswered,
  isCorrect,
  isWrong,
  onSelect,
  disabled,
}) => {
  let bgColor =
    "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700";

  if (isAnswered && isCorrect) {
    bgColor =
      "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-600";
  } else if (isAnswered && isWrong) {
    bgColor = "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-600";
  } else if (!isAnswered && isSelected) {
    bgColor =
      "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-600";
  }

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full p-4 text-left border-2 rounded-xl transition-all ${bgColor} ${
        !disabled &&
        "hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-slate-700 dark:text-slate-200">
          {String.fromCharCode(65 + index)}. {text}
        </span>
        {isAnswered && isCorrect && (
          <span className="text-green-600 text-xl">✓</span>
        )}
        {isAnswered && isWrong && (
          <span className="text-red-600 text-xl">✗</span>
        )}
      </div>
    </button>
  );
};

export default OptionButton;
