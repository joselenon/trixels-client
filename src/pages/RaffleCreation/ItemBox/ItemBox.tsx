import React from 'react';
import { styled } from 'styled-components';

import itemsInfo from '../../../config/itemsInfo';
import { useAvailableItemsContext } from '../../../contexts/ItemsAvailableContext';
import { useRaffleCreationContext } from '../../../contexts/RaffleCreationContext';
import { TRaffleCreationItem } from '../../../interfaces/IRaffleCreation';
import BerryIconAndAmount from '../../../components/CurrencyIconAndAmount';
import TrixelsButton from '../../../components/TrixelsButton';

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
  border-radius: var(--default-br);

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

const SumSubButtons = styled.div`
  width: 40px;
`;

interface IItemBoxProps {
  item: TRaffleCreationItem;
  winnerIndex: number;
}

export default function ItemBox({ item, winnerIndex }: IItemBoxProps) {
  const { setWinnerPrize } = useRaffleCreationContext();
  const availableItems = useAvailableItemsContext();
  const { itemId, quantity } = item;

  return (
    <ItemContainer>
      {<img src={itemsInfo[itemId].icon} alt={`${itemId}-img`} />}
      <TitleContainer>
        <h4>{itemId}</h4>
      </TitleContainer>

      <BerryIconAndAmount
        theme="default"
        currency="PIXEL"
        amount={availableItems ? availableItems[item.itemId].price : 0}
      />

      {quantity > 0 ? (
        <QuantitySelectionContainer>
          <SumSubButtons>
            <TrixelsButton
              label="-"
              btnType="BLUE"
              attributes={{ onClick: () => setWinnerPrize(winnerIndex, { itemId, action: 'sub' }) }}
            />
          </SumSubButtons>

          <h4>{quantity}</h4>

          <SumSubButtons>
            <TrixelsButton
              label="+"
              btnType="BLUE"
              attributes={{ onClick: () => setWinnerPrize(winnerIndex, { itemId, action: 'add' }) }}
            />
          </SumSubButtons>
        </QuantitySelectionContainer>
      ) : (
        <div style={{ width: '100%' }}>
          <TrixelsButton
            label="Add"
            btnType="BLUE"
            attributes={{ onClick: () => setWinnerPrize(winnerIndex, { itemId, action: 'add' }) }}
          />
        </div>
      )}
    </ItemContainer>
  );
}
