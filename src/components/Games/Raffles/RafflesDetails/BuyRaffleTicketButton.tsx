import React, { memo, useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';

import { RESPONSE_CONFIG } from '../../../../config/constants/RESPONSES';
import useBuyTickets from '../../../../hooks/useBuyTickets';
import useRequireLogin from '../../../../hooks/useRequireLogin';
import { IBuyRaffleTicketsPayload } from '../../../../interfaces/IBet';
import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import TrixelsButton from '../../../TrixelsButton';

const BuyButtonContainer = styled.div`
  display: flex;
`;

interface IBuyButtonProps {
  buyRaffleTicketsPayloadState: {
    buyRaffleTicketsPayload: IBuyRaffleTicketsPayload;
    setBuyRaffleTicketPayload: React.Dispatch<React.SetStateAction<IBuyRaffleTicketsPayload>>;
  };
  ticketPrice: number;
  raffle: IRaffleToFrontEndTreated;
}

function BuyRaffleTicketButton({ buyRaffleTicketsPayloadState, ticketPrice, raffle }: IBuyButtonProps) {
  const requireLoginFn = useRequireLogin();
  const buyTicketsFn = useBuyTickets();

  const { buyRaffleTicketsPayload, setBuyRaffleTicketPayload } = buyRaffleTicketsPayloadState;
  const selectedTickets = buyRaffleTicketsPayload.info.ticketNumbers;

  const [isBuyRaffleButtonPending, setIsBuyRaffleButtonPending] = useState(false);

  const handleBuyTickets = async (buyRaffleTicketsPayload: IBuyRaffleTicketsPayload) => {
    if (!requireLoginFn()) return;
    if (raffle.finishedAt) {
      toast.error(RESPONSE_CONFIG.ERROR.CLIENT_ERROR_MSGS.GAME_ALREADY_FINISHED);
      return;
    }
    const totalTicketsBought = raffle.info.bets.reduce((acc, bet) => {
      const { tickets } = bet.info;
      return acc + tickets.length;
    }, 0);
    if (totalTicketsBought >= raffle.info.totalTickets) {
      toast.error(RESPONSE_CONFIG.ERROR.CLIENT_ERROR_MSGS.QUANTITY_EXCEEDS_AVAILABLE_TICKETS);
      return;
    }
    if (!buyRaffleTicketsPayload.info.randomTicket && buyRaffleTicketsPayload.info.ticketNumbers.length <= 0) {
      return;
    }

    setIsBuyRaffleButtonPending(true);

    try {
      const res = await buyTicketsFn(buyRaffleTicketsPayload);

      if (res) {
        res.success &&
          setBuyRaffleTicketPayload((prev) => {
            return { ...prev, info: { ...prev.info, ticketNumbers: [], quantityOfTickets: 0 } };
          });
      }
    } catch (err) {
      console.log('err');
    } finally {
      setBuyRaffleTicketPayload((prev) => {
        return { ...prev, info: { ...prev.info, ticketNumbers: [], quantityOfTickets: 0 } };
      });
      setIsBuyRaffleButtonPending(false);
    }
  };

  const isRandomTicket = buyRaffleTicketsPayload.info.randomTicket;
  const selectedTicketsTotalPrice = isRandomTicket ? ticketPrice : selectedTickets.length * ticketPrice;

  return (
    <BuyButtonContainer>
      <TrixelsButton
        width="auto"
        btnType={(selectedTickets.length > 0 || isRandomTicket) && !raffle.finishedAt ? 'CTA' : 'DEFAULT'}
        label={`Buy (${selectedTicketsTotalPrice.toFixed(8)})`}
        attributes={{ onClick: async () => await handleBuyTickets(buyRaffleTicketsPayload) }}
        isPending={isBuyRaffleButtonPending}
      />
    </BuyButtonContainer>
  );
}

export default memo(BuyRaffleTicketButton);
