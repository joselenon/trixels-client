import React from 'react';

import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export interface IGetDepositWalletResponse {
  walletAddress: string;
  minimumDeposit: number;
}

export default function useGetDepositMethodWallet() {
  const handleGetDepositMethodWallet = async (payload: { symbol: string; network: string }) => {
    const res = await MyAxiosServiceInstance.request<IGetDepositWalletResponse>({
      endpoint: URLS.ENDPOINTS.DEPOSIT.GET_DEPOSIT_WALLET,
      method: 'post',
      data: payload,
    });

    return res;
  };

  return handleGetDepositMethodWallet;
}
