import React from 'react';
import styled from 'styled-components';

import { IItemsInfoResponse } from '../../contexts/ItemsAvailableContext';
import { TRaffleCreationWinnerPrizes } from '../../interfaces/IRaffleCreation';
import { THandleItemClickFn } from '../../pages/RaffleCreation';
import RaffleCalcs from '../../utils/RaffleCalcs';
import ItemBox from '../Games/Raffles/RaffleCreation/ItemBox';
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
  availableItems: IItemsInfoResponse | undefined;
  winnerSelectedPrizes: TRaffleCreationWinnerPrizes;
  handleItemClick: THandleItemClickFn;
  winnerNumber: number;
}

export default function RaffleItemsSelectionModal(props: IRaffleItemsSelectionModalProps) {
  const { handleItemClick, setShowModal, availableItems, winnerSelectedPrizes, showModal } = props;

  const calculateTotalValue = () => {
    if (availableItems && winnerSelectedPrizes) {
      const { winnerXPrizeObj } = new RaffleCalcs(availableItems).getWinnerXPrize(winnerSelectedPrizes['info']);
      return winnerXPrizeObj.totalValue.toFixed(2);
    }

    return 0;
  };

  const renderItemsElements = () => {
    if (availableItems) {
      const itemsElements = Object.keys(availableItems).map((itemId, i) => {
        const itemQuantity =
          winnerSelectedPrizes && Object.keys(winnerSelectedPrizes['info']).includes(itemId)
            ? winnerSelectedPrizes['info'][itemId].quantity
            : 0;

        return (
          <div key={i}>
            <ItemBox handleItemClick={handleItemClick} itemInfos={availableItems[itemId]} quantity={itemQuantity} />
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
