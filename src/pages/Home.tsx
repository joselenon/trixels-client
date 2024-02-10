import React from 'react';
import styled from 'styled-components';

import HomeRaffles from '../components/Games/HomeRaffles';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const WelcomeBanner = styled.div`
  width: 100%;
  padding: var(--default-pdn);
`;

const CatchphraseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Catchphrase = styled.h2`
  margin: 0;
  white-space: nowrap; // Impede quebras de linha
`;

const CatchphraseText = ({ color, children }) => (
  <Catchphrase style={{ color }}>{children}</Catchphrase>
);

export default function Home() {
  return (
    <HomeContainer>
      <WelcomeBanner>
        <h4 style={{ marginBottom: 15 }}>Welcome to TRIXELS.XYZ</h4>

        <CatchphraseContainer>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <CatchphraseText color="var(--default-green)">Your luck</CatchphraseText>
            <CatchphraseText color="var(--default-blue)">in a</CatchphraseText>
          </div>

          <CatchphraseText color="var(--default-blue)">
            pixelated universe!
          </CatchphraseText>
        </CatchphraseContainer>
      </WelcomeBanner>

      <HomeRaffles />
    </HomeContainer>
  );
}
