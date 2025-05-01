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
        <div className="flex w-full items-center justify-center gap-x-3">
          <Image
            src={"/assets/logo.png"}
            width={100}
            height={150}
            alt={"logo"}
            className="my-2 h-[100px] w-[100px]"
          />
          <h1 className="mt-4 text-4xl font-bold underline underline-offset-2">
            Ai Cruiter
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={"/assets/login.jpg"}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
