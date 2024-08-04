import React from 'react';
import styled from 'styled-components';

import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import { TruncatedText } from '../../../../styles/GlobalStyles';
import Prizes from '../RafflesDetails/PrizesElement';
import Buy from './Buy';
import Header from './Header';
import Price from './Price';
import Tickets from './Tickets';
import ViewRaffle from './ViewRaffle';

const RaffleBoxContainer = styled.div`
  user-select: none;
  background: white;
  padding: var(--default-pdn);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 6px;

  img {
    image-rendering: pixelated;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  span {
    color: var(--default-grey);
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-size: 12px;
    color: var(--default-grey);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export default function index({ raffleInfo }: { width: '100%' | undefined; raffleInfo: IRaffleToFrontEndTreated }) {
  const { createdAt, info, gameId, description, createdBy } = raffleInfo;

  const { prizes, totalTickets, ticketPrice, prizesTotalValue } = info;

  return (
    <RaffleBoxContainer>
      <Header createdBy={createdBy} prizesTotalValue={prizesTotalValue} />

      <Prizes prizes={prizes} />

      <DetailsContainer>
        <TitleContainer>
          <TruncatedText>
            <h3 style={{ width: 260 }}>{description}</h3>
          </TruncatedText>
        </TitleContainer>

        <Grid>
          <Tickets info={info} totalTickets={totalTickets} />
          <Price ticketPrice={ticketPrice} />
          <ViewRaffle gameId={gameId} />
          <Buy gameId={gameId} />
        </Grid>

        <DateContainer>
          <span>{new Date(createdAt).toLocaleString()}</span>
        </DateContainer>
      </DetailsContainer>
    </RaffleBoxContainer>
  );
}
