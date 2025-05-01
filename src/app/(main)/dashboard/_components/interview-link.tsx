import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateInterviewTS } from "@/schemas/CreateInterviewZod";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Copy, List, Mail, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

type Props = { formData: CreateInterviewTS; interviewId: string | null };

const InterviewLink = ({ formData, interviewId }: Props) => {
  const getInterviewUrl = () => {
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interviewId}`;
    return url;
  };
  const onCopyLInk = async () => {
    await navigator.clipboard.writeText(getInterviewUrl());
    toast.success("Link Copied");
  };
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src={"/assets/checked.png"}
        width={200}
        height={200}
        alt={"checked"}
        className="h-[50px] w-[50px]"
      />
      <h2 className="mt-4 text-lg font-bold">Your AI Interview is ready</h2>
      <p className="mt-3">
        Share this link with the candidate to start the interview process{" "}
      </p>
      <div className="mt-6 w-full rounded-lg bg-white p-7">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="text-primary rounded-xl bg-blue-50 p-1 px-2">
            Valid for 30 days
          </h2>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <Input
            defaultValue={getInterviewUrl()}
            disabled={true}
            className="w-2/3"
          />
          <Button onClick={() => onCopyLInk()}>
            <Copy /> Copy Link
          </Button>
        </div>
        <Separator className="my-8" />
        <div className="flex gap-5">
          <h2 className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="size-4" />
            {20}
          </h2>
          <h2 className="flex items-center gap-2 text-sm text-gray-500">
            <List className="size-4" />
            {10}
          </h2>
        </div>
      </div>
      <div className="mt-8 w-full rounded-lg bg-white p-5">
        <h2>Share Via</h2>
        <div className="flex w-full gap-1 p-4">
          <Button className="w-1/3" variant={"outline"}>
            <Mail />
            Email
          </Button>
          <Button className="w-1/3" variant={"outline"}>
            <Mail />
            Slack
          </Button>
          <Button className="w-1/3" variant={"outline"}>
            <Mail />
            Whatsapp
          </Button>
        </div>
      </div>
      <div className="mt-6 flex w-full justify-between gap-5">
        <Link href={"/dashboard"}>
          <Button>
            <ArrowLeft />
            Back to Dashboard
          </Button>
        </Link>
        <Link href={"/dashboard/create-interview"}>
          <Button>
            <Plus />
            Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
