import React from 'react';
import styled from 'styled-components';

import RaffleBox from './RaffleBox';

const HomeRafflesContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function HomeRaffles() {
  return (
    <HomeRafflesContainer>
      <RaffleBox />
      <RaffleBox />
      <RaffleBox />
      <RaffleBox />
    </HomeRafflesContainer>
  );
}
