import { useState } from "react";

const questions = [
  {
    id: "538a223a-08ff-4f48-ac0e-c84a54a662e7",
    question: "What is a JavaScript function?",
    explanation:
      "A function is a reusable block of code designed to perform a particular task.",
    position: 1,
    options: [
      {
        text: "A loop structure",
        is_correct: false,
        position: 1,
      },
      {
        text: "A variable",
        is_correct: false,
        position: 2,
      },
      {
        text: "An object property",
        is_correct: false,
        position: 3,
      },
      {
        text: "A block of reusable code",
        is_correct: true,
        position: 4,
      },
    ],
  },
  {
    id: "8dba2f2e-8cb2-4728-abfd-a3f66039fa42",
    question: "How do you define a function in JavaScript?",
    explanation: "Functions can be declared using the 'function' keyword.",
    position: 2,
    options: [
      {
        text: "function myFunc() {}",
        is_correct: true,
        position: 1,
      },
      {
        text: "def myFunc() {}",
        is_correct: false,
        position: 2,
      },
      {
        text: "func myFunc() {}",
        is_correct: false,
        position: 3,
      },
      {
        text: "create myFunc() {}",
        is_correct: false,
        position: 4,
      },
    ],
  },
  {
    id: "73ee45b7-8d2c-43ff-85fb-05dc13f800ff",
    question: "What is an arrow function?",
    explanation:
      "Arrow functions provide a shorter syntax and do not have their own 'this'.",
    position: 3,
    options: [
      {
        text: "A function with => syntax",
        is_correct: true,
        position: 1,
      },
      {
        text: "A function with return only",
        is_correct: false,
        position: 2,
      },
      {
        text: "A loop function",
        is_correct: false,
        position: 3,
      },
      {
        text: "A built-in function",
        is_correct: false,
        position: 4,
      },
    ],
  },
  {
    id: "32732a9d-2dc6-44e9-9882-9a6bcb44061d",
    question: "What will happen if a function does not return anything?",
    explanation:
      "If no return statement is specified, the function returns undefined.",
    position: 4,
    options: [
      {
        text: "It returns null",
        is_correct: false,
        position: 1,
      },
      {
        text: "It returns 0",
        is_correct: false,
        position: 2,
      },
      {
        text: "It returns undefined",
        is_correct: true,
        position: 3,
      },
      {
        text: "It throws an error",
        is_correct: false,
        position: 4,
      },
    ],
  },
  {
    id: "1bd03d8d-28c7-487b-ac84-45ad0dbd8fd8",
    question: "What is a callback function?",
    explanation:
      "A callback is a function passed as an argument to another function and executed later.",
    position: 5,
    options: [
      {
        text: "A function that calls itself",
        is_correct: false,
        position: 1,
      },
      {
        text: "A function passed as an argument",
        is_correct: true,
        position: 2,
      },
      {
        text: "A function without parameters",
        is_correct: false,
        position: 3,
      },
      {
        text: "A built-in function",
        is_correct: false,
        position: 4,
      },
    ],
  },
];

const QuizApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState(null);

  const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentIndex] !== undefined;

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;
    setSelected(optionIndex);
  };

  const confirmAnswer = () => {
    if (selected === null) return;
    setAnswers({ ...answers, [currentIndex]: selected });
    setSelected(null);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([idx, answerIndex]) => {
      const question = questions[parseInt(idx)];
      // Check if the selected option has is_correct = true
      if (question.options[answerIndex]?.is_correct) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const getCorrectOptionIndex = (question) => {
    return question.options.findIndex((option) => option.is_correct === true);
  };

  const restart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setSelected(null);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
            Quiz Complete!
          </h2>
          <p className="text-4xl font-bold text-green-600 mb-4">
            {score.correct}/{score.total}
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            You got {Math.round((score.correct / score.total) * 100)}% correct
          </p>
          <button
            onClick={restart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const correctOptionIndex = getCorrectOptionIndex(currentQuestion);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>Answered: {Object.keys(answers).length}</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{
                width: `${(Object.keys(answers).length / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            let bgColor =
              "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700";

            if (isAnswered && idx === correctOptionIndex) {
              bgColor =
                "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-600";
            } else if (
              isAnswered &&
              answers[currentIndex] === idx &&
              idx !== correctOptionIndex
            ) {
              bgColor =
                "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-600";
            } else if (selected === idx) {
              bgColor =
                "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`w-full p-4 text-left border-2 rounded-xl transition-all ${bgColor} ${
                  !isAnswered &&
                  "hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-200">
                    {String.fromCharCode(65 + idx)}. {option.text}
                  </span>
                  {isAnswered && idx === correctOptionIndex && (
                    <span className="text-green-600 text-xl">✓</span>
                  )}
                  {isAnswered &&
                    answers[currentIndex] === idx &&
                    idx !== correctOptionIndex && (
                      <span className="text-red-600 text-xl">✗</span>
                    )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl mb-6 ${
              answers[currentIndex] === correctOptionIndex
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-red-50 dark:bg-red-900/20"
            }`}
          >
            <p className="font-semibold mb-1 text-slate-900 dark:text-white">
              {answers[currentIndex] === correctOptionIndex
                ? "✓ Correct!"
                : "✗ Incorrect"}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {!isAnswered && selected !== null && (
            <button
              onClick={confirmAnswer}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Confirm Answer
            </button>
          )}

          {isAnswered && (
            <>
              <button
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={() => setShowResults(true)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Show Results
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Next Question
                </button>
              )}
            </>
          )}
        </div>

        {/* Quick Navigation */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Jump to question:
          </p>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSelected(null);
                }}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  idx === currentIndex
                    ? "bg-blue-600 text-white"
                    : answers[idx] !== undefined
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
