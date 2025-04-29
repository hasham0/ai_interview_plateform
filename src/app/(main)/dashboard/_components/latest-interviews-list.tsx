"use client";
import { Button } from "@/components/ui/button";
import { Camera, Plus, Video } from "lucide-react";
import { useState } from "react";

type Props = {};

const LatestInterviewsList = (props: Props) => {
  const [interviewList, setInterviewList] = useState([]);
  return (
    <div>
      <h2 className="py-3 text-2xl font-bold">Previously Created Interviews</h2>
      {interviewList.length === 0 && (
        <div className="mt-5 flex flex-col items-center gap-3 bg-white p-5">
          <Video className="text-primary size-10" />
          <p>You don't have any interviews</p>
          <Button>
            <Plus />
            Create New Interview
          </Button>
        </div>
      )}
    </div>
  );
};

export default LatestInterviewsList;
