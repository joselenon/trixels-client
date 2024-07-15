import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { raffleAnimationAlreadyEndedFn } from '../../../../config/app/RaffleConfig';
import { IBuyRaffleTicketsPayload } from '../../../../interfaces/IBet';
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
  width: 100%;
  height: 100%;

  img {
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
  buyRaffleTicketsPayloadState: {
    buyRaffleTicketsPayload: IBuyRaffleTicketsPayload;
    setBuyRaffleTicketPayload: React.Dispatch<React.SetStateAction<IBuyRaffleTicketsPayload>>;
  };
  raffle: IRaffleToFrontEndTreated;
}

export default function TicketElement({ ticketNumber, raffle, buyRaffleTicketsPayloadState }: ITicketElementProps) {
  const { buyRaffleTicketsPayload, setBuyRaffleTicketPayload } = buyRaffleTicketsPayloadState;

  const { finishedAt, info } = raffle;
  const { bets, winnersBetsInfo } = info;

  const { alreadyEnded } = raffleAnimationAlreadyEndedFn(finishedAt);

  const getBetterUsernameAndAvatar = (ticketNumber: number): { username: string; avatar: string } | undefined => {
    const bet = bets.find((bet) => bet.info.tickets.includes(ticketNumber));
    return bet ? { username: bet.userRef.username, avatar: bet.userRef.avatar } : undefined;
  };

  const betterUsernameAndAvatar = getBetterUsernameAndAvatar(ticketNumber);

  const checkIfNumberIsAWinner = (ticketNumber: number) => {
    if (!winnersBetsInfo) return false;
    return winnersBetsInfo.some((winnerBet) => {
      return winnerBet.drawnNumber === ticketNumber;
    });
  };

  const handleTicketClick = (ticketNumber: number) => {
    if (bets.some((bet) => bet.info.tickets.includes(ticketNumber))) {
      return;
    }

    setBuyRaffleTicketPayload((prev) => {
      const selectedTicketNumbers = prev.info.ticketNumbers;
      if (selectedTicketNumbers.includes(ticketNumber)) {
        const updatedSelectedTicketNumbers = selectedTicketNumbers.filter(
          (ticketAdded) => ticketAdded !== ticketNumber,
        );

        return { ...prev, info: { ...prev.info, randomTicket: false, ticketNumbers: updatedSelectedTicketNumbers } };
      }
      return {
        ...prev,
        info: { ...prev.info, randomTicket: false, ticketNumbers: [...selectedTicketNumbers, ticketNumber] },
      };
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
      $isSelected={buyRaffleTicketsPayload.info.ticketNumbers.includes(ticketNumber)}
      $isWinner={checkIfNumberIsAWinner(ticketNumber)}
      $alreadyEnded={alreadyEnded}
      ref={TicketRef}
    >
      <h3>{ticketNumber}</h3>

      {/* FIX */}
      <AbsoluteAvatarContainer>
        {betterUsernameAndAvatar && (
          <UserAvatarElement
            userInfo={{ username: betterUsernameAndAvatar?.username, url: betterUsernameAndAvatar?.avatar }}
            clickable={true}
          />
        )}
      </AbsoluteAvatarContainer>
    </TicketContainer>
  );
}
