import React from 'react';
import styled from 'styled-components';

import HomeRaffles from '../components/Games/Raffles/HomeRaffles';
import HomeBanner from '../components/HomeBanner/HomeBanner';
import Reveal from '../components/Reveal';
import { Body } from '../styles/GlobalStyles';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  height: 100%;
`;

export default function Home() {
  return (
    <HomeContainer>
      <HomeBanner />

      <Reveal>
        <Body>
          <HomeRaffles />
        </Body>
      </Reveal>
    </HomeContainer>
  );
}
