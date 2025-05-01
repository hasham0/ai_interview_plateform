"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sideBarOptions } from "@/services/constant";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const AppSidebar = (props: Props) => {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="mt-5 flex items-center">
        <Image
          src={"/assets/logo.png"}
          width={100}
          height={100}
          alt={"logo"}
          className="w-[100px]"
        />
        <Button className="w-full">
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {sideBarOptions.map((options, index: number) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={`${path === options.path && "bg-blue-100"} p-5`}
                  >
                    <Link href={options.path}>
                      <options.icon />
                      <span
                        className={`${path === options.path && "text-primary font-bold"} text-[16px]`}
                      >
                        {options.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
