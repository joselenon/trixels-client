import React, { useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { v4 } from 'uuid';

import { raffleAnimationAlreadyEndedFn, TimerTime, WheelAnimationTime } from '../../../../config/app/RaffleConfig';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import AvatarItem from './AvatarItem';
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

interface IWheelPointerProps {
  $jackpotFinished: boolean;
}

const WheelPointer = styled.div<IWheelPointerProps>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: calc(50%);
  width: 3px;
  height: 100%;
  background-color: red;
  transition: opacity 0.5ms;
  opacity: ${(props) => (props.$jackpotFinished ? 1 : 0)};
`;

interface IWheelProps {
  raffle: IRaffleToFrontEndTreated;
}

export default function Wheel({ raffle }: IWheelProps) {
  const { finishedAt, info } = raffle;
  const { winnersBetsInfo, bets, totalTickets } = info;
  const { alreadyEnded } = raffleAnimationAlreadyEndedFn(finishedAt);
  const theresWinnersBetsInfo = winnersBetsInfo && winnersBetsInfo.length > 0;

  const wheelRef = useRef<any>(undefined);
  const [renderedAvatars, setRenderedAvatars] = useState<JSX.Element[] | undefined>(undefined);

  const getJSXAvatars = (avatarsArray: string[]) => {
    return avatarsArray.map((avatarURL) => {
      return <AvatarItem avatarUrl={avatarURL} key={v4()} />;
    });
  };

  const renderAvatars = () => {
    const renderPlayers = new RenderAvatars(bets, totalTickets);

    if (theresWinnersBetsInfo) {
      winnersBetsInfo.forEach((winnerBet) => {
        /* Remove a animação para começar a próxima do próximo vencedor */
        wheelRef.current.classList.remove('start');

        const avatarsOrder = renderPlayers.renderWinner(winnerBet);
        setRenderedAvatars(getJSXAvatars(avatarsOrder));

        /* Editar aqui caso haja mudança de animações (responsável por skipar animação caso tenha sido há mais do tempo de finalização) */
        if (alreadyEnded) {
          return (wheelRef.current.style.transform = ' translateX(-7320px)');
        }

        setTimeout(() => {
          wheelRef.current.classList.add('start');
        }, TimerTime);

        /* Remove a animação para começar a próxima do próximo vencedor */
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setTimeout(() => {}, 5000);
      });
    } else {
      wheelRef.current.classList.remove('start');
      const avatarsOrder = renderPlayers.normalRender();
      setRenderedAvatars(getJSXAvatars(avatarsOrder));
    }
  };

  useEffect(() => {
    renderAvatars();
  }, [finishedAt, bets]);

  return (
    <WheelContainer>
      {!alreadyEnded && <PreRollScreen raffleInfo={info} raffleFinishedAt={finishedAt} />}

      {finishedAt && <WheelPointer $jackpotFinished={finishedAt ? true : false} />}
      <AvatarsContainer ref={wheelRef}>{renderedAvatars}</AvatarsContainer>
    </WheelContainer>
  );
}
