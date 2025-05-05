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
import { date } from "zod";
import supabase from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import { Tables } from "../../../../../database.types";

type Props = {};

export default function StartInterview({}: Props) {
  const router = useRouter();
  const { interviewDetails, setInterviewDetails } =
    useInterviewDetailsContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { interview_id } = useParams<{ interview_id: string }>();
  const [activeUser, setActiveUser] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ConversationTS[]>([]);
  const vapiRef = useRef<Vapi | null>(
    new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY as string)
  );

  useEffect(() => {
    if (typeof window !== "undefined" && interviewDetails) {
      startInterviewCall();
    }
    return () => {
      stopInterviewCall();
    };
  }, [interviewDetails]);

  const startInterviewCall = () => {
    setActiveUser(true);
    if (vapiRef.current) {
      console.warn("Vapi already started");
      return;
    }

    try {
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
      vapiRef.current = new Vapi(
        process.env.NEXT_PUBLIC_VAPI_API_KEY as string
      );

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
              content:
                `You are an AI voice assistant conducting interviews.Your job is to ask candidates provided interview questions, assess their responses.Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:"Hey there! Welcome to your ${interviewDetails?.jobPosition} interview. Let’s get started with a few questions!"Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:Questions: ${questionList}.If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:"Need a hint? Think about how React tracks component updates!"Provide brief, encouraging feedback after each answer. Example:"Nice! That’s a solid answer.""Hmm, not quite! Want to try again?"Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:"That was great! You handled some tough questions well. Keep sharpening your skills!"End on a positive note:
              "Thanks for chatting! Hope to see you crushing projects soon!"
              Key Guidelines:
              ✅ Be friendly, engaging, and witty 🎤
              ✅ Keep responses short and natural, like a real conversation
              ✅ Adapt based on the candidate’s confidence level
              ✅ Ensure the interview remains focused on React
              `.trim(),
            },
          ],
        },
      };

      vapiRef.current.start(assistantOptions);
      vapiRef.current.on("error", (error) => {
        console.log(error);
      });
    } catch (error) {
      console.error("Error parsing questionList:", error);
    }
  };

  const stopInterviewCall = () => {
    vapiRef.current?.stop();
    vapiRef.current = null;
    setActiveUser(false);
  };
  // vapiRef?.current?.on("call-start", () => {
  //   toast.success("Call Connected...");
  // });
  // vapiRef?.current?.on("speech-start", () => {
  //   setActiveUser(false);
  // });
  // vapiRef?.current?.on("speech-end", () => {
  //   setActiveUser(true);
  // });
  // vapiRef?.current?.on("call-end", () => {
  //   toast.success("Interview Ended...");
  //   generateFeedback();
  // });
  useEffect(() => {
    const handleMessge = (message: { conversation: ConversationTS[] }) => {
      if (message) {
        const convertIntoString = JSON.parse(
          JSON.stringify(message.conversation)
        );
        setConversation(convertIntoString);
      }
    };
    vapiRef?.current?.on("call-start", () => {
      toast.success("Call Connected...");
    });
    vapiRef?.current?.on("speech-start", () => {
      setActiveUser(false);
    });
    vapiRef?.current?.on("speech-end", () => {
      setActiveUser(true);
    });
    vapiRef?.current?.on("call-end", () => {
      toast.success("Interview Ended...");
      generateFeedback();
    });

    return () => {
      vapiRef?.current?.off("message", handleMessge);
      vapiRef?.current?.off("call-start", () => console.log("end.."));
      vapiRef?.current?.off("speech-start", () => console.log("end.."));
      vapiRef?.current?.off("speech-end", () => console.log("end.."));
      vapiRef?.current?.off("call-end", () => console.log("end.."));
    };
  }, []);

  const generateFeedback = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-feedback", { conversation });
      const content = result.data?.content
        .replace('"```json', "")
        .replace("```", "");
      console.log("🚀 ~ generateFeedback ~ n:", content);
      const { data, error } = await supabase
        .from("interview_feedback")
        .insert([
          {
            userName: interviewDetails?.userName,
            userEmail: interviewDetails?.userEmail,
            interview_id: interview_id,
            feedback: JSON.parse(content),
            recommended: false,
          },
        ])
        .select();
      console.log("🚀 ~ generateFeedback ~ data:", data);
      if (error) {
        throw error;
      }
      router.replace(`/interview/${interview_id}/completed`);
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
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="flex justify-between text-xl font-bold">
        AI Interview Session
        <span className="flex items-center gap-2">
          <Timer />
          {/* <span>00:00:00</span> */}
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
              src={"/assets/person.jpg"}
              width={200}
              height={200}
              alt={"logo"}
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
              {interviewDetails?.userName[0] || "A"}
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
