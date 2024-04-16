import React, { CSSProperties, useEffect, useRef, useState } from 'react';

interface ITimerProps {
  startedAt: number | undefined;
  duration: number;
  style?: CSSProperties;
  triggerWhenTimerEnd: () => void; // Definindo o tipo de retorno como 'void'
}

export default function Timer(props: ITimerProps) {
  const { startedAt, duration, style, triggerWhenTimerEnd } = props;

  const totalMS = useRef<number>(0); // Definindo o tipo de useRef
  const intervalRef = useRef<any>(null);

  const [msLeftToRoll, setMSLeftToRoll] = useState(totalMS.current);
  const [timerState, setTimerState] = useState(totalMS.current);

  function startTimer() {
    const timerSpeed = 10;
    clearInterval(intervalRef.current);

    if (startedAt) {
      return (intervalRef.current = setInterval(() => {
        if (totalMS.current <= 0) {
          clearInterval(intervalRef.current);
          setTimerState(0);
          totalMS.current = msLeftToRoll;
          triggerWhenTimerEnd(); // Chama a função quando o tempo acabar
        } else {
          const newTotalMS = totalMS.current - timerSpeed;
          totalMS.current = newTotalMS;
          setTimerState(newTotalMS);
        }
      }, timerSpeed));
    }
  }

  const calculateMSLeftToRoll = () => {
    if (!startedAt) return 0;
    if (!duration) return 0;

    const nowTime = new Date().getTime();
    const nowTimeToStartedAtDif = nowTime - Number(startedAt);
    const msLeftToRoll = duration - nowTimeToStartedAtDif;
    return msLeftToRoll > 0 ? msLeftToRoll : 0;
  };

  useEffect(() => {
    setMSLeftToRoll(calculateMSLeftToRoll());
    totalMS.current = msLeftToRoll;
    startTimer();

    return () => clearInterval(intervalRef.current);
  }, [startedAt, msLeftToRoll, duration, triggerWhenTimerEnd]);

  return (
    <div style={{ width: '103px' }}>
      {startedAt ? (
        <h2 style={style}>
          {timerState % 1000 === 0
            ? `${timerState / 1000}:00`
            : `${Math.floor(timerState / 1000)}:${String(Math.floor((timerState / 10) % 100)).padStart(2, '0')}`}
        </h2>
      ) : (
        <h2 style={style}>{`${duration / 1000}:00`}</h2>
      )}
    </div>
  );
}
