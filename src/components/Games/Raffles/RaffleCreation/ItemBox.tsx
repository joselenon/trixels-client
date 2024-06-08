import React from 'react';
import { styled } from 'styled-components';

import { TItemInfos } from '../../../../contexts/ItemsAvailableContext';
import { THandleItemClickFn } from '../../../../pages/RaffleCreation';
import BerryIconAndAmount from '../../../CurrencyIconAndAmount';
import TrixelsButton from '../../../TrixelsButton';

const ItemContainer = styled.div`
  position: relative; // Adicionando posição relativa para posicionamento absoluto dentro deste container
  background-color: var(--secondary-bg-color);
  width: 100%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 20px;

  img {
    image-rendering: pixelated;
    width: 60px;
    height: 60px;
  }

  .absolute-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;
`;

const QuantitySelectionContainer = styled.div`
  background: var(--primary-bg-color);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

interface IItemBoxProps {
  itemInfos: TItemInfos;
  quantity?: number;
  handleItemClick: THandleItemClickFn;
}

export default function ItemBox({ itemInfos, quantity = 0, handleItemClick }: IItemBoxProps) {
  const { id, img, name, price } = itemInfos;

  return (
    <ItemContainer>
      <img src={img} alt={`${name}-img`} />
      <TitleContainer>
        <h4>{name}</h4>
      </TitleContainer>

      <BerryIconAndAmount theme="default" currency="PIXEL" amount={price} />

      {quantity > 0 ? (
        <QuantitySelectionContainer>
          <TrixelsButton label="-" btnType="BLUE" attributes={{ onClick: () => handleItemClick(id, 'remove') }} />
          <h4>{quantity}</h4>
          <TrixelsButton label="+" btnType="BLUE" attributes={{ onClick: () => handleItemClick(id, 'add') }} />
        </QuantitySelectionContainer>
      ) : (
        <div style={{ width: '100%' }}>
          <TrixelsButton label="Add" btnType="CTA" attributes={{ onClick: () => handleItemClick(id, 'add') }} />
        </div>
      )}
    </ItemContainer>
  );
}
