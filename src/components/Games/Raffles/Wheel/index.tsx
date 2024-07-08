/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { v4 } from 'uuid';

import {
  DelayTillAnimate,
  raffleAnimationAlreadyEndedFn,
  TimerTime,
  TotalTimeTillAnimationFinish,
  WheelAnimationTime,
} from '../../../../config/app/RaffleConfig';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import UserAvatarElement from '../../../UserAvatarElement';
import PreRollScreen from './PreRollScreen';
import RenderAvatars from './RenderAvatars';

const WheelContainer = styled.div`
  width: 100%;
  flex: 400px;
  user-select: none;
  overflow-x: hidden;
  position: relative;
  padding: var(--default-pdn) 0;
  background-color: var(--secondary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const slide = keyframes`
  0% {
    transform: translateX(-760px);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  100% {
    transform: translateX(-7320px);
    animation-timing-function: cubic-bezier(0.7, 0, 0.2, 1);
  }
`;

const AvatarsContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 80px;
  left: 50%;
  transform: translateX(-760px); // -760px

  &.start {
    animation: ${slide} ${WheelAnimationTime}ms linear forwards;
  }
`;

const WheelPointer = styled.div<{ $nowTime: number; $timerEnded: boolean; $finishedAt: number | undefined }>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: calc(50%);
  width: 3px;
  height: 100%;
  background-color: red;
  transition: all 0.5s ease-in-out;
  opacity: ${({ $timerEnded, $finishedAt, $nowTime }) => {
    if ($finishedAt && $timerEnded /*  && $nowTime < $finishedAt + TotalTimeTillAnimationFinish */) return 1;
    return 0;
  }};
`;

const AvatarItemContainer = styled.div`
  width: 80px;
  height: 80px;
  border: 1.5px solid grey;
`;

interface IWheelProps {
  raffle: IRaffleToFrontEndTreated;
}

export default function Wheel({ raffle }: IWheelProps) {
  const { finishedAt, info } = raffle;
  const { winnersBetsInfo, bets, totalTickets } = info;

  const theresWinnersBetsInfo = winnersBetsInfo && winnersBetsInfo.length > 0;

  const wheelRef = useRef<any>(undefined);

  const [timerEnded, setTimerEnded] = useState(false);
  const [renderedAvatars, setRenderedAvatars] = useState<JSX.Element[] | undefined>(undefined);

  const getJSXAvatars = (avatarsArray: string[]) => {
    return avatarsArray.map((avatarURL, i) => {
      return (
        <AvatarItemContainer key={i}>
          <UserAvatarElement clickable={false} sizeInPx={80} userInfo={{ url: avatarURL }} />
        </AvatarItemContainer>
      );
    });
  };

  const spinWheelAnimation = () => {
    setTimeout(() => {
      wheelRef.current.classList.add('start');
    }, TimerTime + DelayTillAnimate);

    setTimeout(() => {}, 5000);
  };

  const renderAvatars = () => {
    const renderPlayers = new RenderAvatars(bets, totalTickets);
    const raffleAlreadyEnded = raffleAnimationAlreadyEndedFn(finishedAt);

    if (theresWinnersBetsInfo) {
      winnersBetsInfo.forEach((winnerBet) => {
        /* Remove a animação para começar a próxima do próximo vencedor */
        wheelRef.current.classList.remove('start');

        const avatarsOrder = renderPlayers.renderWinner(winnerBet);
        setRenderedAvatars(getJSXAvatars(avatarsOrder));

        /* Editar aqui caso haja mudança de animações (responsável por skipar animação caso tenha sido há mais do tempo de finalização) */
        if (raffleAlreadyEnded.alreadyEnded) {
          return (wheelRef.current.style.transform = ' translateX(-7320px)');
        }

        spinWheelAnimation();
      });

      return;
    }

    wheelRef.current.classList.remove('start');

    const avatarsOrder = renderPlayers.normalRender();
    setRenderedAvatars(getJSXAvatars(avatarsOrder));
  };

  useEffect(() => {
    renderAvatars();
  }, [finishedAt, bets]);

  return (
    <WheelContainer>
      <PreRollScreen
        timerEnded={timerEnded}
        setTimerEnded={setTimerEnded}
        raffleInfo={info}
        raffleFinishedAt={finishedAt}
      />

      <WheelPointer $nowTime={new Date().getTime()} $finishedAt={finishedAt} $timerEnded={timerEnded} />

      <AvatarsContainer ref={wheelRef}>{renderedAvatars}</AvatarsContainer>
    </WheelContainer>
  );
}
