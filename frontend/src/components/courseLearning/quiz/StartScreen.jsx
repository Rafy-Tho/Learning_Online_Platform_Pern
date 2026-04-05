// components/StartScreen.jsx
const StartScreen = ({ onStart, totalQuestions }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Quiz Challenge
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12">
          Test your knowledge with {totalQuestions} questions across various
          topics
        </p>
        <button
          onClick={onStart}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
