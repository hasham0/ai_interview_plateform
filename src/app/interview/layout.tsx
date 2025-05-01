"use client";
import React, { ReactNode, useState } from "react";
import InterviewHeader from "./_components/interview-header";
import { InterviewDetailsContext } from "@/context/interview-details-context";
import { Tables } from "../../../database.types";

type Props = {
  children: ReactNode;
};

export default function InterviewLayout({ children }: Props) {
  const [interviewDetails, setInterviewDetails] = useState<
    (Tables<"interview_questions"> & { userName: string }) | null
  >(null);

  return (
    <InterviewDetailsContext.Provider
      value={{ interviewDetails, setInterviewDetails }}
    >
      <div className="bg-secondary">
        <InterviewHeader />
        {children}
      </div>
    </InterviewDetailsContext.Provider>
  );
}
