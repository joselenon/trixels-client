import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import URLS from '../config/constants/URLS';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';
import useGetUserCredentials from './useGetUserCredentials';

export interface IWalletVerificationInRedis {
  createdAt: number;
  userId: string;
  roninWallet: string;
  randomValue: number;
  expiresAt: number;
}

export default function useWalletVerification() {
  const { userCredentials } = useGetUserCredentials();

  const handleVerifyWallet = async (request: string) => {
    if (userCredentials) {
      if (!userCredentials?.roninWallet.value) {
        toast.error('You should add a wallet first');
        return;
      }

      const res = await TrixelsAxiosServiceInstance.request<IWalletVerificationInRedis>({
        requestConfig: { url: URLS.ENDPOINTS.USER.VERIFY_WALLET, method: 'post', data: { request } },
        showToastMessage: true,
      });

      return res;
    }
  };

  return { handleVerifyWallet };
}
