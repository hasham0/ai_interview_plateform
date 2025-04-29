import React, { ReactNode } from "react";
import DashboardProvider from "./(provider)/dashboard-provider";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div>
      <DashboardProvider>{children}</DashboardProvider>
    </div>
  );
}
