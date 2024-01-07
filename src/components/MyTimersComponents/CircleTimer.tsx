import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { TimerInfo } from '../../pages/MyTimers';
import Timer from './Timer';

const CircleTimerContainer = styled.div`
  display: flex;

  h4 {
    color: #868686;
  }

  .land {
    color: white;
  }
  .chicken {
    color: orange;
  }
`;

const TimerInfoContainer = styled.div`
  width: 130px;
  height: 130px;
  border: 2px solid red;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.expired {
    border: 2px solid green;
  }
  &:hover {
    cursor: pointer;
    background: rgb(0, 0, 0, 0.1);
  }
`;

interface CirleTimer {
  timerInfo: TimerInfo;
  resourcesList: TimerInfo;
  setResourcesList: React.Dispatch<React.SetStateAction<TimerInfo>>;
}

export default function CircleTimer({ setResourcesList, timerInfo }: CirleTimer) {
  const timerId = Object.keys(timerInfo)[0];
  const { cooldown, landNumber, resourceName, startTime } = timerInfo[timerId];

  const timerRef = useRef<HTMLDivElement>(null);
  const [timeInMs, setTimeInMs] = useState<number>(cooldown);

  const handleResetTimer = () => {
    setResourcesList((prev) => {
      if (!prev[timerId]) {
        toast.error('Something went wrong...');
        return prev;
      }

      const updatedObj = { ...prev };
      updatedObj[timerId].startTime = new Date().getTime();
      return updatedObj;
    });

    setTimeInMs(cooldown);
  };

  useEffect(() => {
    const nowTime = new Date().getTime();
    const elapsedTime = nowTime - startTime;

    const cooldownMinusElapsedTime = cooldown - elapsedTime;
    const cooldownLeft = cooldownMinusElapsedTime > 0 ? cooldownMinusElapsedTime : 0;
    setTimeInMs(cooldownLeft);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      timeInMs <= 0 && timerRef.current.classList.add('expired');
      timeInMs > 0 && timerRef.current.classList.remove('expired');
    }
  }, [timeInMs]);

  /* REMOVING TIMER CONFIG */
  let removeTimerTimeout: any;

  const handleMouseDown = () => {
    removeTimerTimeout = setTimeout(() => {
      setResourcesList((prev) => {
        const updatedObj = { ...prev };
        delete updatedObj[timerId];

        return updatedObj;
      });
    }, 5000);
  };

  const handleMouseUp = () => {
    clearTimeout(removeTimerTimeout);
  };
  /* */

  return (
    <CircleTimerContainer>
      <TimerInfoContainer
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleResetTimer}
        ref={timerRef}
      >
        <h5 className="chicken">{resourceName}</h5>
        <h3 className="land">{landNumber}</h3>

        <Timer timeInMs={timeInMs} setTimeInMs={setTimeInMs} />
      </TimerInfoContainer>
    </CircleTimerContainer>
  );
}
