import { Phone, Video } from "lucide-react";
import React from "react";

type Props = {};

const CreateOptions = ({}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-5">
        <Video className="text-primary size-12 rounded-lg bg-blue-50 p-3" />
        <h2 className="font-bold">Create New Interview</h2>
        <p className="text-gray-500">
          Create AI Interviews and Schedule them with Condidates
        </p>
      </div>
      <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-5">
        <Phone className="text-primary size-12 rounded-lg bg-blue-50 p-3" />
        <h2 className="font-bold">Create Phone Schreeing Call</h2>
        <p className="text-gray-500">
          Schedule Phone Screening Call with Condidates
        </p>
      </div>
    </div>
  );
};

export default CreateOptions;
