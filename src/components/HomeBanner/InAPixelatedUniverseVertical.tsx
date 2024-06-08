import React from 'react';
import styled from 'styled-components';

const InAPixelatedUniverseContainer = styled.div`
  h2 {
    font-size: 1.45rem;
    color: #2c7996;

    @media (max-width: 500px) {
      font-size: 1.23rem;
    }
    @media (max-width: 400px) {
      font-size: 0.99rem;
    }
  }
`;

export default function InAPixelatedUniverseVertical() {
  return (
    <InAPixelatedUniverseContainer>
      <h2>IN A PIXELATED UNIVERSE</h2>
    </InAPixelatedUniverseContainer>
  );
}
