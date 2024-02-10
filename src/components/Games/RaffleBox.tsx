import React from 'react';
import styled from 'styled-components';

import BerryIconAndAmount from '../BerryIconAndAmount';
import Button from '../Button';

const RaffleBoxContainer = styled.div`
  user-select: none;
  background: white;
  width: 320px;
  padding: var(--default-pdn);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    image-rendering: pixelated;
  }

  span {
    font-size: 10px;
    font-weight: 600;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #8e8e99;
  }
`;

const TicketsAndPriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;

  span {
    font-size: 10px;
    font-weight: 600;
  }

  h3 {
    color: var(--default-blue);
  }
`;

const TicketsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.25rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.25rem;
`;

const ViewAndBuyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
`;

const ViewContainer = styled.div`
  background: var(--primary-bg-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const BuyContainer = styled.div`
  max-width: 50px;
  display: flex;
  flex-direction: column;
`;

export default function RaffleBox() {
  return (
    <RaffleBoxContainer>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
        <img
          width={'80%'}
          src="https://d31ss916pli4td.cloudfront.net/uploadedAssets//929cf47b-9b7c-4c65-bda2-a6da7f015dbf.png"
          alt=""
        />
      </div>

      <DetailsContainer>
        <TitleContainer>
          <h3>Sauna Portal</h3>
          <span>Sauna Portal - UGC</span>
        </TitleContainer>

        <TicketsAndPriceContainer>
          <TicketsContainer>
            <span>Tickets Remaining</span>
            <h3>43/50</h3>
          </TicketsContainer>

          <PriceContainer>
            <span>Price /Ticket</span>
            <BerryIconAndAmount amount={10} />
          </PriceContainer>
        </TicketsAndPriceContainer>

        <ViewAndBuyContainer>
          <ViewContainer>
            <h4>View raffle</h4>
            <span>Ends in: 5 hrs 43 mins 31 s</span>
          </ViewContainer>

          <BuyContainer>
            <Button btnType="CTA" label={'Buy'} />
            <input type="number" defaultValue={1} />
          </BuyContainer>
        </ViewAndBuyContainer>
      </DetailsContainer>
    </RaffleBoxContainer>
  );
}
