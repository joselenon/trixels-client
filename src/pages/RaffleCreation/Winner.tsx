import React from 'react';
import { styled } from 'styled-components';

import FakeItemBox from './ItemBox/FakeItemBox';
import ItemBox from './ItemBox/ItemBox';
import { useAvailableItemsContext } from '../../contexts/ItemsAvailableContext';
import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';

const WinnerPrizesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemsAddedContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function Winner({ winnerIndex }: { winnerIndex: number }) {
  const { raffleConfig } = useRaffleCreationContext();
  const availableItems = useAvailableItemsContext();

  return (
    <>
      <WinnerPrizesContainer key={winnerIndex}>
        <h3>Winner {winnerIndex + 1}</h3>

        <ItemsAddedContainer>
          {availableItems &&
            raffleConfig.prizes[winnerIndex].items.map((item, i) => {
              return (
                <div key={i}>
                  <ItemBox winnerIndex={winnerIndex} item={item} />
                </div>
              );
            })}

          <FakeItemBox winnerIndex={winnerIndex} />
        </ItemsAddedContainer>
      </WinnerPrizesContainer>
    </>
  );
}
