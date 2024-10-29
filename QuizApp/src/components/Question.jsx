import QuestionTimer from "./Question-Timer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Question({
  index,

  onSelectAnswer,

  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect != null) {
    timer = 2000;
  }

  function handleSelectedAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });
    }, 1000);

    setTimeout(() => {
      onSelectAnswer(answer);
    }, 2000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answer={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectedAnswer}
      />
      <QuestionTimer
        key={timer}
        timeOut={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
    </div>
  );
}
