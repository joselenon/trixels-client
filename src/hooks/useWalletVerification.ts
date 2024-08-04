import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import URLS from '../config/constants/URLS';
import { useAuthContext } from '../contexts/AuthContext';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

export interface IWalletVerificationInRedis {
  createdAt: number;
  userId: string;
  roninWallet: string;
  randomValue: number;
  expiresAt: number;
}

export default function useWalletVerification() {
  const { userCredentials } = useAuthContext();

  const handleVerifyWallet = async (request: string) => {
    if (userCredentials) {
      if (!userCredentials?.roninWallet.value) {
        toast.error('You should add a wallet first');
        return;
      }

      const res = await TrixelsAxiosServiceInstance.request<IWalletVerificationInRedis>({
        requestConfig: { url: URLS.ENDPOINTS.USER.VERIFY_WALLET, method: 'post', data: { request } },
        showSuccessErrorToast: [true, true],
      });

      return res;
    }
  };

  return { handleVerifyWallet };
}
