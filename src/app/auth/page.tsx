"use client";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabaseClient";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Auth({}: Props) {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center rounded-2xl border p-8">
        <Image
          src={"/logo.jpg"}
          width={100}
          height={100}
          alt={"logo"}
          className="my-2 h-[130px] w-[180px]"
        />
        <div className="flex flex-col items-center">
          <Image
            src={"/login.jpeg"}
            width={400}
            height={400}
            alt={"login picture"}
            className="h-[250px w-[400px] rounded-2xl"
          />
          <h2 className="mt-5 text-center text-2xl font-bold">
            Welcome to AiCruiter
          </h2>
          <p className="text-center text-gray-500">
            Sign in With Google to continue
          </p>
          <Button onClick={signInWithGoogle} className="mt-7 w-full">
            Login With Google
          </Button>
        </div>
      </div>
    </div>
  );
}
