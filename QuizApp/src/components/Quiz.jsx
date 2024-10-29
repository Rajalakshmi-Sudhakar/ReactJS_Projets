import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestion = userAnswer.length;
  const quizIsComplete = activeQuestion === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevAnswer) => [...prevAnswer, selectedAnswer]);
  },
  []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswer} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestion}
        index={activeQuestion}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
