import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { raffleAnimationAlreadyEndedFn } from '../../../../config/app/RaffleConfig';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import UserAvatarElement from '../../../UserAvatarElement';

interface ITicketContainerProps {
  $isWinner: boolean | undefined;
  $isSelected: boolean;
  $alreadyEnded: boolean;
}

const TicketContainer = styled.div<ITicketContainerProps>`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--default-blue);
  border: ${({ $isWinner, $isSelected, $alreadyEnded }) => {
    if ($isWinner && $alreadyEnded) return '4px solid var(--default-green)';
    if ($isSelected) return '4px solid var(--default-yellow)';
    return 'none';
  }};
  transition: all 0.05s;
  overflow: hidden;

  h3 {
    color: white;
  }

  &:hover {
    cursor: pointer;
    background: var(--default-darkblue);
  }
`;

const AbsoluteAvatarContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    transition: all 0.1s;
    opacity: 0.5;
    width: 80px;
    height: 80px;
  }

  &:hover {
    img {
      opacity: 1;
    }
  }
`;

interface ITicketElementProps {
  ticketNumber: number;
  ticketsSelection: {
    selectedTickets: number[];
    setSelectedTickets: React.Dispatch<React.SetStateAction<number[]>>;
  };
  raffle: IRaffleToFrontEndTreated;
}

export default function TicketElement({ ticketNumber, raffle, ticketsSelection }: ITicketElementProps) {
  const { selectedTickets, setSelectedTickets } = ticketsSelection;

  const { finishedAt, info } = raffle;
  const { bets, winnersBetsInfo } = info;

  const { alreadyEnded, timeLeft } = raffleAnimationAlreadyEndedFn(finishedAt);

  const getBetOwnerPhoto = (ticketNumber: number): string | undefined => {
    const bet = bets.find((bet) => bet.info.tickets.includes(ticketNumber));
    return bet ? bet.userRef.avatar : undefined;
  };

  const betterAvatar = getBetOwnerPhoto(ticketNumber);

  const checkIfNumberIsAWinner = (ticketNumber: number) => {
    if (!winnersBetsInfo) return false;
    return winnersBetsInfo.some((winnerBet) => {
      return winnerBet.drawnNumber === ticketNumber;
    });
  };

  const handleTicketClick = (ticketNumber: number) => {
    /* Arrumar isso daqui */
    if (bets.some((bet) => bet.info.tickets.includes(ticketNumber))) {
      return console.log('Abrir info do jogador, ou ir para perfil');
    }

    setSelectedTickets((prev) => {
      if (prev.includes(ticketNumber)) {
        return prev.filter((ticketAdded) => ticketAdded !== ticketNumber);
      }
      return [...prev, ticketNumber];
    });
  };

  const TicketRef = useRef<any>(undefined);

  useEffect(() => {
    const { alreadyEnded, timeLeft } = raffleAnimationAlreadyEndedFn(finishedAt);
    if (!alreadyEnded && checkIfNumberIsAWinner(ticketNumber) && timeLeft) {
      setTimeout(() => {
        TicketRef.current.style.border = '4px solid var(--default-green)';
      }, timeLeft + 2000);
    }
  }, [finishedAt]);

  return (
    <TicketContainer
      onClick={() => handleTicketClick(ticketNumber)}
      key={ticketNumber}
      $isSelected={selectedTickets.includes(ticketNumber)}
      $isWinner={checkIfNumberIsAWinner(ticketNumber)}
      $alreadyEnded={alreadyEnded}
      ref={TicketRef}
    >
      <h3>{ticketNumber}</h3>

      <AbsoluteAvatarContainer>{betterAvatar && <UserAvatarElement url={betterAvatar} />}</AbsoluteAvatarContainer>
    </TicketContainer>
  );
}
