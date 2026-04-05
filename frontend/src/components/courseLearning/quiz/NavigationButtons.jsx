// components/NavigationButtons.jsx
const NavigationButtons = ({
  currentIndex,
  totalQuestions,
  isAnswered,
  onPrevious,
  onNext,
  onFinish,
}) => {
  return (
    <div className="flex gap-3">
      {!isAnswered && (
        <div className="text-sm text-slate-500 dark:text-slate-400 p-2">
          Select an answer to continue
        </div>
      )}

      {isAnswered && (
        <>
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            ← Previous
          </button>

          {currentIndex === totalQuestions - 1 ? (
            <button
              onClick={onFinish}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              Show Results
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Next Question →
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default NavigationButtons;
