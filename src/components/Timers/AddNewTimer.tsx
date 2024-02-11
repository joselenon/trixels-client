import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import useTimersFunctions from '../../hooks/useTimersFunctions';
import { IUserResourcesRedis } from '../../interfaces/IUserResources';
import Button from '../Button';

const AddNewTimerContainer = styled.div`
  max-width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  button,
  input,
  select {
    height: 35px;
    border-radius: 6px;
  }
`;

const ResourcesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  button {
    width: 100%;
    background: #3f3f3f;

    &.active {
      background-color: #3898ae;
    }
  }
`;

const AccountLandAndAddButton = styled.div`
  width: 100%;
  background: var(--secondary-bg-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: var(--default-pdn);
`;

const AccountSelectionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  h5 {
    white-space: normal;
  }
`;

const LandNumberAndAddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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
  const timersFunctions = useTimersFunctions();

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

      <ResourcesContainer>
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
      </ResourcesContainer>

      <AccountLandAndAddButton>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <AccountSelectionContainer className="account">
            <select defaultValue={''} onChange={(e) => setSelectedAcc(e.target.value)}>
              <option value={''}>Select an account: </option>
              <option>JOSELENON</option>
              <option>XX</option>
            </select>
          </AccountSelectionContainer>

          <LandNumberAndAddButtonContainer>
            <input
              className="land-number"
              placeholder="Land N."
              type="text"
              onChange={(e) => handleSetLandNumber(e)}
            />

            <div>
              <Button
                btnType="BLUE"
                label={'ADD'}
                attributes={{ onClick: handleAddNewTimer }}
              />
            </div>
          </LandNumberAndAddButtonContainer>
        </div>

        <h5>*You can add an account by going to your profile settings.</h5>
      </AccountLandAndAddButton>
    </AddNewTimerContainer>
  );
}
