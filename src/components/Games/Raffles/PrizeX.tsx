import React from 'react';
import { styled } from 'styled-components';

import useGetAvailableItems from '../../../hooks/useGetAvailableItems';
import { TRafflePrizeX } from '../../../interfaces/IRaffles';

const PrizeXContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 37.5px !important;
    height: 37.5px !important;
  }
`;

interface IPrizeXProps {
  prizeInfo: TRafflePrizeX;
}

export default function PrizeX({ prizeInfo }: IPrizeXProps) {
  const { availableItems } = useGetAvailableItems();

  const { prizeId, quantity } = prizeInfo;

  const itemImage = availableItems && availableItems[prizeId].img;

  return (
    <PrizeXContainer>
      <img className="pixelated" src={itemImage} alt={`${prizeId}-icon`} />
      <h5>x{quantity}</h5>
    </PrizeXContainer>
  );
}
