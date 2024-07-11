import React from 'react';

import URLS from '../config/constants/URLS';
import { IBuyRaffleTicketsPayload } from '../interfaces/IBet';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

export default function useBuyTickets() {
  const handleBuyTickets = async (payload: IBuyRaffleTicketsPayload) => {
    const res = await TrixelsAxiosServiceInstance.request({
      requestConfig: { url: URLS.ENDPOINTS.RAFFLES.BUY_TICKETS, method: 'post', data: payload },
    });

    return res;
  };

  return handleBuyTickets;
}
