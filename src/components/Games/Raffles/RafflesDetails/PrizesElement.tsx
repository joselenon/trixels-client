import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import React from 'react';
import { styled } from 'styled-components';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TRaffleWinnersPrizes } from '../../../../interfaces/IRaffles';
import CurrencyIconAndAmount from '../../../CurrencyIconAndAmount';
import WinnerXPrizesElement from '../WinnerXPrizesElement';

const WinnersPrizesElementContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  user-select: none;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WinnerPrizes = styled.div`
  width: 150px;
  background: #fff;
  padding: var(--default-pdn);
  transition: all 0.05s;
  &:hover {
    box-shadow: inset 0px 0px 0px 5px var(--default-grey);
  }
`;

const PrizeAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

interface IPrizesElementProps {
  prizes: TRaffleWinnersPrizes;
  prizesTotalValue: number;
}

export default function Prizes({ prizes, prizesTotalValue }: IPrizesElementProps) {
  const winnersKeys = Object.keys(prizes);

  const renderWinnerPrizesElement = (winnerKey: string) => {
    const winnerPrizes = prizes[winnerKey];

    return (
      <SwiperSlide key={winnerKey}>
        <WinnerPrizes key={winnerKey}>
          <div style={{ textAlign: 'center', marginBottom: 15 }}>
            <h5>{winnerKey}</h5>
          </div>

          <WinnerXPrizesElement winnerXPrizes={winnerPrizes} />

          <PrizeAmountContainer>
            <CurrencyIconAndAmount fontSize="small" amount={winnerPrizes.totalValue} />
          </PrizeAmountContainer>
        </WinnerPrizes>
      </SwiperSlide>
    );
  };

  return (
    <WinnersPrizesElementContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'end',
        }}
      >
        <h5>Prize</h5>
        <CurrencyIconAndAmount amount={prizesTotalValue} />
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {winnersKeys.map((winnerKey) => renderWinnerPrizesElement(winnerKey))}
      </Swiper>
    </WinnersPrizesElementContainer>
  );
}
