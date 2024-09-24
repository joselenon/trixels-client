import React from 'react';
import { styled } from 'styled-components';

import { useAvailableItemsContext } from '../../../contexts/ItemsAvailableContext';
import { TPrizeItem } from '../../../interfaces/IRaffles';

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

export default function PrizeX({ prizeInfo }: { prizeInfo: TPrizeItem }) {
  const availableItems = useAvailableItemsContext();

  const { itemId, quantity } = prizeInfo;
  const itemImage = availableItems && availableItems[itemId].img;

  return (
    <PrizeXContainer>
      <img className="pixelated" src={itemImage} alt={`${itemImage}-icon`} />
      <h5>x{quantity}</h5>
    </PrizeXContainer>
  );
}
