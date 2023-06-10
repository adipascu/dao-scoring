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

type Effect = {
  dimension: "D" | "A" | "O";
  impact: number;
};
type Option = {
  text: string;
  effect: Effect | null;
};

type Question = {
  text: string;
  description?: string;
  options: Option[];
};
const QUESTIONS: Question[] = [
  {
    text: "Can your project tolerate highly unpredictable outcomes?",
    description:
      "DAOs exist at the edge of chaos, by moving away from the realm of technical rational decision making, they invite chaotic behavior and complexity.",
    options: [
      {
        text: "Yes",
        effect: null,
      },
      {
        text: "No",
        effect: {
          dimension: "D",
          impact: -2,
        },
      },
    ],
  },
  {
    text: "Is there a team that needs to retain substantial control for the project to success?",
    options: [
      {
        text: "Yes",
        effect: {
          dimension: "D",
          impact: -2,
        },
      },
      {
        text: "No",
        effect: null,
      },
    ],
  },
  {
    text: "Are you launching a token with a secondary market?",
    options: [
      {
        text: "Yes",
        effect: {
          dimension: "D",
          impact: -2,
        },
      },
      {
        text: "No",
        effect: {
          dimension: "D",
          impact: 2,
        },
      },
    ],
  },
  {
    text: "Are you aiming for as broad a participation as possible?",
    description:
      "If you are aiming for pluralism and wide participation, you aim to be more decentralised.",
    options: [
      {
        text: "Yes",
        effect: {
          dimension: "D",
          impact: 2,
        },
      },
      {
        text: "No",
        effect: {
          dimension: "D",
          impact: -2,
        },
      },
    ],
  },
  {
    text: "Are you comfortable with being led by the crowd?",
    description:
      "If you believe in crowd governance DAO is more D, if you think that crowds cannot manage the DAO effectively it is less D.",
    options: [
      {
        text: "Yes",
        effect: {
          dimension: "D",
          impact: 2,
        },
      },
      {
        text: "No",
        effect: {
          dimension: "D",
          impact: -2,
        },
      },
    ],
  },
  {
    text: "How quickly will you need to make decisions?",
    description:
      "If you require rapid agility and quick decision making move further away from D, if changes can be slow and less frequent move closer towards it",
    options: [
      {
        text: "Rapid",
        effect: {
          dimension: "D",
          impact: -2,
        },
      },
      {
        text: "Slow & Less Frequent",
        effect: {
          dimension: "D",
          impact: 2,
        },
      },
    ],
  },
  {
    text: "How important is censorship resistance for the DAO?",
    description:
      "If you require absolute censorship resistant move close to A, if you intent conform to externally defined moderation policies move away from A",
    options: [
      {
        text: "Absolute Censorship Resistant",
        effect: {
          dimension: "A",
          impact: 2,
        },
      },
      {
        text: "Regulatory / Censorship Risks",
        effect: {
          dimension: "A",
          impact: -2,
        },
      },
    ],
  },
  {
    text: "Are you conducting a regulated activity?",
    description:
      "If you are conducting a regulated activity e.g. handling financial derivatives move closer to A, if you are seeking to legally wrap your DAO, move further away from A",
    options: [
      {
        text: "Yes",
        effect: {
          dimension: "A",
          impact: -2,
        },
      },
      {
        text: "No",
        effect: {
          dimension: "A",
          impact: 2,
        },
      },
    ],
  },
  {
    text: "What are the chances of a capture attempt?",
    description:
      "If you think the chances are high that at some point in the future the project action is likely to be prohibited by powerful actors move closer to A. If your activity is considered low risk and already exists in conventional centralised venues move away from A",
    options: [
      {
        text: "Might Become Prohibited",
        effect: {
          dimension: "A",
          impact: 2,
        },
      },
      {
        text: "Already Existing IRL",
        effect: {
          dimension: "A",
          impact: -2,
        },
      },
    ],
  },
];

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
