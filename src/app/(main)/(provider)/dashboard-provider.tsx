import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import AppSidebar from "../_components/app-side-bar";
import WelcomeContainer from "../dashboard/_components/welcome-container";

type Props = {
  children: ReactNode;
};

export default function DashboardProvider({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full space-y-2 p-10">
        {/* <SidebarTrigger /> */}
        <WelcomeContainer />
        {children}
      </div>
    </SidebarProvider>
  );
}
