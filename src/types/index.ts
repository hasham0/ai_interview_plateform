import { LucideIcon } from "lucide-react";

type SideBarOptionsTS = {
  name: string;
  icon: LucideIcon;
  path: string;
};

type InterviewTypeTS = {
  title: string;
  value: string;
  icon: LucideIcon;
};

type QuestionsTS = {
  interviewQuestions: Array<{
    question: string;
    type: string;
  }>;
};

export type { SideBarOptionsTS, InterviewTypeTS, QuestionsTS };
