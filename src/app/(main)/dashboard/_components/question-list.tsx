"use client";
import { CreateInterviewTS } from "@/schemas/CreateInterviewZod";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { QuestionsTS } from "@/types";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./question-list-container";
import supabase from "@/services/supabaseClient";
import { useUserDetailsContext } from "@/app/auth/(provider)/auth-provider";
import axios, { AxiosError } from "axios";
import { v4 as uuidV4 } from "uuid";

type Props = {
  formData: CreateInterviewTS;
  onCreateLink: (interview_id: string) => void;
};

const QuestionList = ({ formData, onCreateLink }: Props) => {
  const { user } = useUserDetailsContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [questionsList, setQuestionsList] = useState<
    QuestionsTS["interviewQuestions"]
  >([]);
  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });
      const content = result.data.questions.content
        .replace('"```json', "")
        .replace("```", "");
      const parsedJson = JSON.parse(content);
      if (
        !parsedJson.interviewQuestions ||
        !Array.isArray(parsedJson.interviewQuestions)
      ) {
        throw new Error("Invalid response format");
      }

      setQuestionsList(parsedJson.interviewQuestions);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    try {
      const interview_id = uuidV4();
      const { data, error } = await supabase
        .from("interview_questions")
        .insert([
          {
            jobPosition: formData.jobPosition,
            jobDescription: formData.jobDescription,
            interviewDuration: formData.interviewDuration,
            type: formData.interviewType.join(", "),
            questionList: JSON.stringify(questionsList),
            userEmail: user?.email,
            interview_id,
          },
        ])
        .select();
      if (!data || error) {
        throw new Error("Failed to save interview questions");
      }
      onCreateLink(interview_id);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="border-primary flex items-center gap-5 rounded-xl border bg-blue-50 p-5">
        <Loader2 className="animate-spin" />
        <div>
          <h2 className="font-medium">Generating Interview Questions</h2>
          <p className="text-primary">
            Our AI model is crafting personalized interview questions based on
            your job details
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white p-5">
      {questionsList?.length > 0 && (
        <QuestionListContainer questionsList={questionsList} />
      )}
      <div className="mt-4 flex justify-end">
        <Button disabled={saveLoading} size={"lg"} onClick={() => onFinish()}>
          {saveLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Finish</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuestionList;
