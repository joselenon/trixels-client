import React from 'react';
import styled from 'styled-components';

const WelcomeToTrixelsXyzContainer = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    color: white;
  }
`;

export default function WelcomeToTrixelsXyz() {
  return (
    <WelcomeToTrixelsXyzContainer>
      <h3>Welcome to Trixels.xyz</h3>
    </WelcomeToTrixelsXyzContainer>
  );
}
