import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import AddNewTimer from '../components/MyTimersComponents/AddNewTimer';
import CircleTimer from '../components/MyTimersComponents/CircleTimer';
import { IUserResourceFrontEnd, IUserResourcesRedis } from '../interfaces/IUserResources';
import AxiosService from '../services/AxiosService';
import getTimersFromServer from '../utils/getTimersFromServer';
import saveResourceInServer from '../utils/saveResourceInServer';

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

export default function MyTimers() {
  const [selectedAcc, setSelectedAcc] = useState<string | undefined>(undefined);
  const [resourcesList, setResourcesList] = useState<IUserResourcesRedis>({});
  const [newResource, setNewResource] = useState<IUserResourceFrontEnd | null>(null);

  const [circleTimersElements, setCircleTimersElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const loadTimersFromJSON = async () => {
      if (!selectedAcc) return;

      const timersData = await getTimersFromServer(selectedAcc);
      if (timersData) {
        setResourcesList(timersData);
      }
    };

    loadTimersFromJSON();
  }, [selectedAcc]);

  useEffect(() => {
    if (newResource) {
      const saveResource = async () => {
        await saveResourceInServer(newResource);
      };
      saveResource();

      setResourcesList((prev) => {
        /* MUDAR ABORDAGEM DE ID RANDOM */
        return { ...prev, [v4()]: { ...newResource } };
      });
    }
  }, [newResource]);

  const renderCircleTimers = () => {
    const resourcesListEntries = Object.entries(resourcesList);
    const resourcesListSortedEntries = resourcesListEntries.sort((a, b) => {
      return a[1].landNumber - b[1].landNumber;
    });

    return resourcesListSortedEntries.map(([resourceId, resource]) => (
      <CircleTimer
        key={resourceId}
        resourcesList={resourcesList}
        setResourcesList={setResourcesList}
        timerInfo={{ [resourceId]: { ...resource } }}
      />
    ));
  };

  useEffect(() => {
    setCircleTimersElements(renderCircleTimers());
  }, [resourcesList]);

  return (
    <MyTimersContainer>
      <AddNewTimer
        selectedAcc={selectedAcc}
        setSelectedAcc={setSelectedAcc}
        resourcesList={resourcesList}
        setNewResource={setNewResource}
      />

      <TimersContainer>{circleTimersElements}</TimersContainer>
    </MyTimersContainer>
  );
}
