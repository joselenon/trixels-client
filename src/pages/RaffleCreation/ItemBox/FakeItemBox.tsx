import React, { useState } from 'react';
import { styled } from 'styled-components';

import RaffleItemsSelectionModal from '../../../components/Modals/RaffleItemsSelectionModal';
import TrixelsButton from '../../../components/TrixelsButton';
import { useRaffleCreationContext } from '../../../contexts/RaffleCreationContext';

const ItemContainer = styled.div`
  position: relative; // Adicionando posição relativa para posicionamento absoluto dentro deste container
  background-color: var(--secondary-bg-color);
  min-width: 200px;
  max-width: 200px;
  min-height: 220px;
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

interface IItemBoxProps {
  winnerIndex: number;
}

export default function FakeItemBox({ winnerIndex }: IItemBoxProps) {
  const { raffleConfig } = useRaffleCreationContext();

  const [showModal, setShowModal] = useState(false);

  const winnerSelectedPrize = raffleConfig.prizes[winnerIndex];

  return (
    <ItemContainer>
      <TrixelsButton label="Add Items" btnType="CTA" attributes={{ onClick: () => setShowModal(true) }} />

      <RaffleItemsSelectionModal
        showModal={showModal}
        setShowModal={setShowModal}
        winnerSelectedPrize={winnerSelectedPrize}
      />
    </ItemContainer>
  );
}
