import React from 'react';
import styled from 'styled-components';

const InAPixelatedUniverseContainer = styled.div`
  h2 {
    font-size: 3rem;
    color: #2c7996;

    @media (max-width: 950px) {
      font-size: 2.5rem;
    }

    @media (max-width: 800px) {
      font-size: 2.16rem;
    }
  }
`;

export default function InAPixelatedUniverse() {
  return (
    <InAPixelatedUniverseContainer>
      <h2>IN A PIXELATED UNIVERSE</h2>
    </InAPixelatedUniverseContainer>
  );
}
