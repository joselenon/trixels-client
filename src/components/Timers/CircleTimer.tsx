import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { IUserResourcesRedis } from '../../interfaces/IResources';
import MyAxiosServiceInstance from '../../services/MyAxiosService';
import { resourcesCooldown } from './AddNewTimer';
import Timer from './Timer';

const CircleTimerContainer = styled.div`
  position: relative;
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

const TimerMenuContainer = styled.div`
  background: rgb(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 100%;
  backdrop-filter: blur(7px);
  border: 2px solid #3da3de;
  transition: all 0.2s;

  &.hidden {
    pointer-events: none;
    z-index: 0;
    opacity: 0;
  }

  h4 {
    font-weight: 600;
    color: white;
    transition: all 0.1s;
  }
  .edit {
    &:hover {
      color: #3da3de;
    }
  }

  .remove {
    &:hover {
      color: #fb6b6b;
    }
  }
`;

interface CirleTimer {
  timerInfo: IUserResourcesRedis;
  resourcesList: IUserResourcesRedis;
  setResourcesList: React.Dispatch<React.SetStateAction<IUserResourcesRedis>>;
}

export default function CircleTimer({ setResourcesList, timerInfo }: CirleTimer) {
  const [isTimerMenuOpened, setIsTimerMenuOpened] = useState(false);

  const timerId = Object.keys(timerInfo)[0];

  const { landNumber, resourceType, startTime, account } = timerInfo[timerId];

  const timerRef = useRef<HTMLDivElement>(null);
  const [timeInMs, setTimeInMs] = useState<number>(0);

  const handleResetTimer = () => {
    const nowTimestamp = new Date().getTime();

    // TIRAR DAQUI ESSA PORRA
    const updateTimersWithStartTime = async () => {
      await MyAxiosServiceInstance.request({
        endpoint: `/user/resources`,
        method: 'put',
        data: { landNumber, resourceType, startTime: nowTimestamp, account },
      });
    };

    setResourcesList((prev) => {
      if (!prev[timerId]) {
        toast.error('Something went wrong...');
        return prev;
      }

      const updatedObj = { ...prev };
      updatedObj[timerId].startTime = nowTimestamp;

      return updatedObj;
    });

    updateTimersWithStartTime();
    setTimeInMs(resourcesCooldown[resourceType].cooldown);
  };

  useEffect(() => {
    if (startTime) {
      const nowTime = new Date().getTime();
      const elapsedTime = nowTime - startTime;

      const cooldownMinusElapsedTime =
        resourcesCooldown[resourceType].cooldown - elapsedTime;
      const cooldownLeft = cooldownMinusElapsedTime > 0 ? cooldownMinusElapsedTime : 0;

      setTimeInMs(cooldownLeft);
    } else {
      setTimeInMs(0);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      timeInMs <= 0 && timerRef.current.classList.add('expired');
      timeInMs > 0 && timerRef.current.classList.remove('expired');
    }
  }, [timeInMs]);

  const handleTimerInfoContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (e.button === 2) {
      setIsTimerMenuOpened((prev) => !prev);
    }
  };

  const removeTimer = () => {
    setResourcesList((prev) => {
      const updatedObj = { ...prev };
      delete updatedObj[timerId];

      return updatedObj;
    });
  };

  return (
    <CircleTimerContainer>
      <TimerInfoContainer
        onClick={handleResetTimer}
        onContextMenu={(e) => handleTimerInfoContainerClick(e)}
        ref={timerRef}
      >
        <h5 className="chicken">{resourceType}</h5>
        <h3 className="land">{landNumber}</h3>

        <Timer timeInMs={timeInMs} setTimeInMs={setTimeInMs} />
      </TimerInfoContainer>

      <TimerMenuContainer
        className={isTimerMenuOpened ? '' : 'hidden'}
        onContextMenu={(e) => handleTimerInfoContainerClick(e)}
      >
        <button type="button">
          <h4 className="edit">Edit</h4>
        </button>
        <button type="button" onClick={removeTimer}>
          <h4 className="remove">Remove</h4>
        </button>
      </TimerMenuContainer>
    </CircleTimerContainer>
  );
}
