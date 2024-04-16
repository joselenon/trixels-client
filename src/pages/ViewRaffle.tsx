import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import PrizesElement from '../components/Games/Raffles/RafflesDetails/PrizesElement';
import TicketsElements from '../components/Games/Raffles/RafflesDetails/TicketsElements';
import Wheel from '../components/Games/Raffles/Wheel';
import TrixelsButton from '../components/TrixelsButton';
import useGetActiveRaffles from '../hooks/useGetRaffles';
import { IRaffleToFrontEndTreated } from '../interfaces/IRaffles';
import { Body } from '../styles/GlobalStyles';

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
  const { gameId } = useParams();
  const { updatedRaffles } = useGetActiveRaffles();

  const [raffleSelected, setRaffleSelected] = useState<IRaffleToFrontEndTreated | undefined | null>(undefined);

  useEffect(() => {
    if (updatedRaffles) {
      const activeRaffles = updatedRaffles.activeRaffles;
      const endedRaffles = updatedRaffles.endedRaffles;

      const allRaffles = [...activeRaffles, ...endedRaffles];

      const raffleFound = allRaffles.find((raffle) => raffle.gameId === gameId);
      if (raffleFound) {
        setRaffleSelected(raffleFound);
      } else {
        setRaffleSelected(null);
      }
    }
  }, [updatedRaffles]);

  const renderRaffle = () => {
    if (!raffleSelected) {
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
            <h1 style={{ color: 'brown' }}>Raffle not found</h1>
          </Body>
        );
      }
    }

    const { info } = raffleSelected;
    const { prizes, prizesTotalValue } = info;

    const raffleDate = raffleSelected.createdAt;

    return (
      <Body>
        {raffleSelected && (
          <ViewRaffleContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <TitleAndBackButton>
                <div>
                  <Link to={'/raffles'}>
                    <TrixelsButton btnType="DEFAULT" label="BACK" />
                  </Link>
                </div>
                <h3>Raffle: {}</h3>
              </TitleAndBackButton>

              <RaffleCaption>
                <h4>Game: {raffleSelected.gameId}</h4>
                <h4>{new Date(raffleDate).toLocaleDateString()}</h4>
              </RaffleCaption>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Wheel raffle={raffleSelected} />
              <PrizesElement prizes={prizes} prizesTotalValue={prizesTotalValue} />
            </div>

            <TicketsElements raffle={raffleSelected} />
          </ViewRaffleContainer>
        )}
      </Body>
    );
  };

  return renderRaffle();
}
