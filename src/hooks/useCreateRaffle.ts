import React from 'react';

import URLS from '../config/constants/URLS';
import { IRaffleCreationPayload } from '../interfaces/IRaffleCreation';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export default function useCreateRaffle() {
  const handleCreateRaffle = async (payload: IRaffleCreationPayload) => {
    const res = await MyAxiosServiceInstance.request<{ raffleId: string }>({
      requestConfig: { url: URLS.ENDPOINTS.RAFFLES.CREATE_RAFFLE, method: 'post', data: payload },
    });

    return res;
  };

  return handleCreateRaffle;
}
