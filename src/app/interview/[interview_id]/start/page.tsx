"use client";
import { useInterviewDetailsContext } from "@/context/interview-details-context";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

export default function StartInterview({}: Props) {
  const { interviewDetails, setInterviewDetails } =
    useInterviewDetailsContext();
  const { interview_id } = useParams<{ interview_id: string }>();

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="flex justify-between text-xl font-bold">
        AI Interview Session
        <span className="flex items-center gap-2">
          <Timer />
          <span>00:00:00</span>
        </span>
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-7 md:grid-cols-2">
        <div className="flex h-[400px] flex-col items-center justify-center gap-3 rounded-lg border bg-white">
          <Image
            src={"/assets/person.jpg"}
            width={200}
            height={200}
            alt={"logo"}
            className="h-[100px] w-[100px] rounded-full object-center"
          />
          <h2>AI Recruiter</h2>
        </div>
        <div className="flex h-[400px] flex-col items-center justify-center gap-3 rounded-lg border bg-white">
          <h2 className="bg-primary rounded-full p-3 px-5 text-2xl text-white">
            {interviewDetails?.userName[0] || "A"}
          </h2>
          <h2>{interviewDetails?.userName}</h2>
        </div>
      </div>
      <div className="mt-7 flex items-center justify-center gap-5">
        <Mic className="size-12 cursor-pointer rounded-full bg-gray-500 p-3 text-white" />
        <Phone className="size-12 cursor-pointer rounded-full bg-red-500 p-3 text-white" />
      </div>
      <h2 className="mt-5 text-center text-sm text-gray-400">
        Interview in Progress...
      </h2>
    </div>
  );
}
