import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { useScreenConfig } from '../contexts/ScreenConfigContext';
import { IReduxStore } from '../interfaces/IRedux';

const TrixelsText = styled.h3<{ $screenWidth: number }>`
  color: #2985ff;
  font-size: ${({ $screenWidth }) => ($screenWidth > 1350 ? '2.25rem' : '1.6rem')};
  text-shadow: 0 2px black;
  transition: all 0.2s;

  &:hover {
    text-shadow: 0 3px #124e9d;
  }
`;

export default function TrixelsLogo() {
  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );
  const { width } = useScreenConfig();

  return <TrixelsText $screenWidth={width}>{width < 1250 && userCredentials ? 'T' : 'Trixels'}</TrixelsText>;
}
