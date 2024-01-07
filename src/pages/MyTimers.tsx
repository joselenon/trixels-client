import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AddNewTimer from '../components/MyTimersComponents/AddNewTimer';
import CircleTimer from '../components/MyTimersComponents/CircleTimer';
import {
  getDataFromLocalStorage,
  localStorageKeys,
  saveDataInLocalStorage,
} from '../utils/addLocalStorageObj';
import getTimersFromServersJson from '../utils/getTimersFromServersJson';
import saveDataInJSON from '../utils/saveDataInJSON';

const MyTimersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const TimersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
`;

export interface TimerInfo {
  [id: string]: {
    resourceName: string;
    cooldown: number;
    landNumber: number;
    startTime: number;
    acc: string;
  };
}

export default function MyTimers() {
  const [timersAcc, setTimersAcc] = useState<string | undefined>(undefined);
  const [resourcesList, setResourcesList] = useState<TimerInfo>({});

  useEffect(() => {
    const loadTimersFromJSON = async () => {
      if (!timersAcc) return;

      const timersData = await getTimersFromServersJson(timersAcc);
      if (timersData) {
        setResourcesList(timersData);
      }
    };

    loadTimersFromJSON();
  }, [timersAcc]);

  useEffect(() => {
    saveDataInLocalStorage(localStorageKeys.timers, resourcesList);
    const jsonBackup = async () => {
      await saveDataInJSON(resourcesList);
    };

    jsonBackup();
  }, [resourcesList]);

  const renderCircleTimers = () => {
    const sortedResourcesList = Object.values(resourcesList).sort((a, b) => {
      return a.landNumber - b.landNumber;
    });

    return sortedResourcesList.map((resource) => {
      const resourceId = `${resource.resourceName}${resource.landNumber}:${resource.acc}`;
      return (
        <CircleTimer
          key={`${resource.landNumber}${resource.resourceName}${resource.acc}`}
          resourcesList={resourcesList}
          setResourcesList={setResourcesList}
          timerInfo={{ [resourceId]: { ...resource } }}
        />
      );
    });
  };

  return (
    <MyTimersContainer>
      <AddNewTimer
        timersAcc={timersAcc}
        setTimersAcc={setTimersAcc}
        resourcesList={resourcesList}
        setResourcesList={setResourcesList}
      />

      <TimersContainer>{renderCircleTimers()}</TimersContainer>
    </MyTimersContainer>
  );
}
