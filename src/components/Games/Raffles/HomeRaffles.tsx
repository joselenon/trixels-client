import 'swiper/css';
import 'swiper/css/effect-cards';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useGetRaffles from '../../../hooks/useGetRaffles';
import RaffleBox from './RaffleBox';

const HomeRafflesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;

  .swiper {
    width: 320px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TextsContainer = styled.div`
  height: 100%;
  display: flex;
  text-align: center;
  flex: 800px;
`;

const SwiperContainer = styled.div`
  padding: 0 60px;
`;

export default function HomeRaffles() {
  const { updatedRaffles } = useGetRaffles();

  const [aRafflesElements, setARafflesElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (updatedRaffles) {
      const { activeRaffles } = updatedRaffles;

      activeRaffles.sort((raffle1, raffle2) => raffle2.createdAt - raffle1.createdAt);
      const aRaffles = activeRaffles.map((raffle) => <RaffleBox key={raffle.gameId} raffleInfo={raffle} />);
      setARafflesElements(aRaffles);
    }
  }, [updatedRaffles]);

  return (
    <HomeRafflesContainer>
      <TextsContainer>
        <h2>Have you checked all active raffles?</h2>
      </TextsContainer>

      <SwiperContainer>
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
          {aRafflesElements.map((aRaffleElement, index) => (
            <SwiperSlide key={index}>{aRaffleElement}</SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </HomeRafflesContainer>
  );
}
