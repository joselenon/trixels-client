import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import useBuyTickets from '../../../../hooks/useBuyTickets';
import { IBuyRaffleTicketsPayload } from '../../../../interfaces/IBet';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import CurrencyIconAndAmountMEDIUM from '../../../CurrencyIconAndAmount';
import TrixelsButton from '../../../TrixelsButton';
import TicketElement from './TicketElement';

const TicketsElementContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  flex: 438px;
`;

const TicketsContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(12, 1fr);

  @media (max-width: 1250px) {
    grid-template-columns: repeat(10, 1fr);
  }
  @media (max-width: 970px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 390px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TicketPriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BuyButtonAbsolute = styled.div``;

interface ITicketsElementsProps {
  raffle: IRaffleToFrontEndTreated;
}

export default function TicketsElements({ raffle }: ITicketsElementsProps) {
  const gameId = raffle.gameId;
  const { totalTickets, ticketPrice } = raffle.info;

  const buyTicketsFn = useBuyTickets();

  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [ticketsElementsRendered, setTicketsElementsRendered] = useState<JSX.Element[]>([]);

  const selectedTicketsTotalPrice = selectedTickets.length * ticketPrice;
  const buyRaffleTicketsPayload: IBuyRaffleTicketsPayload = {
    gameId,
    info: {
      randomTicket: false,
      quantityOfTickets: selectedTickets.length,
      ticketNumbers: selectedTickets,
    },
  };

  const renderTicketsElements = () =>
    Array.from({ length: totalTickets }, (_, i) => {
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

  useEffect(() => {
    setTicketsElementsRendered(renderTicketsElements());
  }, [raffle, selectedTickets]);

  const handleBuyTickets = async (buyRaffleTicketsPayload: IBuyRaffleTicketsPayload) => {
    const res = await buyTicketsFn(buyRaffleTicketsPayload);
    if (res?.success) {
      setSelectedTickets([]);
    }
  };

  return (
    <TicketsElementContainer>
      <BuyButtonAbsolute>
        <TrixelsButton
          btnType="CTA"
          label={`Buy (${selectedTicketsTotalPrice.toFixed(8)})`}
          attributes={{ onClick: () => handleBuyTickets(buyRaffleTicketsPayload) }}
        />
      </BuyButtonAbsolute>

      <TicketPriceContainer>
        <CurrencyIconAndAmountMEDIUM amount={ticketPrice} />
        <h5>/ea</h5>
      </TicketPriceContainer>

      <TicketsContainer>{ticketsElementsRendered}</TicketsContainer>
    </TicketsElementContainer>
  );
}
