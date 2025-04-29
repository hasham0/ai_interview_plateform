"use client";

import { useUserDetailsContext } from "@/app/auth/(provider)/auth-provider";
import Image from "next/image";

type Props = {};

const WelcomeContainer = ({}: Props) => {
  const { user } = useUserDetailsContext();
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-5">
      <div>
        <h2 className="text-lg font-bold">Welcome Back - {user?.name}</h2>
        <h1 className="text-gray-600">
          AI-Driven Interview Hassle-Free Hiring
        </h1>
      </div>
      {user && (
        <Image
          src={user?.picture || "/default-picture.png"}
          width={50}
          height={50}
          alt={user?.name || "Default Name"}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default WelcomeContainer;
