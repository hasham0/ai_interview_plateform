"use client";

import { useInterviewDetailsContext } from "@/context/interview-details-context";
import { CirclePlay, Loader2, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { ConversationTS, QuestionsTS } from "@/types";
import AlertConfirmation from "../../_components/alert-confirmation";
import { toast } from "sonner";
import TimerComponent from "../../_components/timer-component";
import axios, { AxiosError } from "axios";
import supabase from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function StartInterview() {
  const router = useRouter();
  const { interviewDetails } = useInterviewDetailsContext();
  const { interview_id } = useParams<{ interview_id: string }>();
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState<Array<ConversationTS>>([]);
  const [loading, setLoading] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);
  const conversationRef = useRef<Array<ConversationTS>>([]);

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  useEffect(() => {
    if (interviewDetails) {
      startInterviewCall();
    }

    return () => {
      stopInterviewCall();
    };
  }, [interviewDetails]);

  const startInterviewCall = () => {
    setActiveUser(true);

    if (vapiRef.current) {
      console.warn("Vapi instance already exists");
      return;
    }

    let questionList = "";

    if (interviewDetails) {
      const data: QuestionsTS["interviewQuestions"] = JSON.parse(
        interviewDetails.questionList as string
      );

      data.forEach((item) => {
        const question =
          item.question as unknown as QuestionsTS["interviewQuestions"][0]["question"];
        return (questionList = question + "," + questionList);
      });
    }

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewDetails?.userName}, how are you? Ready for your interview on ${interviewDetails?.jobPosition}?`,
      transcriber: {
        provider: "deepgram" as const,
        model: "nova-2",
        language: "en-US" as const,
      },
      voice: {
        provider: "playht" as const,
        voiceId: "jennifer",
      },
      model: {
        provider: "openai" as const,
        model: "gpt-3.5-turbo" as const,
        messages: [
          {
            role: "system" as const,
            content: `You are an AI voice assistant conducting interviews. Ask one question at a time based on the following: ${questionList}`,
          },
        ],
      },
    };

    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY as string);
    vapiRef?.current?.start(assistantOptions);

    setupEventListeners();
  };

  const setupEventListeners = () => {
    if (!vapiRef.current) return;

    vapiRef.current.on("message", handleMessage);
    vapiRef.current.on("call-start", () => toast.success("Call Connected..."));
    vapiRef.current.on("speech-start", () => setActiveUser(false));
    vapiRef.current.on("speech-end", () => setActiveUser(true));
    vapiRef.current.on("call-end", () => {
      toast.success("Interview Ended...");
      generateFeedback();
    });
    vapiRef.current.on("error", (err) => console.error("Vapi Error:", err));
  };

  const stopInterviewCall = () => {
    if (vapiRef.current) {
      vapiRef.current.removeAllListeners();
      vapiRef.current.stop();
      vapiRef.current = null;
      setActiveUser(false);
      setLoading(false);
      generateFeedback();
    }
  };

  const handleMessage = (message: { conversation: any; type: string }) => {
    if (message?.type === "conversation-update") {
      const { conversation } = message as unknown as {
        conversation: Array<ConversationTS>;
      };
      if (Array.isArray(conversation)) {
        setConversation(() => [...conversation]);
      }
    }
  };

  const generateFeedback = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversationRef.current,
      });
      console.log("🚀 ~ generateFeedback ~ result:", result);

      // const content = result.data.content
      //   .replace('"```json', "")
      //   .replace("```", "");
      // const parsedJson = JSON.parse(content);
      // console.log(parsedJson);

      // const { data, error } = await supabase.from("interview_feedback").insert([
      //   {
      //     userName: interviewDetails?.userName,
      //     userEmail: interviewDetails?.userEmail,
      //     interview_id: interview_id,
      //     feedback: JSON.stringify(parsedJson),
      //   },
      // ]);
      // if (error) {
      //   throw new Error(error.message);
      // }
      // console.log("🚀 ~ generateFeedback ~ data:", data);
      // router.replace(`/interview/${interview_id}/completed`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("Conversation state updated:", conversation);
  // }, [conversation]);

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="flex justify-between text-xl font-bold">
        AI Interview Session
        <span className="flex items-center gap-2">
          <Timer />
          <TimerComponent start={activeUser} />
        </span>
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-7 md:grid-cols-2">
        <div className="flex h-[400px] flex-col items-center justify-center gap-3 rounded-lg border bg-white">
          <div className="relative">
            {activeUser && (
              <span className="bg-primary absolute inset-0 animate-ping rounded-full opacity-75" />
            )}
            <Image
              src="/assets/person.jpg"
              width={200}
              height={200}
              alt="logo"
              className="h-[100px] w-[100px] rounded-full object-center"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        <div className="flex h-[400px] flex-col items-center justify-center gap-3 rounded-lg border bg-white">
          <div className="relative">
            {activeUser && (
              <span className="bg-primary absolute inset-0 animate-ping rounded-full opacity-75" />
            )}
            <h2 className="bg-primary flex h-[100px] w-[100px] items-center justify-center rounded-full text-2xl text-white">
              {interviewDetails?.userName?.[0] || "A"}
            </h2>
          </div>
          <h2 className="z-10">{interviewDetails?.userName}</h2>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        <AlertConfirmation stopInterview={stopInterviewCall}>
          {!loading ? (
            <Phone className="size-12 cursor-pointer rounded-full bg-red-500 p-3 text-white" />
          ) : (
            <Loader2 className="size-12 animate-spin cursor-pointer rounded-full bg-red-500 p-3 text-white" />
          )}
        </AlertConfirmation>
        <Mic className="size-12 cursor-pointer rounded-full bg-gray-500 p-3 text-white" />
      </div>
    </div>
  );
}
