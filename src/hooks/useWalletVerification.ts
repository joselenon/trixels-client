import React from 'react';
import { toast } from 'react-toastify';

import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';
import useGetUserCredentials from './useGetUserCredentials';

export default function useWalletVerification() {
  const { userCredentials } = useGetUserCredentials();

  const handleVerifyWallet = async () => {
    console.log(userCredentials);
    if (!userCredentials?.roninWallet.value) {
      toast.error('You should add a wallet first');
      return;
    }

    const res = await MyAxiosServiceInstance.request<{ randomValue: number }>({
      requestConfig: { url: URLS.ENDPOINTS.USER.VERIFY_WALLET, method: 'post', data: null },
      showToastMessage: true,
    });

    return res;
  };

  return { handleVerifyWallet };
}
