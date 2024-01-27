import React, { useEffect } from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <HomeContainer>
      <h4>Welcome to Trixels.xyz</h4>
      <h2>We do the tricks, you get the profit!</h2>
    </HomeContainer>
  );
}
