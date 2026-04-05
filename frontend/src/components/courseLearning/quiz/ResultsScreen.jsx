// components/ResultsScreen.jsx
const ResultsScreen = ({ score, onRestart }) => {
  const percentage = Math.round((score.correct / score.total) * 100);

  const getMessage = () => {
    if (percentage === 100)
      return "Perfect Score! 🎉 You're a JavaScript Master!";
    if (percentage >= 80) return "Excellent! 🌟 You really know your stuff!";
    if (percentage >= 60) return "Good job! 💪 Keep practicing!";
    if (percentage >= 40) return "Not bad! 📚 Review the topics you missed.";
    return "Keep learning! 🚀 Every mistake is an opportunity to grow.";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
          Quiz Complete!
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {getMessage()}
        </p>

        <div className="mb-6">
          <p className="text-5xl font-bold text-green-600 mb-2">
            {score.correct}/{score.total}
          </p>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {percentage}% correct
          </p>
        </div>

        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
