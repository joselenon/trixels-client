import React from 'react';
import { styled } from 'styled-components';

import TrixelsButton from '../../components/TrixelsButton';
import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';

const BuyLimitContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

export default function BuyLimit() {
  const { raffleConfig, setMaxTicketsPerUser } = useRaffleCreationContext();

  return (
    <BuyLimitContainer>
      <h4>Buy Limit</h4>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <TrixelsButton
          styles={{ width: 40 }}
          btnType={raffleConfig.maxTicketsPerUser === 2 ? 'BLUE' : 'DEFAULT'}
          label="2"
          attributes={{
            onClick: () => setMaxTicketsPerUser(2),
          }}
        />
        <TrixelsButton
          styles={{ width: 40 }}
          btnType={raffleConfig.maxTicketsPerUser === 5 ? 'BLUE' : 'DEFAULT'}
          label="5"
          attributes={{
            onClick: () => setMaxTicketsPerUser(5),
          }}
        />
        <TrixelsButton
          styles={{ width: 40 }}
          btnType={raffleConfig.maxTicketsPerUser === undefined ? 'BLUE' : 'DEFAULT'}
          label="∞"
          attributes={{
            onClick: () => setMaxTicketsPerUser(null),
          }}
        />
      </div>
    </BuyLimitContainer>
  );
}
