import React, { useState } from 'react';
import { toast } from 'react-toastify';

import URLS from '../config/constants/URLS';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

export interface IGetDepositWalletResponse {
  walletAddress: string;
  minimumDeposit: number;
}

export default function useGetDepositMethodWallet() {
  const [isGettingWallet, setIsGettingWallet] = useState(false);
  const [depositMethodWalletInfo, setDepositMethodWalletInfo] = useState<
    { value: string; minimumDeposit: number } | undefined
  >(undefined);

  const handleGetDepositMethodWallet = async (payload: { symbol: string; network: string }) => {
    try {
      const res = await TrixelsAxiosServiceInstance.request<IGetDepositWalletResponse>({
        requestConfig: { url: URLS.ENDPOINTS.DEPOSIT.GET_DEPOSIT_WALLET, method: 'post', data: payload },
      });

      if (res) {
        setIsGettingWallet(false);
        switch (res.success) {
          case true:
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setDepositMethodWalletInfo({
              value: res.data!.walletAddress!,
              minimumDeposit: res.data!.minimumDeposit!,
            });
            break;
          case false:
            setDepositMethodWalletInfo(undefined);
            break;
        }
      }

      setIsGettingWallet(false);
    } catch (err) {
      setIsGettingWallet(false);
      toast.error('Something went wrong...');
    }
  };

  return { isGettingWallet, depositMethodWalletInfo, handleGetDepositMethodWallet };
}
