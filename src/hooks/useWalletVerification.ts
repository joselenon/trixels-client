import React from 'react';

import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export default function useWalletVerification() {
  const handleVerifyWallet = async () => {
    const res = await MyAxiosServiceInstance.request<{ randomValue: number }>({
      endpoint: URLS.ENDPOINTS.USER.VERIFY_WALLET,
      method: 'post',
      data: null,
    });

    return res;
  };

  /*   const handleCheck = async () => {
    const res = await MyAxiosServiceInstance.request<{ randomValue: number }>({
      endpoint: URLS.ENDPOINTS.USER.VERIFY_WALLET_CHECK,
      method: 'get',
      data: null,
    });

    return res;
  }; */

  return { handleVerifyWallet };
}
