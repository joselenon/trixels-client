import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import RaffleBox from '../components/Games/Raffles/RaffleCard';
import Reveal from '../components/Reveal';
import TrixelsButton from '../components/TrixelsButton';
import { useRafflesContext } from '../contexts/RafflesContext';
import { useScreenConfig } from '../contexts/ScreenConfigContext';
import { IReduxStore } from '../interfaces/IRedux';
import { Body } from '../styles/GlobalStyles';

const RafflesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ActivePastRafflesContainer = styled.div<{ $screenWidth: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  gap: 1rem;
`;

const RafflesSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function Raffles() {
  const { width } = useScreenConfig();
  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );
  const { activeRaffles, endedRaffles } = useRafflesContext();

  const [aRafflesElements, setARafflesElements] = useState<JSX.Element[]>([]);
  const [eRafflesElements, setERafflesElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (activeRaffles) {
      activeRaffles.sort((raffle1, raffle2) => raffle2.createdAt - raffle1.createdAt);
      const aRaffles = activeRaffles.map((raffle) => (
        <RaffleBox width="100%" key={raffle.gameId} raffleInfo={raffle} />
      ));
      setARafflesElements(aRaffles);
    }

    if (endedRaffles) {
      endedRaffles.sort((raffle1, raffle2) => raffle2.createdAt - raffle1.createdAt);
      const eRaffles = endedRaffles.map((raffle) => (
        <Reveal key={raffle.gameId}>
          <RaffleBox width="100%" raffleInfo={raffle} />
        </Reveal>
      ));
      setERafflesElements(eRaffles);
    }
  }, [activeRaffles, endedRaffles]);

  return (
    <Body>
      <RafflesContainer>
        {userCredentials && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={'/raffles/create'}>
              <TrixelsButton btnType="CTA" label="Create raffle" />
            </Link>
          </div>
        )}

        <Reveal width="100%">
          <RafflesSection>
            <h2>Active Raffles</h2>
            <ActivePastRafflesContainer $screenWidth={width}>{aRafflesElements}</ActivePastRafflesContainer>
          </RafflesSection>
        </Reveal>

        <Reveal width="100%">
          <RafflesSection>
            <h2>Past Raffles</h2>
            <ActivePastRafflesContainer $screenWidth={width}>{eRafflesElements}</ActivePastRafflesContainer>
          </RafflesSection>
        </Reveal>
      </RafflesContainer>
    </Body>
  );
}
