import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TRaffleWinnerPrizes } from '../../../interfaces/IRaffles';
import PrizeX from './PrizeX';

interface IWinnerPrizeElementProps {
  prize: TRaffleWinnerPrizes;
}

export default function WinnerPrizeElement({ prize }: IWinnerPrizeElementProps) {
  const WinnerPrizeElements = prize.items.map((prizeX, i) => {
    return (
      <SwiperSlide key={i}>
        <PrizeX prizeInfo={prizeX} />
      </SwiperSlide>
    );
  });

  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper prizes">
      {WinnerPrizeElements}
    </Swiper>
  );
}
