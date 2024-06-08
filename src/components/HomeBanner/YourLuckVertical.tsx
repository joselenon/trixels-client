import React from 'react';
import styled from 'styled-components';

const YourLuckContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 8rem;
    background: -webkit-linear-gradient(#309442 10%, #6ce847);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 500px) {
      font-size: 6.8rem;
    }
    @media (max-width: 400px) {
      font-size: 5.5rem;
    }
  }
`;

export default function YourLuckVertical() {
  return (
    <YourLuckContainer>
      <h1>YOUR</h1>
      <h1>LUCK</h1>
    </YourLuckContainer>
  );
}
