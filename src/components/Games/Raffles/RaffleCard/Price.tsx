import React from 'react';
import styled from 'styled-components';

import CurrencyIconAndAmount from '../../../CurrencyIconAndAmount';

const PriceAndBuyContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface IPriceAndBuyProps {
  ticketPrice: number;
}

export default function PriceAndBuy({ ticketPrice }: IPriceAndBuyProps) {
  return (
    <PriceAndBuyContainer>
      <PriceContainer>
        <h5>Price /ea</h5>
        <div>
          <CurrencyIconAndAmount theme="default" amount={ticketPrice} />
        </div>
      </PriceContainer>
    </PriceAndBuyContainer>
  );
}
