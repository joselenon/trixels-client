import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import CurrencyIconAndAmount from '../components/CurrencyIconAndAmount';
import Prizes from '../components/Games/Raffles/RafflesDetails/PrizesElement';
import RaffleTotalPrize from '../components/Games/Raffles/RafflesDetails/RaffleTotalPrize';
import TicketsElements from '../components/Games/Raffles/RafflesDetails/TicketsElements';
import Wheel from '../components/Games/Raffles/Wheel';
import NotFoundMessage from '../components/NotFoundMessage';
import TrixelsButton from '../components/TrixelsButton';
import { useRafflesContext } from '../contexts/RafflesContext';
import { IRaffleToFrontEndTreated } from '../interfaces/IRaffles';
import { Body, TruncatedText } from '../styles/GlobalStyles';

const ViewRaffleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TitleAndBackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RaffleCaption = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    color: var(--default-grey);
  }
`;

export default function ViewRaffle() {
  const { gameId } = useParams<{ gameId: string }>();
  const { activeRaffles, endedRaffles } = useRafflesContext();
  const [raffleSelected, setRaffleSelected] = useState<IRaffleToFrontEndTreated | undefined | null>(undefined);

  useEffect(() => {
    let raffleSelected = null;

    if (activeRaffles) {
      const raffleFound = activeRaffles.find((raffle) => raffle.gameId === gameId);
      if (raffleFound) raffleSelected = raffleFound;
    }
    if (endedRaffles) {
      const raffleFound = endedRaffles.find((raffle) => raffle.gameId === gameId);
      if (raffleFound) raffleSelected = raffleFound;
    }
    setRaffleSelected(raffleSelected);
  }, [activeRaffles]);

  if (raffleSelected === undefined) {
    return (
      <Body>
        <h1 style={{ color: 'brown' }}>Loading</h1>
      </Body>
    );
  }

  if (raffleSelected === null) {
    return (
      <Body>
        <NotFoundMessage label="Raffle not found" />
      </Body>
    );
  }

  const { info, description, createdAt } = raffleSelected;
  const { prizes, prizesTotalValue } = info;

  return (
    <Body>
      <ViewRaffleContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          <TitleAndBackButton>
            <div>
              <Link to="/raffles">
                <TrixelsButton btnType="DEFAULT" label="BACK" />
              </Link>
            </div>
            <TruncatedText>
              <h4 style={{ whiteSpace: 'wrap' }}>Raffle: {description}</h4>
            </TruncatedText>
          </TitleAndBackButton>

          <RaffleCaption>
            <TruncatedText>
              <h4>Game: {raffleSelected.gameId}</h4>
            </TruncatedText>
            <h4>{new Date(createdAt).toLocaleDateString()}</h4>
          </RaffleCaption>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Wheel raffle={raffleSelected} />

          <div>
            <RaffleTotalPrize prizesTotalValue={prizesTotalValue} />
            <Prizes prizes={prizes} />
          </div>
        </div>

        <TicketsElements raffle={raffleSelected} />
      </ViewRaffleContainer>
    </Body>
  );
}
