import Image from "next/image";
import React from "react";

type Props = {};

const InterviewHeader = ({}: Props) => {
  return (
    <div className="bg-white p-4 shadow-sm">
      <Image
        src={"/assets/logo.png"}
        width={200}
        height={200}
        alt={"logo"}
        className="w-[80px]"
      />
    </div>
  );
};

export default InterviewHeader;
