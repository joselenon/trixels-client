import React from 'react';
import { styled } from 'styled-components';

import { PIXELIcon } from './CurrenciesIcons';

interface IValueInPIXELProps {
  amount: number;
  currency?: 'PIXEL';
  fontColor: 'white' | 'black';
  fontSize?: 'small' | 'medium' | 'big';
}

const BerryIconAndAmountContainer = styled.div`
  height: var(--default-boxheight);
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
  $fontColor: IValueInPIXELProps['fontColor'];
}>`
  font-size: ${({ $fontSize }) => {
    if ($fontSize === 'small') return '12px !important';
    if ($fontSize === 'medium') return '16px !important';
    if ($fontSize === 'big') return '24px !important';
    return '16px !important';
  }};
  color: ${({ $fontColor }) => `${$fontColor}`} !important;
  font-weight: 800;
`;

export default function ValueInPIXEL({
  currency = 'PIXEL',
  amount,
  fontColor = 'white',
  fontSize = 'medium',
}: IValueInPIXELProps) {
  if (typeof amount !== 'number') return null;

  const toFixed2Amount = amount.toFixed(2);

  return (
    <BerryIconAndAmountContainer>
      {currency === 'PIXEL' && PIXELIcon}
      <BalanceText $fontColor={fontColor} $fontSize={fontSize}>
        {toFixed2Amount}
      </BalanceText>
    </BerryIconAndAmountContainer>
  );
}
