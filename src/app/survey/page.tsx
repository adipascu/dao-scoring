"use client";
import {
  Card as ChakraCard,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import QUESTIONS, { Option, Question } from "../questions";
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
  onAnswer: (answer: Option) => void;
}) => {
  return (
    <ChakraCard style={cardStyle}>
      <CardBody>
        <Text>{question.text}</Text>
        {question.options.map((option) => (
          <Button key={option.text} onClick={() => onAnswer(option)}>
            {option.text}
          </Button>
        ))}
      </CardBody>
    </ChakraCard>
  );
};
const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);

  const handleAnswer = (answer: Option) => {
    setAnswers((prev: Option[]) => [...prev, answer]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const agregateScore = useMemo(() => {
    return answers.reduce(
      (acc, { effect }) => {
        if (!effect) {
          return acc;
        }
        const { dimension, impact } = effect;
        return { ...acc, [dimension]: acc[dimension] + impact };
      },
      { D: 0, A: 0, O: 0 }
    );
  }, [answers]);

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
                {QUESTIONS[index].text}: {answer.text}
              </li>
            ))}
          </ul>
          <h2>Here is your aggregate score:</h2>
          <ul>
            {Object.entries(agregateScore).map(([dimension, score]) => (
              <li key={dimension}>
                {dimension}: {score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Survey;
