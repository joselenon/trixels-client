/* Timer and "Waiting for players..." screen */

import React, { useState } from 'react';
import { styled } from 'styled-components';

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

  span {
    font-size: 48px;
    color: white;
    font-weight: 800;
  }
`;

interface IWaitingForPlayersContainerProps {
  $isRaffleSoldOut: boolean;
}

export const WaitingForPlayersContainer = styled.span<IWaitingForPlayersContainerProps>`
  text-transform: uppercase;
  font-size: 14px !important;
  letter-spacing: 3px;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$isRaffleSoldOut ? 0 : 0.75)};
  font-family: var(--bai-font);
`;

interface IPreRollScreenProps {
  raffleInfo: IRaffleToFrontEndTreated['info'];
  raffleFinishedAt: number | undefined;
}

export default function PreRollScreen({ raffleFinishedAt, raffleInfo }: IPreRollScreenProps) {
  const { bets, totalTickets } = raffleInfo;

  const [timerEnded, setTimerEnded] = useState(false);

  const isRaffleSoldOut = bets.reduce((acc, bet) => acc + bet.info.tickets.length, 0) === totalTickets;

  return (
    <PreRollScreenContainer $timerEnded={isRaffleSoldOut && timerEnded}>
      {isRaffleSoldOut && (
        <Timer
          triggerWhenTimerEnd={() => setTimerEnded(true)}
          startedAt={raffleFinishedAt}
          duration={TimerTime}
          style={{ color: 'white', textShadow: '0 0 10px black', fontSize: '40px' }}
        />
      )}

      <WaitingForPlayersContainer $isRaffleSoldOut={isRaffleSoldOut}>Waiting for players...</WaitingForPlayersContainer>
    </PreRollScreenContainer>
  );
}
