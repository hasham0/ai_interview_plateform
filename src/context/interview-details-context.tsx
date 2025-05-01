"use client";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Tables } from "../../database.types";

type InterviewContextTS = {
  interviewDetails:
    | (Tables<"interview_questions"> & { userName: string })
    | null;
  setInterviewDetails: Dispatch<
    SetStateAction<
      (Tables<"interview_questions"> & { userName: string }) | null
    >
  >;
};

export const InterviewDetailsContext = createContext<InterviewContextTS>({
  interviewDetails: null,
  setInterviewDetails: () => {},
});

export const useInterviewDetailsContext = () => {
  const context = useContext(InterviewDetailsContext);
  if (context === undefined) {
    throw new Error(
      "InterviewDetailsContext must be used within a InterviewDetailsContextProvider"
    );
  }
  return context;
};
