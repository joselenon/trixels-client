import 'swiper/css';
import 'swiper/css/effect-cards';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useRafflesContext } from '../../../contexts/RafflesContext';
import RaffleBox from './RaffleBox';

const HomeRafflesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  .swiper {
    width: 100%;
    max-width: 300px;
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
  flex-direction: column;
  text-align: center;
  max-width: 800px;

  h2 {
    font-size: 40px;

    @media (max-width: 800px) {
      font-size: 40px;
    }

    @media (max-width: 700px) {
      font-size: 30px;
    }

    @media (max-width: 600px) {
      font-size: 26px;
    }

    @media (max-width: 500px) {
      font-size: 22px;
    }

    @media (max-width: 350px) {
      white-space: normal;
    }
  }
`;

const SwiperContainer = styled.div``;

export default function HomeRaffles() {
  const { activeRaffles } = useRafflesContext();

  const [aRafflesElements, setARafflesElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (activeRaffles) {
      activeRaffles.sort((raffle1, raffle2) => raffle2.createdAt - raffle1.createdAt);
      const aRaffles = activeRaffles.map((raffle) => (
        <RaffleBox width="100%" key={raffle.gameId} raffleInfo={raffle} />
      ));
      setARafflesElements(aRaffles);
    }
  }, [activeRaffles]);

  return (
    <HomeRafflesContainer>
      <TextsContainer>
        <h2>Have you checked all</h2>
        <h2>active raffles?</h2>
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
