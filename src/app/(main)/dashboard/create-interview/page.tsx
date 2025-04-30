"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "../_components/form-container";
import { CreateInterviewTS } from "@/schemas/CreateInterviewZod";
import QuestionList from "../_components/question-list";

type Props = {};

export default function CreateInterview({}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateInterviewTS>({
    jobPosition: "",
    jobDescription: "",
    interviewDuration: "",
    interviewType: [],
  });
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((pre) => pre + 1);
  };

  return (
    // <div className="my-10 px-10 md:px-24 lg:px-44 xl:px-56">
    <div className="my-10 px-10">
      <div className="flex items-center gap-5">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="text-2xl font-semibold">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step === 1 ? (
        <FormContainer onNextStep={handleNextStep} setFormData={setFormData} />
      ) : step === 2 ? (
        <QuestionList formData={formData} />
      ) : null}
    </div>
  );
}
