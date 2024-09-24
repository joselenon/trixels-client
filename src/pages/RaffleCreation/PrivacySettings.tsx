import React from 'react';
import { styled } from 'styled-components';

import TrixelsButton from '../../components/TrixelsButton';
import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';

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

export default function PrivacySettings() {
  const { raffleConfig, setPrivacyMode, setDiscountPercentage } = useRaffleCreationContext();

  return (
    <DiscountPercentageAndParticipantsContainer>
      <DiscountContainer>
        <h5>Discount - {raffleConfig.discountPercentage}%</h5>
        <input
          type="range"
          name=""
          id=""
          min="0"
          max="100"
          defaultValue={0}
          onChange={(e) => setDiscountPercentage(parseInt(e.target.value))}
        />
      </DiscountContainer>

      <ParticipantsContainer>
        <h5>Participants</h5>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <TrixelsButton
            btnType={raffleConfig.privacy.mode === 'public' ? 'BLUE' : 'DEFAULT'}
            label="Anyone"
            attributes={{
              onClick: () => setPrivacyMode('public'),
            }}
          />
          <TrixelsButton
            btnType={raffleConfig.privacy.mode === 'guildMembers' ? 'BLUE' : 'DEFAULT'}
            label="Guild"
            attributes={{
              onClick: () => setPrivacyMode('guildMembers'),
            }}
          />
        </div>
      </ParticipantsContainer>
    </DiscountPercentageAndParticipantsContainer>
  );
}
