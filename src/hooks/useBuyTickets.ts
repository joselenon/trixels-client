import React from 'react';

import URLS from '../config/constants/URLS';
import { IBuyRaffleTicketsPayload } from '../interfaces/IBet';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export default function useBuyTickets() {
  const handleBuyTickets = async (payload: IBuyRaffleTicketsPayload) => {
    const res = await MyAxiosServiceInstance.request({
      requestConfig: { url: URLS.ENDPOINTS.RAFFLES.BUY_TICKETS, method: 'post', data: payload },
    });

    return res;
  };

  return handleBuyTickets;
}
