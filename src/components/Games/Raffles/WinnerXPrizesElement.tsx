import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TRaffleWinnerPrizes } from '../../../interfaces/IRaffles';
import PrizeX from './PrizeX';

interface IWinnerXPrizesElementProps {
  winnerXPrizes: TRaffleWinnerPrizes;
}

export default function WinnerXPrizesElement({ winnerXPrizes }: IWinnerXPrizesElementProps) {
  const winnerXPrizesInfoKeys = Object.keys(winnerXPrizes['info']);

  const winnerXPrizesElements = winnerXPrizesInfoKeys.map((prizeX, i) => {
    return (
      <SwiperSlide key={i}>
        <PrizeX prizeInfo={winnerXPrizes['info'][prizeX]} />
      </SwiperSlide>
    );
  });

  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper prizes">
      {winnerXPrizesElements}
    </Swiper>
  );
}
