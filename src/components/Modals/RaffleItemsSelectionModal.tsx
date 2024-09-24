import React from 'react';
import styled from 'styled-components';

import { IItemsInfoResponse, useAvailableItemsContext } from '../../contexts/ItemsAvailableContext';
import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';
import { IRaffleCreationPayload, TRaffleCreationWinnerPrize } from '../../interfaces/IRaffleCreation';
import { RaffleCreationManager } from '../../pages/RaffleCreation/RaffleCreationManager';
import { GetWinnerItems } from '../../utils/RaffleCalcs';
import ItemBox from '../../pages/RaffleCreation/ItemBox/ItemBox';
import Modal from '../Modal';

const RaffleItemsSelectionModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 600px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

interface IRaffleItemsSelectionModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  winnerSelectedPrize?: TRaffleCreationWinnerPrize;
}

export default function RaffleItemsSelectionModal({
  showModal,
  setShowModal,
  winnerSelectedPrize,
}: IRaffleItemsSelectionModalProps) {
  const availableItems = useAvailableItemsContext();

  const calculateTotalValue = () => {
    if (availableItems && winnerSelectedPrize) {
      const { winnerPrizeObj } = GetWinnerItems(winnerSelectedPrize['items'], availableItems);
      return winnerPrizeObj.totalValue.toFixed(2);
    }

    return 0;
  };

  const renderItemsElements = () => {
    if (availableItems) {
      const itemsElements = Object.keys(availableItems).map((itemId, i) => {
        const findItem = winnerSelectedPrize && winnerSelectedPrize['items'].find((item) => item.itemId === itemId);

        const itemQuantity = findItem ? findItem.quantity : 0;

        return (
          <div key={i}>
            <ItemBox winnerIndex={0} item={{ itemId, quantity: itemQuantity }} />
          </div>
        );
      });

      return itemsElements;
    }
  };

  return (
    <Modal
      contentBackground="var(--default-brown)"
      title={`Item Selection - ${calculateTotalValue()} `}
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <RaffleItemsSelectionModalContainer>
        <ItemsContainer>{renderItemsElements()}</ItemsContainer>
      </RaffleItemsSelectionModalContainer>
    </Modal>
  );
}
