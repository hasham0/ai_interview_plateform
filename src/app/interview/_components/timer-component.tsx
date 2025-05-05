import React, { useEffect, useState } from "react";

type Props = { start: boolean };

const TimerComponent = ({ start }: Props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (start) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [start]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return <div>{formatTime(seconds)}</div>;
};

export default TimerComponent;
