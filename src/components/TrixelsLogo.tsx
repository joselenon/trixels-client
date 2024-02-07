import React from 'react';
import styled from 'styled-components';

const TrixelsText = styled.h3`
  color: #2985ff;
  font-size: 2.25rem;
  text-shadow: 0 2px black;
  transition: all 0.2s;

  &:hover {
    text-shadow: 0 3px #124e9d;
  }
`;

export default function TrixelsLogo() {
  return <TrixelsText>Trixels</TrixelsText>;
}
