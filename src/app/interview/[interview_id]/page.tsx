"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/services/supabaseClient";
import { AxiosError } from "axios";
import { Clock, Info, Loader2, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Tables } from "../../../../database.types";
import { toast } from "sonner";
import { useInterviewDetailsContext } from "@/context/interview-details-context";

type Props = {};

export default function Interview({}: Props) {
  const router = useRouter();
  const { interview_id } = useParams<{ interview_id: string }>();
  const [interviewData, setInterviewData] = useState<Pick<
    Tables<"interview_questions">,
    | "jobPosition"
    | "jobDescription"
    | "type"
    | "interview_id"
    | "interviewDuration"
  > | null>(null);

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const { interviewDetails, setInterviewDetails } =
    useInterviewDetailsContext();

  useEffect(() => {
    interview_id && getInterviewDetails();
  }, [interview_id]);

  const getInterviewDetails = async () => {
    setLoading(true);
    try {
      const { data: interview, error } = await supabase
        .from("interview_questions")
        .select("jobPosition, jobDescription, interviewDuration, type")
        .eq("interview_id", interview_id);
      if (!interview || interview.length === 0 || error) {
        throw new Error(error?.message || "No interview found");
      }
      setInterviewData({
        interview_id: interview_id,
        jobPosition: interview[0].jobPosition,
        jobDescription: interview[0].jobDescription,
        interviewDuration: interview[0].interviewDuration,
        type: interview[0].type,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    try {
      let { data: interview, error } = await supabase
        .from("interview_questions")
        .select("*")
        .eq("interview_id", interview_id);
      if (!interview || interview.length === 0 || error) {
        throw new Error(error?.message || "No interview found");
      }
      setInterviewDetails({
        userName: userName,
        created_at: interview[0].created_at,
        id: interview[0].id,
        interview_id: interview_id,
        jobPosition: interview[0].jobPosition,
        jobDescription: interview[0].jobDescription,
        interviewDuration: interview[0].interviewDuration,
        questionList: interview[0].questionList,
        type: interview[0].type,
        userEmail: interview[0].userEmail,
      });
      router.push(`/interview/${interview_id}/start`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 px-10 md:px-28 lg:px-48 xl:px-64">
      <div className="mb-20 flex flex-col items-center justify-center rounded-xl border bg-white p-7 lg:px-32 xl:px-52">
        <Image
          src={"/assets/logo.png"}
          width={200}
          height={200}
          alt={"logo"}
          className="w-[70px]"
        />
        <h2 className="mt-3">AI-Powered Interview Platform</h2>
        <Image
          src={"/assets/interview.jpg"}
          width={500}
          height={500}
          alt={"logo"}
          className="mt-6 w-[250px]"
        />
        <h2 className="mt-3 text-xl font-bold">
          Full Stack Developer Inteview
        </h2>
        <h2 className="mt-3 flex items-center gap-2 text-gray-500">
          <Clock />
          <span>30 Minutes</span>
        </h2>
        <div className="mt-3 w-full">
          <h2 className="font-bold">Enter Your Full Name</h2>
          <Input
            type="text"
            placeholder="e.g. Jhon Doe"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUserName(event.target.value)
            }
          />
        </div>
        <div className="mt-3 w-full">
          <h2 className="font-bold">Enter Your Email</h2>
          <Input
            type="email"
            placeholder="e.g. JhonDoe@gmail.com"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUserEmail(event.target.value)
            }
          />
        </div>
        <div className="mt-5 flex gap-3 rounded-lg bg-blue-100 p-3">
          <Info className="text-primary" />
          <div className="space-y-1">
            <h2 className="font-bold">Before You Begin</h2>
            <ul className="space-y-1">
              <li className="text-primary text-sm">
                - Test your camera and microphone.
              </li>
              <li className="text-primary text-sm">
                - Ensure you have a stable internet connection.
              </li>
              <li className="text-primary text-sm">
                - Find a quiet and comfortable space for the interview.
              </li>
            </ul>
          </div>
        </div>
        <Button
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}
          className="mt-5 w-full font-bold"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <Video />
              Join Interview
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
