import { QuestionsTS } from "@/types";
import React from "react";

type Props = {
  questionsList: QuestionsTS["interviewQuestions"];
};

const QuestionListContainer = ({ questionsList }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-serif text-2xl font-bold underline underline-offset-2">
        Generated Interview Questions
      </h2>
      <div className="space-y-5">
        {questionsList.map((question, index) => (
          <div
            className="gap-5 rounded-xl border border-gray-200 bg-blue-50/70 p-5"
            key={index}
          >
            <h2 className="font-medium">Question: {question.question}</h2>
            <p className="text-primary text-right text-sm">
              Type: {question.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionListContainer;
