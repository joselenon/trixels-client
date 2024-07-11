import React from 'react';
import { styled } from 'styled-components';

import CurrencyIconAndAmount from '../../../CurrencyIconAndAmount';

const PulsingPrizeBox = styled.div`
  background-color: #ffffff;
  width: 100%;
  animation: pulse 2s infinite alternate;

  @keyframes pulse {
    from {
      border: 2px solid var(--default-green);
    }
    to {
      border: 2px solid var(--default-lightgrey);
    }
  }
`;

export default function RaffleTotalPrize({ prizesTotalValue }: { prizesTotalValue: number }) {
  return (
    <PulsingPrizeBox>
      <CurrencyIconAndAmount theme="transparent" amount={prizesTotalValue} />
    </PulsingPrizeBox>
  );
}
