import React from 'react';
import { styled } from 'styled-components';

import TrixelsButton from '../../components/TrixelsButton';
import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';

const TicketsAmountContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

export default function TotalTickets() {
  const { raffleConfig, setTotalTickets } = useRaffleCreationContext();

  return (
    <TicketsAmountContainer>
      <h4>Tickets amount</h4>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <TrixelsButton
          styles={{ width: 40 }}
          btnType={raffleConfig.totalTickets === 5 ? 'BLUE' : 'DEFAULT'}
          label="5"
          attributes={{
            onClick: () => setTotalTickets(5),
          }}
        />
        <TrixelsButton
          styles={{ width: 40 }}
          btnType={raffleConfig.totalTickets === 10 ? 'BLUE' : 'DEFAULT'}
          label="10"
          attributes={{
            onClick: () => setTotalTickets(10),
          }}
        />
        <TrixelsButton
          styles={{ width: 40 }}
          btnType={raffleConfig.totalTickets === 30 ? 'BLUE' : 'DEFAULT'}
          label="30"
          attributes={{
            onClick: () => setTotalTickets(30),
          }}
        />
      </div>
    </TicketsAmountContainer>
  );
}
