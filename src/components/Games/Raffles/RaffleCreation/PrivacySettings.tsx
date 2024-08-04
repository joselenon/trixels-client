import React from 'react';
import { styled } from 'styled-components';

import { IRaffleCreationPayload } from '../../../../interfaces/IRaffleCreation';
import TrixelsButton from '../../../TrixelsButton';

const DiscountPercentageAndParticipantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  gap: 1rem;
`;

const DiscountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  input {
    cursor: grab;
  }
`;

const ParticipantsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
`;

interface IPrivacySettingsProps {
  raffleConfig: IRaffleCreationPayload;
  setRaffleConfig: React.Dispatch<React.SetStateAction<IRaffleCreationPayload>>;
}

export default function PrivacySettings({ raffleConfig, setRaffleConfig }: IPrivacySettingsProps) {
  const { privacy, discountPercentage } = raffleConfig;

  const handleChangeDiscountPercentage = (number: string) => {
    const toIntNumber = parseInt(number);

    setRaffleConfig((prevConfig) => ({
      ...prevConfig,
      discountPercentage: toIntNumber,
    }));
  };

  const handleChangePrivacyMode = (mode: IRaffleCreationPayload['privacy']['mode']) => {
    setRaffleConfig((prevConfig) => ({
      ...prevConfig,
      privacy: { ...prevConfig.privacy, mode: mode },
    }));
  };

  return (
    <DiscountPercentageAndParticipantsContainer>
      <DiscountContainer>
        <h5>Discount - {discountPercentage}%</h5>
        <input
          type="range"
          name=""
          id=""
          min="0"
          max="100"
          defaultValue={0}
          onChange={(e) => handleChangeDiscountPercentage(e.target.value)}
        />
      </DiscountContainer>

      <ParticipantsContainer>
        <h5>Participants</h5>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <TrixelsButton
            btnType={privacy.mode === 'public' ? 'BLUE' : 'DEFAULT'}
            label="Anyone"
            attributes={{
              onClick: () => handleChangePrivacyMode('public'),
            }}
          />
          <TrixelsButton
            btnType={privacy.mode === 'guildMembers' ? 'BLUE' : 'DEFAULT'}
            label="Guild"
            attributes={{
              onClick: () => handleChangePrivacyMode('guildMembers'),
            }}
          />
        </div>
      </ParticipantsContainer>
    </DiscountPercentageAndParticipantsContainer>
  );
}
