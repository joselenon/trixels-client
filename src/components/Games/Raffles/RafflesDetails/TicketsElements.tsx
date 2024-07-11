import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { useScreenConfig } from '../../../../contexts/ScreenConfigContext';
import { IBuyRaffleTicketsPayload } from '../../../../interfaces/IBet';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import CurrencyIconAndAmountMEDIUM from '../../../CurrencyIconAndAmount';
import TrixelsCheckbox from '../../../TrixelsCheckbox';
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
  justify-content: flex-end;
  align-items: center;
`;

const GraySquare = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--default-middlegrey);
`;

const RandomTicketContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const BuyContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

interface ITicketsElementsProps {
  raffle: IRaffleToFrontEndTreated;
}

export default function TicketsElements({ raffle }: ITicketsElementsProps) {
  const gameId = raffle.gameId;
  const { totalTickets, ticketPrice } = raffle.info;

  const { width } = useScreenConfig();

  const [buyRaffleTicketsPayload, setBuyRaffleTicketPayload] = useState<IBuyRaffleTicketsPayload>({
    gameId,
    info: {
      randomTicket: false,
      quantityOfTickets: 0,
      ticketNumbers: [],
    },
  });
  const [ticketsElementsRendered, setTicketsElementsRendered] = useState<JSX.Element[]>([]);

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
          buyRaffleTicketsPayloadState={{ buyRaffleTicketsPayload, setBuyRaffleTicketPayload }}
        />
      );
    });

    const graySquares = getGreySquares();

    return [...ticketElements, ...graySquares];
  };

  const handleRandomTicketChange = () => {
    setBuyRaffleTicketPayload((prev) => {
      return {
        ...prev,
        info: {
          ...prev.info,
          ticketNumbers: [],
          randomTicket: !prev.info.randomTicket,
        },
      };
    });
  };

  useEffect(() => {
    setTicketsElementsRendered(renderTicketsElements());
  }, [raffle, buyRaffleTicketsPayload, width]);

  return (
    <TicketsElementContainer>
      <BuyContainer>
        <RandomTicketContainer>
          <TrixelsCheckbox checked={buyRaffleTicketsPayload.info.randomTicket} onChange={handleRandomTicketChange} />
          <h5>Random</h5>
        </RandomTicketContainer>

        <BuyRaffleTicketButton
          buyRaffleTicketsPayloadState={{ buyRaffleTicketsPayload, setBuyRaffleTicketPayload }}
          ticketPrice={ticketPrice}
          raffle={raffle}
        />
      </BuyContainer>

      <TicketPriceContainer>
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', paddingRight: '.5rem' }}>
          <CurrencyIconAndAmountMEDIUM theme="white" amount={ticketPrice} fontSize="medium" />
          <h5>/ea</h5>
        </div>
      </TicketPriceContainer>

      <TicketsContainer>{ticketsElementsRendered}</TicketsContainer>
    </TicketsElementContainer>
  );
}
