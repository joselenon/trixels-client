import React, { useEffect } from 'react';

interface TimerProps {
  timeInMs: number;
  setTimeInMs: React.Dispatch<React.SetStateAction<number>>;
}

const Timer = ({ timeInMs, setTimeInMs }: TimerProps) => {
  useEffect(() => {
    let interval: any;

    if (timeInMs > 0) {
      interval = setInterval(() => {
        setTimeInMs((prevTime) => prevTime - 1000);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeInMs]);

  useEffect(() => {
    setTimeInMs(timeInMs);
  }, [timeInMs]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedSeconds = seconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      formattedSeconds < 10 ? '0' : ''
    }${formattedSeconds}`;
  };

  return <h4>{formatTime(timeInMs)}</h4>;
};

export default Timer;
