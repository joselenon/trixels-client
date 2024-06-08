import React, { useState } from 'react';
import { styled } from 'styled-components';

import { PIXELIcon } from './CurrenciesIcons';

const BerryIconAndAmountContainer = styled.div<{ $theme: ICurrencyIconAndAmountProps['theme'] }>`
  background-color: ${({ $theme }) => {
    if ($theme === 'default') return 'var(--default-lightgrey)';
    if ($theme === 'transparent') return 'none';
  }};
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

export const BalanceText = styled.span<{
  $fontSize: string;
  $theme: ICurrencyIconAndAmountProps['theme'];
}>`
  font-size: ${({ $fontSize }) => {
    if ($fontSize === 'small') return '12px';
    if ($fontSize === 'medium') return '16px';
    if ($fontSize === 'big') return '24px';
    return '16px';
  }};
  color: ${({ $theme }) => {
    if ($theme === 'default') return 'black';
    if ($theme === 'transparent') return 'black';
  }};
  font-weight: 800;
`;

const ExactBalanceTextContainer = styled.div<{ $isHovered: boolean; $theme: ICurrencyIconAndAmountProps['theme'] }>`
  z-index: 2;
  position: absolute;
  background-color: ${({ $theme }) => {
    if ($theme === 'default') return 'var(--default-lightgrey)';
    return 'var(--default-lightgrey)';
  }};
  transition: opacity 0.2s ease;
  opacity: ${({ $isHovered }) => ($isHovered ? '1' : '0')};
  padding: 5px;
`;

interface ICurrencyIconAndAmountProps {
  amount: number;
  currency?: 'PIXEL';
  theme?: 'default' | 'transparent';
  fontSize?: 'small' | 'medium' | 'big';
}

export default function CurrencyIconAndAmount({
  currency = 'PIXEL',
  amount,
  theme = 'default',
  fontSize = 'medium',
}: ICurrencyIconAndAmountProps) {
  if (typeof amount !== 'number') return null;

  const [isHovered, setIsHovered] = useState(false);

  const toFixed2Amount = amount.toFixed(2);
  const toFixed8Amount = amount.toFixed(8);

  return (
    <BerryIconAndAmountContainer
      $theme={theme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currency === 'PIXEL' && PIXELIcon}
      <BalanceText $theme={theme} $fontSize={fontSize}>
        {toFixed2Amount}
      </BalanceText>

      <ExactBalanceTextContainer $theme={theme} $isHovered={isHovered}>
        <BerryIconAndAmountContainer $theme={theme}>
          {currency === 'PIXEL' && PIXELIcon}
          <BalanceText $theme={theme} $fontSize={fontSize}>
            {toFixed8Amount}
          </BalanceText>
        </BerryIconAndAmountContainer>
      </ExactBalanceTextContainer>
    </BerryIconAndAmountContainer>
  );
}
