import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { useScreenConfig } from '../../../../contexts/ScreenConfigContext';
import { IBuyRaffleTicketsPayload } from '../../../../interfaces/IBet';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import CurrencyIconAndAmountMEDIUM from '../../../CurrencyIconAndAmount';
import BuyRaffleTicketButton from './BuyRaffleTicketButton';
import TicketElement from './TicketElement';

const TicketsElementContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  flex: 438px;
`;

const TicketsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, 80px);
  justify-content: space-between;
`;

const TicketPriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BuyButtonAndTicketPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const GraySquare = styled.div`
  width: 80px;
  height: 80px;
  background-color: #dddddd; /* Cor cinza */
`;

interface ITicketsElementsProps {
  raffle: IRaffleToFrontEndTreated;
}

export default function TicketsElements({ raffle }: ITicketsElementsProps) {
  const gameId = raffle.gameId;
  const { totalTickets, ticketPrice } = raffle.info;

  const { width } = useScreenConfig();

  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [ticketsElementsRendered, setTicketsElementsRendered] = useState<JSX.Element[]>([]);

  const buyRaffleTicketsPayload: IBuyRaffleTicketsPayload = {
    gameId,
    info: {
      randomTicket: false,
      quantityOfTickets: selectedTickets.length,
      ticketNumbers: selectedTickets,
    },
  };

  const getGreySquares = () => {
    const gapSize = 16;
    const pageContentContainerWidth = width - gapSize * 2 > 1368 ? 1368 : width - gapSize * 2;

    const howManySquaresFitsOnScreen = Math.floor((pageContentContainerWidth + gapSize) / (80 + gapSize));
    const howManySquaresWeNeed = totalTickets;

    let relationNeededAndScreen = howManySquaresWeNeed / howManySquaresFitsOnScreen;

    const graySquares = [];

    let i = 0;
    while (!Number.isInteger(relationNeededAndScreen)) {
      i++;
      graySquares.push(<GraySquare key={`gray-${i}`} />);
      relationNeededAndScreen = (howManySquaresWeNeed + i) / howManySquaresFitsOnScreen;
    }

    return graySquares;
  };

  const renderTicketsElements = () => {
    const ticketElements = Array.from({ length: totalTickets }, (_, i) => {
      const ticketNumber = i + 1;
      return (
        <TicketElement
          key={ticketNumber}
          ticketNumber={ticketNumber}
          raffle={raffle}
          ticketsSelection={{ selectedTickets, setSelectedTickets }}
        />
      );
    });

    const graySquares = getGreySquares();

    return [...ticketElements, ...graySquares];
  };

  useEffect(() => {
    setTicketsElementsRendered(renderTicketsElements());
  }, [raffle, selectedTickets, width]);

  return (
    <TicketsElementContainer>
      <BuyButtonAndTicketPrice>
        <TicketPriceContainer>
          <CurrencyIconAndAmountMEDIUM theme="default" amount={ticketPrice} />
          <h5>/ea</h5>
        </TicketPriceContainer>

        <BuyRaffleTicketButton
          buyRaffleTicketsPayload={buyRaffleTicketsPayload}
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
          ticketPrice={ticketPrice}
        />
      </BuyButtonAndTicketPrice>

      <TicketsContainer>{ticketsElementsRendered}</TicketsContainer>
    </TicketsElementContainer>
  );
}
