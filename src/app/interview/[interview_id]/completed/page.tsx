"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import Image from "next/image";

export default function InterviewCompleted() {
  return (
    <div
      className="flex min-h-screen flex-col font-sans text-white antialiased"
      style={{ backgroundColor: "#fff" }}
    >
      <main className="bg-primary/70 flex flex-grow flex-col items-center justify-center space-y-8 py-16">
        <div
          className="rounded-full p-4"
          style={{ backgroundColor: "#10B981" }}
        >
          <Image
            src={"/assets/checked.png"}
            width={200}
            height={200}
            alt={"checked"}
            className="h-[50px] w-[50px]"
          />
        </div>

        <h1 className="text-center text-4xl font-bold">Interview Complete!</h1>
        <p className="text-center text-lg text-white">
          Thank you for participating in the AI-driven interview with Alcruiter
        </p>

        <div className="overflow-hidden rounded-xl shadow-lg">
          <Image
            src={"/assets/interviewCompleted.jpg"}
            width={500}
            height={500}
            alt={"illustration"}
          />
        </div>

        <div
          className="w-full max-w-xl space-y-4 rounded-xl p-8 shadow-md"
          style={{ backgroundColor: "#1E293B" }}
        >
          <div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: "#334155" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              style={{ color: "#3B82F6" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h2 className="text-center text-2xl font-semibold">What's Next?</h2>
          <p className="text-center text-gray-300">
            The recruiter will review your interview responses and contact you
            regarding the next steps.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Response within 2–3 business days</span>
          </div>
        </div>

        {/* s */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="flex items-center space-x-2 rounded-lg px-6 py-3 text-white transition duration-300 ease-in-out">
            <Home className="h-5 w-5" />
            <span>Return to Homepage</span>
          </Button>
          <Button
            className="flex items-center space-x-2 rounded-lg px-6 py-3 text-white transition duration-300 ease-in-out"
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563EB")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#3B82F6")
            }
          >
            <span>View Other Opportunities</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </main>

      <footer
        className="py-4 text-center text-gray-400"
        style={{ backgroundColor: "#1E293B" }}
      >
        <p>&copy; 2023 Alcruiter. All rights reserved.</p>
      </footer>
    </div>
  );
}
