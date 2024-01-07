import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { TimerInfo } from '../../pages/MyTimers';
import { localStorageKeys, saveDataInLocalStorage } from '../../utils/addLocalStorageObj';

const AddNewTimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button,
  input,
  select {
    border: none;
    background: #1b1b1b;
    padding: 8px;
  }
`;

const SelectorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ResourceTypeSelectionContainer = styled.div`
  display: flex;
  gap: 2rem;

  button {
    background: #3f3f3f;
    border-radius: 2px;

    &.active {
      background-color: #3898ae;
    }
  }
`;

const ResourceLandSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    width: 80px;
    background-color: #343434;
    border-radius: 2px;
  }

  button {
    &.add {
      background: #3f7f2f;
    }
  }
`;

interface ResourcesCooldownProps {
  [resourceName: string]: { cooldown: number };
}
const resourcesCooldown: ResourcesCooldownProps = {
  APIARY: { cooldown: 2700000 },
  SPECIAL_MINE: { cooldown: 2700000 },
  COOP: { cooldown: 3600000 },
  MINE: { cooldown: 5400000 },
  SLUGGER: { cooldown: 3600000 },
  TEST: { cooldown: 3000 },
};

interface AddNewTimer {
  timersAcc: string | undefined;
  setTimersAcc: React.Dispatch<React.SetStateAction<string | undefined>>;
  resourcesList: TimerInfo;
  setResourcesList: React.Dispatch<React.SetStateAction<TimerInfo>>;
}

export default function AddNewTimer({
  resourcesList,
  setResourcesList,
  setTimersAcc,
  timersAcc,
}: AddNewTimer) {
  const [resourceType, setResourceType] = useState<string>('');
  const [landNumber, setLandNumber] = useState<number | undefined>(undefined);

  const handleSelectResourceType = (e: React.MouseEvent) => {
    const text = e.currentTarget.querySelector('h4')?.innerText;
    setResourceType(text ? text : '');
  };

  const handleSetLandNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const landNumberTextToNumber = parseInt(e.target.value);
    setLandNumber(landNumberTextToNumber);
  };

  const handleAddNewTimer = () => {
    if (!timersAcc) return toast.error('Account is missing...');
    if (!landNumber) return toast.error('Land number is missing...');

    const newTimerId = `${resourceType}${landNumber}:${timersAcc}`;

    const resourcesListKeys = Object.keys(resourcesList);
    if (resourcesListKeys.includes(newTimerId)) {
      return toast.error('Already exists.');
    }

    const obj: TimerInfo = {
      [newTimerId]: {
        resourceName: resourceType,
        cooldown:
          resourcesCooldown[resourceType as keyof ResourcesCooldownProps].cooldown,
        landNumber,
        startTime: new Date().getTime(),
        acc: timersAcc,
      },
    };

    setResourcesList((prev) => {
      return { ...prev, ...obj };
    });

    return toast.success(`Added: ${resourceType} at land ${landNumber}!`);
  };

  return (
    <AddNewTimerContainer>
      <h3>ADD NEW TIMER</h3>

      <SelectorsContainer>
        <ResourceTypeSelectionContainer>
          <button
            className={resourceType === 'TEST' ? 'active' : ''}
            onClick={(e) => handleSelectResourceType(e)}
            type="button"
          >
            <h4>TEST</h4>
          </button>
          <button
            className={resourceType === 'APIARY' ? 'active' : ''}
            onClick={(e) => handleSelectResourceType(e)}
            type="button"
          >
            <h4>Apiary</h4>
          </button>
          <button
            className={resourceType === 'COOP' ? 'active' : ''}
            onClick={(e) => handleSelectResourceType(e)}
            type="button"
          >
            <h4>Coop</h4>
          </button>
          <button
            className={resourceType === 'MINE' ? 'active' : ''}
            onClick={(e) => handleSelectResourceType(e)}
            type="button"
          >
            <h4>Mine</h4>
          </button>
          <button
            className={resourceType === 'SPECIAL_MINE' ? 'active' : ''}
            onClick={(e) => handleSelectResourceType(e)}
            type="button"
          >
            <h4>Special_Mine</h4>
          </button>
          <button
            className={resourceType === 'SLUGGER' ? 'active' : ''}
            onClick={(e) => handleSelectResourceType(e)}
            type="button"
          >
            <h4>Slugger</h4>
          </button>
        </ResourceTypeSelectionContainer>

        <ResourceLandSelectionContainer>
          <h4>Acc</h4>
          <select defaultValue={''} onChange={(e) => setTimersAcc(e.target.value)}>
            <option value={''}>Select an account: </option>
            <option>JOSELENON</option>
            <option>MICHINHA</option>
          </select>

          <h4>Land</h4>
          <input type="text" onChange={(e) => handleSetLandNumber(e)} />
          <button onClick={handleAddNewTimer} className="add" type="button">
            <h4>Add</h4>
          </button>
        </ResourceLandSelectionContainer>
      </SelectorsContainer>
    </AddNewTimerContainer>
  );
}
