import React from 'react';
import styled from 'styled-components';

import { useScreenConfig } from '../contexts/ScreenConfigContext';
import { Link } from 'react-router-dom';

const TrixelsText = styled.h3<{ $screenWidth: number }>`
  color: #2985ff;
  font-size: ${({ $screenWidth }) => ($screenWidth > 1350 ? '2.25rem' : '1.6rem')};
  text-shadow: 0 2px black;
  transition: all 0.2s;

  &:hover {
    text-shadow: 0 3px #124e9d;
  }
`;

export default function TrixelsLogo({ resizeble = true }: { resizeble?: boolean }) {
  const { width } = useScreenConfig();

  return (
    <Link to={'/'}>
      <TrixelsText $screenWidth={width}>{width < 860 && resizeble ? 'T' : 'Trixels'}</TrixelsText>
    </Link>
  );
}
