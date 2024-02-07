import React from 'react';
import { styled } from 'styled-components';

import berryIcon from '../assets/currenciesIcons/cur_berry.png';

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
      <img width={16} src={berryIcon} alt="" />
      <h4>{amount}</h4>
    </BerryIconAndAmountContainer>
  );
}
