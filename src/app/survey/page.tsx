"use client";
import React, { useCallback, useState } from "react";
const QUESTIONS = ["Question 1?", "Question 2?", "Question 3?"];
const cardStyle = {
  display: "flex",
  flexDirection: "column",
} as const;

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
} as const;

const Card = ({
  question,
  onAnswer,
}: {
  question: string;
  onAnswer: (answer: string) => void;
}) => {
  const answerYes = useCallback(() => onAnswer("Yes"), [onAnswer]);
  const answerNo = useCallback(() => onAnswer("No"), [onAnswer]);
  return (
    <div style={cardStyle}>
      <h2>{question}</h2>
      <button onClick={answerYes}>Yes</button>
      <button onClick={answerNo}>No</button>
    </div>
  );
};
const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    setAnswers((prev: string[]) => [...prev, answer]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div style={pageStyle}>
      {currentQuestionIndex < QUESTIONS.length ? (
        <Card
          question={QUESTIONS[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      ) : (
        <div>
          <h2>
            Thanks for completing the questionnaire. Here are your answers:
          </h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                {QUESTIONS[index]}: {answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Survey;
