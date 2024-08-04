import React from 'react';
import { styled } from 'styled-components';

import CurrenciesInfo from '../../assets/CurrenciesInfo';

const BerryIconAndAmountContainer = styled.div<{ $theme: ICurrencyIconAndAmountProps['theme'] }>`
  height: var(--default-boxheight);
  background-color: ${({ $theme }) => {
    if ($theme === 'default') return 'var(--default-lightgrey)';
    if ($theme === 'white') return 'white';
    if ($theme === 'transparent') return 'none';
  }};
  width: 100%;
  position: relative;
  padding: 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--default-br) 0 0 var(--default-br);

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

interface ICurrencyIconAndAmountProps {
  amount: number;
  currency?: 'PIXEL';
  theme: 'default' | 'transparent' | 'white';
  fontSize?: 'small' | 'medium' | 'big';
  showFullAmount?: boolean;
}

export default function index({
  currency = 'PIXEL',
  amount,
  theme = 'default',
  fontSize = 'medium',
  showFullAmount = false,
}: ICurrencyIconAndAmountProps) {
  if (typeof amount !== 'number') return null;

  const filteredAmount = showFullAmount ? amount : amount.toFixed(2);

  return (
    <BerryIconAndAmountContainer $theme={theme}>
      {currency === 'PIXEL' && CurrenciesInfo.PIXEL.icon}
      <BalanceText $theme={theme} $fontSize={fontSize}>
        {filteredAmount}
      </BalanceText>
    </BerryIconAndAmountContainer>
  );
}
