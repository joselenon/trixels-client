import React, { memo, useState } from 'react';
import { styled } from 'styled-components';

import useBuyTickets from '../../../../hooks/useBuyTickets';
import { IBuyRaffleTicketsPayload } from '../../../../interfaces/IBet';
import TrixelsButton from '../../../TrixelsButton';

const BuyButtonContainer = styled.div`
  display: flex;
`;

interface IBuyButtonProps {
  buyRaffleTicketsPayload: IBuyRaffleTicketsPayload;
  selectedTickets: number[];
  setSelectedTickets: React.Dispatch<React.SetStateAction<number[]>>;
  ticketPrice: number;
}

function BuyRaffleTicketButton({
  buyRaffleTicketsPayload,
  selectedTickets,
  setSelectedTickets,
  ticketPrice,
}: IBuyButtonProps) {
  const buyTicketsFn = useBuyTickets();

  const [isBuyRaffleButtonPending, setIsBuyRaffleButtonPending] = useState(false);

  const handleBuyTickets = async (buyRaffleTicketsPayload: IBuyRaffleTicketsPayload) => {
    setIsBuyRaffleButtonPending(true);

    try {
      const res = await buyTicketsFn(buyRaffleTicketsPayload);

      if (res) {
        res.success && setSelectedTickets([]);
      }
    } catch (err) {
      console.log('err');
    } finally {
      setSelectedTickets([]);
      setIsBuyRaffleButtonPending(false);
    }
  };

  const selectedTicketsTotalPrice = selectedTickets.length * ticketPrice;

  return (
    <BuyButtonContainer>
      <TrixelsButton
        width="auto"
        btnType="CTA"
        label={`Buy (${selectedTicketsTotalPrice.toFixed(8)})`}
        attributes={{ onClick: async () => await handleBuyTickets(buyRaffleTicketsPayload) }}
        isPending={isBuyRaffleButtonPending}
      />
    </BuyButtonContainer>
  );
}

export default memo(BuyRaffleTicketButton);
