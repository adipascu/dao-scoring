"use client";
import {
  Card as ChakraCard,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import QUESTIONS, { Question } from "../questions";
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
  question: Question;
  onAnswer: (answer: string) => void;
}) => {
  const answerYes = useCallback(() => onAnswer("Yes"), [onAnswer]);
  const answerNo = useCallback(() => onAnswer("No"), [onAnswer]);
  return (
    <ChakraCard style={cardStyle}>
      <CardBody>
        <Text>{question.text}</Text>
        {question.options.map((option, index) => (
          <Button key={option.text} onClick={() => onAnswer(option.text)}>
            {option.text}
          </Button>
        ))}
        {/* <Button onClick={answerYes}>Yes</Button> */}
        {/* <Button onClick={answerNo}>No</Button> */}
      </CardBody>
    </ChakraCard>
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
                {QUESTIONS[index].text}: {answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Survey;
