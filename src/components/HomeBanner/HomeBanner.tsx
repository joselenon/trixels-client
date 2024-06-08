import React from 'react';
import styled from 'styled-components';

import pixel from '../../assets/images/cur_pixel_custom.png';
import pixel_on_the_table from '../../assets/images/pixel_on_the_table.png';
import { useScreenConfig } from '../../contexts/ScreenConfigContext';
import Reveal from '../Reveal';
import HomeBannerVertical from './HomeBannerVertical';
import InAPixelatedUniverse from './InAPixelatedUniverse';
import WelcomeToTrixelsXyz from './WelcomeToTrixelsXyz';
import YourLuck from './YourLuck';

const FallingPixel = styled.div`
  position: absolute;
  background: url(${pixel}) no-repeat center center;
  background-size: cover;
  animation: fallAnimation linear infinite;

  width: ${(props) => `${Math.random() * 30 + 10}px`};
  height: ${(props) => `${Math.random() * 30 + 10}px`};
  z-index: 1; /* Adicionado z-index para os FallingPixels */

  @keyframes fallAnimation {
    0% {
      transform: translateY(-200px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(800px) rotate(360deg);
      opacity: 0.5;
    }
  }
`;

const HomeBannerContainer = styled.div<{ $displayHeight: number }>`
  background: linear-gradient(180deg, #86d9f8 30%, var(--primary-bg-color) 100%);

  width: 100%;
  height: ${({ $displayHeight }) => `${$displayHeight}px`};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  position: relative;
`;

const TextElementsContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PixelAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  img {
    image-rendering: pixelated;
  }
`;

export default function HomeBanner() {
  const { width, height } = useScreenConfig();

  return (
    <HomeBannerContainer $displayHeight={height}>
      <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '100%' }}>
        {/* Adicionando vários diamantes caindo */}
        {[...Array(10)].map((_, index) => (
          <FallingPixel
            key={index}
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 10 + 2}s`,
            }}
          />
        ))}
      </div>

      <Reveal>
        {width > 740 ? (
          <TextElementsContainer>
            <PixelAbsolute>
              <img width={50} src={pixel_on_the_table} alt="" />
            </PixelAbsolute>

            <WelcomeToTrixelsXyz />
            <YourLuck />
            <InAPixelatedUniverse />
          </TextElementsContainer>
        ) : (
          <HomeBannerVertical />
        )}
      </Reveal>
    </HomeBannerContainer>
  );
}
