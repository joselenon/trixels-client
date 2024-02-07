import React from 'react';
import styled from 'styled-components';

import HomeRaffles from '../components/Games/HomeRaffles';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function Home() {
  return (
    <HomeContainer>
      <div style={{ padding: 30 }}>
        <h4>Welcome to Trixels.xyz</h4>
        <h3 style={{ padding: 30 }}>Test your luck in a pixelated universe!</h3>
      </div>

      <HomeRaffles />
    </HomeContainer>
  );
}
