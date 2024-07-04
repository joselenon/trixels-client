import React from 'react';
import { styled } from 'styled-components';

import { PIXELIcon } from './CurrenciesIcons';

interface ICurrencyIconAndAmountProps {
  amount: number;
  currency?: 'PIXEL';
  theme: 'default' | 'transparent';
  fontSize?: 'small' | 'medium' | 'big';
}

const BerryIconAndAmountContainer = styled.div<{ $theme: ICurrencyIconAndAmountProps['theme'] }>`
  background-color: ${({ $theme }) => {
    if ($theme === 'default') return 'var(--default-lightgrey)';
    if ($theme === 'transparent') return 'none';
  }};
  height: 100%;
  position: relative;
  padding: 5px 15px;
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
  $fontSize: 'small' | 'medium' | 'big';
  $theme: ICurrencyIconAndAmountProps['theme'];
}>`
  font-size: ${({ $fontSize }) => {
    if ($fontSize === 'small') return '12px !important';
    if ($fontSize === 'medium') return '16px !important';
    if ($fontSize === 'big') return '24px !important';
    return '16px';
  }};
  color: ${({ $theme }) => {
    if ($theme === 'default') return 'var(--default-black)';
    if ($theme === 'transparent') return 'var(--default-black)';
  }};
  font-weight: 800;
`;

export default function CurrencyIconAndAmount({
  currency = 'PIXEL',
  amount,
  theme = 'default',
  fontSize = 'medium',
}: ICurrencyIconAndAmountProps) {
  if (typeof amount !== 'number') return null;

  const toFixed2Amount = amount.toFixed(2);

  return (
    <BerryIconAndAmountContainer $theme={theme}>
      {currency === 'PIXEL' && PIXELIcon}
      <BalanceText $theme={theme} $fontSize={fontSize}>
        {toFixed2Amount}
      </BalanceText>
    </BerryIconAndAmountContainer>
  );
}
