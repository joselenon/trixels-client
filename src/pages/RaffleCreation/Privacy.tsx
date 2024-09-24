import React from 'react';
import { styled } from 'styled-components';

import TrixelsButton from '../../components/TrixelsButton';
import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';

const PrivacyConfigContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export default function Privacy() {
  const { raffleConfig, setPrivacyType } = useRaffleCreationContext();

  return (
    <PrivacyConfigContainer>
      <TrixelsButton
        btnType={raffleConfig.privacy.type === 'public' ? 'BLUE' : 'DEFAULT'}
        label="Public"
        attributes={{
          onClick: () => setPrivacyType('public'),
        }}
      />
      <TrixelsButton
        btnType={raffleConfig.privacy.type === 'private' ? 'BLUE' : 'DEFAULT'}
        label="Private"
        attributes={{
          onClick: () => setPrivacyType('private'),
        }}
      />
    </PrivacyConfigContainer>
  );
}
