import React, { useState } from 'react';
import { styled } from 'styled-components';

import { PIXELIcon } from './CurrenciesIcons';

const BerryIconAndAmountContainer = styled.div`
  background-color: var(--primary-bg-color);
  position: relative;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  img {
    image-rendering: pixelated;
    width: 20px !important;
    height: 20px !important;
  }
`;

export const BalanceText = styled.span<{ $fontSize: ICurrencyIconAndAmountProps['fontSize'] }>`
  font-size: ${({ $fontSize }) => {
    if ($fontSize === 'small') return '12px';
    if ($fontSize === 'medium') return '16px';
    if ($fontSize === 'big') return '24px';
    return '16px';
  }};
  font-weight: 800;
`;

const ExactBalanceTextContainer = styled.div<{ $isHovered: boolean }>`
  top: 30px;
  right: 7px;
  z-index: 1;
  position: absolute;
  background-color: white;
  transition: opacity 0.2s ease; /* Adiciona uma transição suave para a opacidade */
  opacity: ${({ $isHovered }) => ($isHovered ? '1' : '0')}; /* Define a opacidade inicial */
  padding: 5px;
`;

interface ICurrencyIconAndAmountProps {
  amount: number;
  currency?: 'PIXEL';
  fontSize?: 'small' | 'medium' | 'big';
}

export default function CurrencyIconAndAmount({
  currency = 'PIXEL',
  amount,
  fontSize = 'medium',
}: ICurrencyIconAndAmountProps) {
  if (typeof amount !== 'number') return null;

  const [isHovered, setIsHovered] = useState(false);

  const toFixed2Amount = amount.toFixed(2);
  const toFixed8Amount = amount.toFixed(8);

  return (
    <BerryIconAndAmountContainer onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {currency === 'PIXEL' && PIXELIcon}
      <BalanceText $fontSize={fontSize}>{toFixed2Amount}</BalanceText>

      <ExactBalanceTextContainer $isHovered={isHovered}>
        <BerryIconAndAmountContainer>
          {currency === 'PIXEL' && PIXELIcon}
          <BalanceText $fontSize={fontSize}>{toFixed8Amount}</BalanceText>
        </BerryIconAndAmountContainer>
      </ExactBalanceTextContainer>
    </BerryIconAndAmountContainer>
  );
}
