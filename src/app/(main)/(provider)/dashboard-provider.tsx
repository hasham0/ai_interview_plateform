import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import AppSidebar from "../_components/app-side-bar";

type Props = {
  children: ReactNode;
};

export default function DashboardProvider({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
