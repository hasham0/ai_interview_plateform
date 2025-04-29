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
