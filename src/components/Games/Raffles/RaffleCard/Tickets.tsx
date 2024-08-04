import React from 'react';
import { styled } from 'styled-components';

import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';

const TicketsAndPriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;

  h3 {
    color: var(--default-blue);
  }
`;

const TicketsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.25rem;
`;

interface IPriceAndBuyProps {
  info: IRaffleToFrontEndTreated['info'];
  totalTickets: number;
}

export default function Tickets({ info, totalTickets }: IPriceAndBuyProps) {
  const totalTicketsBought = info.bets.reduce((acc, bet) => {
    const { tickets } = bet.info;
    return acc + tickets.length;
  }, 0);

  return (
    <TicketsAndPriceContainer>
      <TicketsContainer>
        <h5>Tickets</h5>
        <h3>{`${totalTickets - totalTicketsBought}/${totalTickets}`}</h3>
      </TicketsContainer>
    </TicketsAndPriceContainer>
  );
}
