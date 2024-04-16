import React from 'react';
import styled from 'styled-components';

const YourLuckContainer = styled.div`
  h1 {
    font-size: 8rem;
    background: -webkit-linear-gradient(#309442 10%, #6ce847);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export default function YourLuck() {
  return (
    <YourLuckContainer>
      <h1>YOUR LUCK</h1>
    </YourLuckContainer>
  );
}
