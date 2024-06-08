import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { TimerTime } from '../../../../config/app/RaffleConfig';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import Timer from '../Timer';

interface IAbsoluteContainerProps {
  $timerEnded: boolean;
}

const PreRollScreenContainer = styled.div<IAbsoluteContainerProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  background-color: ${(props) => (props.$timerEnded ? 'none' : 'rgb(0, 0, 0, 0.4)')};
  opacity: ${(props) => (props.$timerEnded ? 0 : 1)};
`;

const pulseAnimation = (isSoldOut: boolean) => keyframes`
  ${
    isSoldOut &&
    css`
      0% {
        opacity: 0.65;
      }
      100% {
        opacity: 0;
      }
    `
  }

  ${
    !isSoldOut &&
    css`
      0% {
        opacity: 0.35;
      }
      50% {
        opacity: 0.65;
      }
      100% {
        opacity: 0.35;
      }
    `
  }
`;

export const WaitingForPlayersContainer = styled.h4<{ $isRaffleSoldOut: boolean }>`
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: ${({ $isRaffleSoldOut }) => pulseAnimation($isRaffleSoldOut)}
    ${({ $isRaffleSoldOut }) => ($isRaffleSoldOut ? '1s' : '2s')}
    ${({ $isRaffleSoldOut }) => ($isRaffleSoldOut ? 'none' : 'infinite')} ease-in-out; /* Aplicando a animação */
  animation-fill-mode: forwards;
  color: white;
  font-weight: 800;
`;

interface IPreRollScreenProps {
  raffleInfo: IRaffleToFrontEndTreated['info'];
  raffleFinishedAt: number | undefined;
  timerEnded: boolean;
  setTimerEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PreRollScreen({
  raffleFinishedAt,
  raffleInfo,
  timerEnded,
  setTimerEnded,
}: IPreRollScreenProps) {
  const { bets, totalTickets } = raffleInfo;

  const isRaffleSoldOut = bets.reduce((acc, bet) => acc + bet.info.tickets.length, 0) === totalTickets;

  return (
    <PreRollScreenContainer $timerEnded={isRaffleSoldOut && timerEnded}>
      <Timer
        isRaffleSoldOut={isRaffleSoldOut}
        triggerWhenTimerEnd={() => setTimerEnded(true)}
        startedAt={raffleFinishedAt}
        duration={TimerTime}
        style={{ color: 'white', textShadow: '0 0 10px black', fontSize: '40px' }}
      />

      <WaitingForPlayersContainer $isRaffleSoldOut={isRaffleSoldOut}>Waiting for players...</WaitingForPlayersContainer>
    </PreRollScreenContainer>
  );
}
