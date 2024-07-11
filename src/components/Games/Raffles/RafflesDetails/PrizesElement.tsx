import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import React from 'react';
import { styled } from 'styled-components';

import { TRaffleWinnersPrizes } from '../../../../interfaces/IRaffles';
import CurrencyIconAndAmount from '../../../CurrencyIconAndAmount';
import WinnerXPrizesElement from '../WinnerXPrizesElement';

const WinnersPrizesElementContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  user-select: none;
  overflow: hidden;
`;

const WinnerPrizes = styled.div`
  width: 120px;
  background: #fff;
  padding: 15px;
  transition: all 0.05s;
  &:hover {
    box-shadow: inset 0px 0px 0px 5px var(--default-grey);
  }
`;

const PrizeAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const PrizesContainer = styled.div`
  width: 100%;
  display: flex;
`;

interface IPrizesElementProps {
  prizes: TRaffleWinnersPrizes;
}

export default function Prizes({ prizes }: IPrizesElementProps) {
  const winnersKeys = Object.keys(prizes);

  const renderWinnerPrizesElement = () => {
    return winnersKeys.map((winnerKey) => {
      const winnerPrizes = prizes[winnerKey];

      return (
        <WinnerPrizes key={winnerKey}>
          <div style={{ textAlign: 'center', marginBottom: 15 }}>
            <h5>{winnerKey}</h5>
          </div>

          <WinnerXPrizesElement winnerXPrizes={winnerPrizes} />

          <PrizeAmountContainer>
            <CurrencyIconAndAmount theme="default" fontSize="small" amount={winnerPrizes.totalValue} />
          </PrizeAmountContainer>
        </WinnerPrizes>
      );
    });
  };

  return (
    <WinnersPrizesElementContainer>
      <PrizesContainer>{renderWinnerPrizesElement()}</PrizesContainer>
    </WinnersPrizesElementContainer>
  );
}
