// components/Explanation.jsx
const Explanation = ({ isCorrect, explanation }) => {
  return (
    <div
      className={`p-4 rounded-xl mb-6 ${
        isCorrect
          ? "bg-green-50 dark:bg-green-900/20"
          : "bg-red-50 dark:bg-red-900/20"
      }`}
    >
      <p className="font-semibold mb-1 text-slate-900 dark:text-white">
        {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {explanation}
      </p>
    </div>
  );
};

export default Explanation;
