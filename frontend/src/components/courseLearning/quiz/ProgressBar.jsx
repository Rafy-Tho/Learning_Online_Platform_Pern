// components/ProgressBar.jsx
const ProgressBar = ({ currentIndex, totalQuestions, answersCount }) => {
  const progress = (answersCount / totalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
        <span>
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span>Answered: {answersCount}</span>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
