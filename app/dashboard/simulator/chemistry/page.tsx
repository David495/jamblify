"use client";
import React, { useState, useEffect } from "react";
import DashBoardHeader from "../../../components/DashboardHeader";
import ChemistryQuestions from "../../../questions/chemistryquestion.json";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

interface Question {
  id: number;
  question: string;
  answers: string[];
  answer: string;
  explanation: string;
}

const shuffleArray = (array: Question[]): Question[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FINAL_QUESTIONS = shuffleArray(ChemistryQuestions).slice(0, 20);

const INITIAL_TIME = 15 * 60;

const ChemistryPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
  const [isTestActive, setIsTestActive] = useState(true);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | null;
  }>({});

  const currentQuestion: Question = FINAL_QUESTIONS[
    currentQuestionIndex
  ] as Question;
  const displayId = currentQuestionIndex + 1;

  if (!currentQuestion) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-xl">No questions loaded.</p>
      </main>
    );
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTestActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      if (interval) clearInterval(interval);
      handleSubmit(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestActive, timeRemaining]);

  useEffect(() => {
    setSelectedAnswer(userAnswers[currentQuestionIndex] || null);
  }, [currentQuestionIndex, userAnswers]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const minutesDisplay = String(minutes).padStart(2, "0");
    const secondsDisplay = String(seconds).padStart(2, "0");

    return `${minutesDisplay}:${secondsDisplay}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex < FINAL_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;

    setSelectedAnswer(answer);

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleSubmit = (timeUp: boolean = false) => {
    if (!timeUp) {
      if (
        !window.confirm(
          "Are you sure you want to submit the test? You cannot return and answer questions."
        )
      ) {
        return;
      }
    }

    let score = 0;
    const totalQuestions = FINAL_QUESTIONS.length;

    FINAL_QUESTIONS.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer === question.answer) {
        score += 1;
      }
    });

    setIsTestActive(false);

    const message = timeUp
      ? `Time's up! Test automatically submitted. Score: ${score}/${totalQuestions}.`
      : `Test Submitted! Score: ${score}/${totalQuestions}.`;

    toast.success(message);
  };

  const getAnswerClasses = (answer: string): string => {
    if (isTestActive) return "";

    const userAnswer = userAnswers[currentQuestionIndex];

    if (answer === currentQuestion.answer) {
      return "bg-green-500 font-bold";
    }

    if (answer === userAnswer && answer !== currentQuestion.answer) {
      return "bg-red-500 font-bold";
    }

    return "";
  };

  return (
    <>
      <DashBoardHeader />
      <Toaster position="top-right" />
      <main className="flex justify-center items-center h-screen flex-col gap-3">
        <section className="text-center mt-20">
          <h1
            className={`text-2xl font-bold ${isTestActive ? "mt-20" : "mt-52"}`}
          >
            Chemistry Jamb CBT
          </h1>
          <p className="text-lg">
            Question {displayId} of {FINAL_QUESTIONS.length}
          </p>

          <p
            className={`text-xl font-semibold ${
              timeRemaining <= 60 && timeRemaining > 0
                ? "text-red-500 animate-pulse"
                : "text-blue-500"
            }`}
          >
            Time Left: {formatTime(timeRemaining)}
          </p>
        </section>

        <section className="bg-blue-900 p-5 md:p-10 rounded flex flex-col gap-10 max-w-[350px] md:max-w-[600px] w-full">
          <section>
            <h1 className="bg-blue-500 p-4 rounded text-white">
              {displayId}. {currentQuestion.question}
            </h1>
          </section>

          <section className="bg-blue-800 p-5 rounded text-white flex flex-col gap-4">
            {currentQuestion.answers.map((answer, index) => (
              <div
                key={index}
                className={`flex gap-4 items-center p-2 rounded ${getAnswerClasses(
                  answer
                )}`}
              >
                <input
                  type="radio"
                  name="cbt-answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={handleAnswerChange}
                  disabled={!isTestActive}
                  className="w-5 h-5 accent-green-500"
                />
                <p>{answer}</p>
              </div>
            ))}

            {!isTestActive && (
              <div className="mt-4 p-4 bg-blue-700 rounded">
                <h3 className="font-bold text-lg text-green-300">
                  Explanation:
                </h3>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            {!isTestActive && (
              <p className="text-red-400 font-bold mt-2">
                TEST REVIEW MODE. Scroll for explanation.
              </p>
            )}
          </section>

          <div className="flex justify-between items-center p-4">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`rounded py-3 px-10 cursor-pointer text-white ${
                currentQuestionIndex === 0
                  ? "bg-gray-500"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === FINAL_QUESTIONS.length - 1}
              className={`rounded py-3 px-10 cursor-pointer text-white ${
                currentQuestionIndex === FINAL_QUESTIONS.length - 1
                  ? "bg-gray-500"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Next
            </button>
          </div>
          {isTestActive && (
            <section>
              <button
                onClick={() => handleSubmit(false)}
                className={`rounded py-3 px-10 cursor-pointer text-white bg-red-600 hover:bg-red-700`}
              >
                Submit Test
              </button>
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default ChemistryPage;
