"use client";
import React, { useState } from "react";

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
        <div style={cardStyle}>
          <h2>{QUESTIONS[currentQuestionIndex]}</h2>
          <button onClick={() => handleAnswer("Yes")}>Yes</button>
          <button onClick={() => handleAnswer("No")}>No</button>
        </div>
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
