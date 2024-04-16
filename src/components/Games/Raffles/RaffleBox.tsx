import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useGetAvailableItems from '../../../hooks/useGetAvailableItems';
import { IRaffleToFrontEndTreated } from '../../../interfaces/IRaffles';
import { TruncatedText } from '../../../styles/GlobalStyles';
import BerryIconAndAmount from '../../CurrencyIconAndAmount';
import TrixelsButton from '../../TrixelsButton';
import RaffleWinnersPrizesCarouselAuto from './RaffleWinnersPrizesCarouselAuto';

const RaffleBoxContainer = styled.div`
  user-select: none;
  background: white;
  width: 320px;
  padding: var(--default-pdn);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    image-rendering: pixelated;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  span {
    color: var(--default-grey);
  }
`;

const TicketsAndPriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;

  h3 {
    color: var(--default-blue);
  }
`;

const TicketsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.25rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.25rem;
`;

const ViewAndBuyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;

  a {
    width: 100%;
  }

  span {
    font-size: 12px;
    font-weight: 800;
  }

  button {
    height: 100%;
  }
`;

const ViewContainer = styled.div`
  background: var(--primary-bg-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const BuyContainer = styled.div`
  display: flex;
  white-space: nowrap;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 12px;
    color: var(--default-grey);
  }
`;

export default function RaffleBox({ raffleInfo }: { raffleInfo: IRaffleToFrontEndTreated }) {
  const { createdAt, info, gameId, description } = raffleInfo;

  const { prizes, totalTickets, ticketPrice, prizesTotalValue } = info;

  const totalTicketsBought = info.bets.reduce((acc, bet) => {
    const { tickets } = bet.info;
    return acc + tickets.length;
  }, 0);

  return (
    <RaffleBoxContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="https://avatars.cloudflare.steamstatic.com/f7f5f5bab2c11f600daa99e84b9164057808620f_full.jpg"
            alt=""
            width={40}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'end',
          }}
        >
          <h5>Prize</h5>
          <BerryIconAndAmount amount={prizesTotalValue} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <RaffleWinnersPrizesCarouselAuto winnersPrizes={prizes} />
      </div>

      <DetailsContainer>
        <TitleContainer>
          <TruncatedText>
            <h3 style={{ width: 260 }}>{description}</h3>
          </TruncatedText>
        </TitleContainer>

        <TicketsAndPriceContainer>
          <TicketsContainer>
            <h5>Tickets</h5>
            <h3>{`${totalTickets - totalTicketsBought}/${totalTickets}`}</h3>
          </TicketsContainer>

          <PriceContainer>
            <h5>Price /ea</h5>
            <BerryIconAndAmount amount={ticketPrice} />
          </PriceContainer>
        </TicketsAndPriceContainer>

        <ViewAndBuyContainer>
          <Link to={`/raffle/${gameId}`}>
            <ViewContainer>
              <h4>View raffle</h4>
              <span>{totalTickets - totalTicketsBought} Players Left</span>
            </ViewContainer>
          </Link>

          <BuyContainer>
            <TrixelsButton btnType="CTA" label={'Buy 1'} />
          </BuyContainer>
        </ViewAndBuyContainer>

        <DateContainer>
          <span>{new Date(createdAt).toLocaleString()}</span>
        </DateContainer>
      </DetailsContainer>
    </RaffleBoxContainer>
  );
}
