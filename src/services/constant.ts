import { InterviewTypeTS, SideBarOptionsTS } from "@/types";
import {
  Award,
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  UserIcon,
  WalletCards,
} from "lucide-react";

export const sideBarOptions: Array<SideBarOptionsTS> = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Shedule Interview",
    icon: Calendar,
    path: "/shedule-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewTypes: Array<InterviewTypeTS> = [
  { title: "Technical", value: "technical", icon: Code2Icon },
  { title: "Behavioral", value: "behavioral", icon: UserIcon },
  { title: "Experience", value: "experience", icon: BriefcaseBusinessIcon },
  { title: "Problem Solving", value: "problem-solving", icon: Puzzle },
  { title: "Leadership", value: "leadership", icon: Award },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}

Job Description: {{jobDescription}}

Interview Duration: {{duration}}

Interview Type: {{type}}

📝 Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life {{type}} interview.

🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
 question:'',
 type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
},{
...
}]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;
