// components/QuestionCard.jsx
import OptionButton from "./OptionButton";
import Explanation from "./Explanation";

const QuestionCard = ({
  question,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  correctOptionIndex,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        {question.question}
      </h2>

      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <OptionButton
            key={idx}
            index={idx}
            text={option.text}
            isSelected={selectedAnswer === idx}
            isAnswered={isAnswered}
            isCorrect={idx === correctOptionIndex}
            isWrong={selectedAnswer === idx && idx !== correctOptionIndex}
            onSelect={() => onAnswerSelect(idx)}
            disabled={isAnswered}
          />
        ))}
      </div>

      {isAnswered && (
        <Explanation
          isCorrect={selectedAnswer === correctOptionIndex}
          explanation={question.explanation}
        />
      )}
    </div>
  );
};

export default QuestionCard;
