import 'swiper/css';
import 'swiper/css/effect-cards';

import React from 'react';
import styled from 'styled-components';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import RaffleBox from './RaffleBox';

const HomeRafflesContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const SwiperContainer = styled.div`
  padding: 0 60px;
`;

export default function HomeRaffles() {
  return (
    <HomeRafflesContainer>
      <TextsContainer>
        <h2>Have you checked all active raffles?</h2>
      </TextsContainer>

      <SwiperContainer>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <RaffleBox />
          </SwiperSlide>

          <SwiperSlide>
            <RaffleBox />
          </SwiperSlide>

          <SwiperSlide>
            <RaffleBox />
          </SwiperSlide>

          <SwiperSlide>
            <RaffleBox />
          </SwiperSlide>

          <SwiperSlide>
            <RaffleBox />
          </SwiperSlide>

          <SwiperSlide>
            <RaffleBox />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>
    </HomeRafflesContainer>
  );
}
