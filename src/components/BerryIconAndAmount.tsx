import React from 'react';
import { styled } from 'styled-components';

import { BERRYIcon } from './CurrenciesIcons';

const BerryIconAndAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  h4 {
  }
`;

interface IBerryIconAndAmountProps {
  amount: number;
}

export default function BerryIconAndAmount({ amount }: IBerryIconAndAmountProps) {
  return (
    <BerryIconAndAmountContainer>
      {BERRYIcon}
      <h4>{amount}</h4>
    </BerryIconAndAmountContainer>
  );
}
