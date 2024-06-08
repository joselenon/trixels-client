import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div<{ $isRaffleSoldOut: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 1s ease-in-out;
  opacity: ${({ $isRaffleSoldOut }) => ($isRaffleSoldOut ? 1 : 0)};
`;

interface ITimerProps {
  startedAt: number | undefined;
  duration: number;
  style?: CSSProperties;
  triggerWhenTimerEnd: () => void; // Definindo o tipo de retorno como 'void'
  isRaffleSoldOut: boolean;
}

export default function Timer({ startedAt, duration, style, triggerWhenTimerEnd, isRaffleSoldOut }: ITimerProps) {
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
    <TimerContainer $isRaffleSoldOut={isRaffleSoldOut}>
      {startedAt ? (
        <h2 style={style}>
          {timerState % 1000 === 0
            ? `${timerState / 1000}:00`
            : `${Math.floor(timerState / 1000)}:${String(Math.floor((timerState / 10) % 100)).padStart(2, '0')}`}
        </h2>
      ) : (
        <h2 style={style}>{`${duration / 1000}:00`}</h2>
      )}
    </TimerContainer>
  );
}
