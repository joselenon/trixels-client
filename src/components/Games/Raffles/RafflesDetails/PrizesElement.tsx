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
  padding: 10px;
  display: flex;
  align-items: center;
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
  width: 120px;
  background: #fff;
  padding: 15px;
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
  slidesPerView: number;
}

export default function Prizes({ prizes, slidesPerView }: IPrizesElementProps) {
  const winnersKeys = Object.keys(prizes);

  const renderWinnerPrizesElement = () => {
    return winnersKeys.map((winnerKey) => {
      const winnerPrizes = prizes[winnerKey];

      return (
        <div key={winnerKey}>
          <SwiperSlide key={winnerKey}>
            <WinnerPrizes>
              <div style={{ textAlign: 'center', marginBottom: 15 }}>
                <h5>{winnerKey}</h5>
              </div>

              <WinnerXPrizesElement winnerXPrizes={winnerPrizes} />

              <PrizeAmountContainer>
                <CurrencyIconAndAmount theme="default" fontSize="small" amount={winnerPrizes.totalValue} />
              </PrizeAmountContainer>
            </WinnerPrizes>
          </SwiperSlide>

          <SwiperSlide key={winnerKey + 'clone'}>
            <WinnerPrizes>
              <div style={{ textAlign: 'center', marginBottom: 15 }}>
                <h5>{winnerKey}</h5>
              </div>

              <WinnerXPrizesElement winnerXPrizes={winnerPrizes} />

              <PrizeAmountContainer>
                <CurrencyIconAndAmount theme="default" fontSize="small" amount={winnerPrizes.totalValue} />
              </PrizeAmountContainer>
            </WinnerPrizes>
          </SwiperSlide>
        </div>
      );
    });
  };

  return (
    <WinnersPrizesElementContainer>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {renderWinnerPrizesElement()}
      </Swiper>
    </WinnersPrizesElementContainer>
  );
}
