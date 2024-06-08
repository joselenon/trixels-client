import React from 'react';
import { styled } from 'styled-components';

import pixel_on_the_table from '../../assets/images/pixel_on_the_table.png';
import InAPixelatedUniverseVertical from './InAPixelatedUniverseVertical';
import WelcomeToTrixelsXyzVertical from './WelcomeToTrixelsXyzVertical';
import YourLuckVertical from './YourLuckVertical';

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
  transform: translateX(170px);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    image-rendering: pixelated;
  }
`;

export default function HomeBannerVertical() {
  return (
    <TextElementsContainer>
      {/* <PixelAbsolute>
        <img width={50} src={pixel_on_the_table} alt="" />
      </PixelAbsolute> */}

      <WelcomeToTrixelsXyzVertical />
      <YourLuckVertical />
      <InAPixelatedUniverseVertical />
    </TextElementsContainer>
  );
}
