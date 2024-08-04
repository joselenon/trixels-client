import React from 'react';
import { styled } from 'styled-components';

import useBuyTickets from '../../../../hooks/useBuyTickets';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import TrixelsButton from '../../../TrixelsButton';

const BuyContainer = styled.div`
  width: 100%;
  display: flex;
  white-space: nowrap;
`;

interface IBuyProps {
  gameId: IRaffleToFrontEndTreated['gameId'];
}

export default function Buy({ gameId }: IBuyProps) {
  const buyTicketsFn = useBuyTickets();

  return (
    <BuyContainer>
      <TrixelsButton
        btnType="CTA"
        label={'Buy 1'}
        width="100%"
        attributes={{
          onClick: () =>
            buyTicketsFn({
              gameId,
              info: {
                randomTicket: true,
                quantityOfTickets: 0,
                ticketNumbers: [],
              },
            }),
        }}
      />
    </BuyContainer>
  );
}
