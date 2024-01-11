import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { IUserResourcesRedis } from '../../interfaces/IUserResources';

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
    height: 35px;
    border-radius: 6px;
  }
`;

const SelectorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 90px);
  grid-template-rows: 80px 80px;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  .land-number {
    width: 100%;
    grid-column: 5/6;
  }

  .add-button {
    grid-column: 6/7;
    width: 100%;
    background: #24768f;
  }

  .account {
    grid-column: 1/5;
  }

  .resource-type {
    grid-column: 1 / 7;
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 90px);

    .resource-type {
      grid-column: 1 / 4;
    }

    .account {
      grid-column: 1/2;
    }

    .land-number {
      width: 100%;
      grid-column: 2/3;
    }

    .add-button {
      grid-column: 3/4;
      width: 100%;
      background: #24768f;
    }
  }

  @media (max-width: 650px) {
    .account {
      grid-column: 1/2;
    }

    .land-number {
      width: 100%;
      grid-column: 2/3;
    }

    .add-button {
      grid-column: 3/4;
      width: 100%;
      background: #24768f;
    }
  }

  button {
    width: 100%;
    background: #3f3f3f;

    &.active {
      background-color: #3898ae;
    }
  }
`;

const AccountSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h5 {
    white-space: normal;
  }
  select {
    width: 100%;
  }
`;

interface ResourcesCooldownProps {
  [resourceName: string]: { cooldown: number };
}
export const resourcesCooldown: ResourcesCooldownProps = {
  APIARY: { cooldown: 2700000 },
  SPECIAL_MINE: { cooldown: 2700000 },
  COOP: { cooldown: 3600000 },
  MINE: { cooldown: 5400000 },
  SLUGGER: { cooldown: 3600000 },
  TEST: { cooldown: 3000 },
};

interface AddNewTimer {
  selectedAcc: string | undefined;
  setSelectedAcc: React.Dispatch<React.SetStateAction<string | undefined>>;
  resourcesList: IUserResourcesRedis;
  setNewResource: React.Dispatch<React.SetStateAction<IUserResourcesRedis | null>>;
}

export default function AddNewTimer({
  resourcesList,
  setNewResource,
  setSelectedAcc,
  selectedAcc,
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
    if (!selectedAcc) return toast.error('Account field is required.');
    if (!landNumber) return toast.error('Land number is required.');
    if (!resourceType) return toast.error('Resource type is required.');

    const resourcesListKeys = Object.keys(resourcesList);

    /* MELHORAR NOME DE VARIAVEIS (RESOURCETYPE E RESOURCENAME) */
    for (const key of resourcesListKeys) {
      if (
        resourcesList[key].landNumber === landNumber &&
        resourcesList[key].resourceName === resourceType
      ) {
        return toast.error('Already exists.');
      }
    }

    const obj: any = {
      resourceName: resourceType,
      landNumber,
      startTime: new Date().getTime(),
    };

    setNewResource(obj);
    return toast.success(`Added: ${resourceType} at land ${landNumber}!`);
  };

  return (
    <AddNewTimerContainer>
      <h3>ADD NEW TIMER</h3>

      <SelectorsContainer>
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

        <AccountSelectionContainer className="account">
          <select defaultValue={''} onChange={(e) => setSelectedAcc(e.target.value)}>
            <option value={''}>Select an account: </option>
            <option>JOSELENON</option>
            <option>XX</option>
          </select>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            <h5>*You can add an account by going to your</h5>
            <Link to={'/'}>
              <h5>profile</h5>
            </Link>
            <h5>settings.</h5>
          </div>
        </AccountSelectionContainer>

        <input
          className="land-number"
          placeholder="Land N."
          type="text"
          onChange={(e) => handleSetLandNumber(e)}
        />

        <button onClick={handleAddNewTimer} className="add-button" type="button">
          <h4>Add</h4>
        </button>
      </SelectorsContainer>
    </AddNewTimerContainer>
  );
}
