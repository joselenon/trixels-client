import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React from 'react';
import styled from 'styled-components';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useGetAvailableItems from '../../../hooks/useGetAvailableItems';
import { TRaffleWinnerPrizes, TRaffleWinnersPrizes } from '../../../interfaces/IRaffles';
import PrizeX from './PrizeX';
import WinnerXPrizesElement from './WinnerXPrizesElement';

const RWPCAContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  img {
    width: 80px;
    height: 80px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }

  .mySwiper.winners {
    .swiper-pagination-bullets {
      display: none;
    }
  }
  .mySwiper.prizes {
    .swiper-pagination-bullets {
      display: block;
    }
  }
`;

const WinnersContainer = styled.div``;

const PrizeXContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

interface IRaffleWinnersPrizesCarouselAutoProps {
  winnersPrizes: TRaffleWinnersPrizes;
}

export default function RaffleWinnersPrizesCarouselAuto({ winnersPrizes }: IRaffleWinnersPrizesCarouselAutoProps) {
  const renderAllWinnerXPrizes = (winnerXPrizes: TRaffleWinnerPrizes) => {
    return <WinnerXPrizesElement winnerXPrizes={winnerXPrizes} />;
  };

  const renderAllWinners = () => {
    if (winnersPrizes) {
      const winnersKeys = Object.keys(winnersPrizes);
      const winnersSlides = winnersKeys.map((winnerX, i) => {
        const winnerXPrizes = winnersPrizes[winnerX];
        const winnerXPrizesElements = renderAllWinnerXPrizes(winnerXPrizes);

        return (
          <SwiperSlide key={i}>
            <WinnersContainer>
              <div style={{ background: 'var(--default-blue)' }}>
                <h5 style={{ color: 'white' }}>{i + 1}st</h5>
              </div>
              {winnerXPrizesElements}
            </WinnersContainer>
          </SwiperSlide>
        );
      });

      return winnersSlides;
    }
  };

  return (
    <RWPCAContainer>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper winners"
      >
        {renderAllWinners()}
      </Swiper>
    </RWPCAContainer>
  );
}
