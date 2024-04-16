import React, { useState } from 'react';
import { styled } from 'styled-components';

import useGetAvailableItems from '../../../../hooks/useGetAvailableItems';
import { IRaffleCreationPayload } from '../../../../interfaces/IRaffleCreation';
import FakeItemBox from './FakeItemBox';
import ItemBox from './ItemBox';
import RaffleItemsSelectionModal from './RaffleItemsSelectionModal';

const PrizesSelectionContainer = styled.div`
  gap: 1rem;
`;
const WinnerPrizesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemsAddedContainer = styled.div`
  display: flex;
  overflow: scroll;
  gap: 1rem;
`;

interface ISelectedPrizesElementProps {
  raffleConfig: IRaffleCreationPayload;
  setRaffleConfig: React.Dispatch<React.SetStateAction<IRaffleCreationPayload>>;
}

export default function SelectedPrizesElement({ raffleConfig, setRaffleConfig }: ISelectedPrizesElementProps) {
  const { prizes } = raffleConfig;
  const { availableItems } = useGetAvailableItems();

  const [showModal, setShowModal] = useState(false);
  const [winnerSelected, setWinnerSelected] = useState('winner1');

  const handleAddItemButton = () => {
    setWinnerSelected('winner1');
    setShowModal(true);
  };

  const handleItemClick = (itemIdToAdd: string, action: 'add' | 'remove') => {
    setRaffleConfig((prevConfig) => {
      const currentWinnerXPrizes = prevConfig.prizes[winnerSelected]?.info || {};
      const updatedWinnerXPrizes = { ...currentWinnerXPrizes };

      if (action === 'add') {
        const existingPrizeX = updatedWinnerXPrizes[itemIdToAdd];

        if (existingPrizeX) {
          existingPrizeX.quantity += 1;
        } else {
          updatedWinnerXPrizes[itemIdToAdd] = { prizeId: itemIdToAdd, quantity: 1 };
        }
      } else if (action === 'remove') {
        const existingPrizeX = updatedWinnerXPrizes[itemIdToAdd];

        if (existingPrizeX) {
          existingPrizeX.quantity -= 1;

          if (existingPrizeX.quantity === 0) {
            delete updatedWinnerXPrizes[itemIdToAdd];
          }
        }
      }

      return {
        ...prevConfig,
        prizes: {
          ...prevConfig.prizes,
          [winnerSelected]: { info: updatedWinnerXPrizes },
        },
      };
    });
  };

  const renderItemsSelected = () => {
    const prizesKeys = Object.keys(prizes);
    if (prizesKeys.length <= 0) {
      return (
        <WinnerPrizesContainer>
          <h3>Winner 1</h3>

          <ItemsAddedContainer>
            <FakeItemBox handleItemClick={handleAddItemButton} />
          </ItemsAddedContainer>
        </WinnerPrizesContainer>
      );
    }

    return prizesKeys.map((winnerX, prizesIndex) => {
      return (
        <WinnerPrizesContainer key={prizesIndex}>
          <h3>{winnerX}</h3>

          <ItemsAddedContainer>
            {availableItems &&
              /* [prize1, prize2, prize3] */
              Object.keys(prizes[winnerX]['info']).map((prizeX, i) => {
                return (
                  <div key={i}>
                    <ItemBox
                      itemInfos={availableItems[prizes[winnerX]['info'][prizeX].prizeId]}
                      quantity={prizes[winnerX]['info'][prizeX].quantity}
                      handleItemClick={handleItemClick}
                    />
                  </div>
                );
              })}

            <FakeItemBox handleItemClick={handleAddItemButton} />
          </ItemsAddedContainer>
        </WinnerPrizesContainer>
      );
    });
  };

  return (
    <PrizesSelectionContainer>
      {renderItemsSelected()}

      <RaffleItemsSelectionModal
        availableItems={availableItems}
        showModal={showModal}
        setShowModal={setShowModal}
        winnerSelectedPrizes={prizes[winnerSelected]}
        winnerNumber={0}
        handleItemClick={handleItemClick}
      />
    </PrizesSelectionContainer>
  );
}
