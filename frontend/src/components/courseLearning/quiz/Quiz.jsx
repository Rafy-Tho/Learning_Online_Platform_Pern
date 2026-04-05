// QuizApp.jsx (Main Component)
import { useState } from "react";
import useGetQuizzes from "../../../hooks/course/useGetQuizzes";
import ErrorMessage from "../../../ui/ErrorMessage";
import SpinnerLoader from "../../../ui/SpinnerLoader";
import NavigationButtons from "./NavigationButtons";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import ResultsScreen from "./ResultsScreen";
import StartScreen from "./StartScreen";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const { data, isPending, error } = useGetQuizzes();
  const questions = data?.data || [];
  const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentIndex] !== undefined;

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([idx, answerIndex]) => {
      const question = questions[parseInt(idx)];
      if (question.options[answerIndex]?.is_correct) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const restart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  const getCorrectOptionIndex = (question) => {
    return question.options.findIndex((option) => option.is_correct === true);
  };
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!quizStarted) {
    return (
      <StartScreen
        onStart={() => setQuizStarted(true)}
        totalQuestions={questions.length}
      />
    );
  }

  if (showResults) {
    const score = calculateScore();
    return <ResultsScreen score={score} onRestart={restart} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <ProgressBar
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          answersCount={Object.keys(answers).length}
        />

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={answers[currentIndex]}
          isAnswered={isAnswered}
          onAnswerSelect={handleAnswer}
          correctOptionIndex={getCorrectOptionIndex(currentQuestion)}
        />

        <NavigationButtons
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          isAnswered={isAnswered}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFinish={() => setShowResults(true)}
        />
      </div>
    </div>
  );
};

export default Quiz;
