import React from 'react';

import URLS from '../config/constants/URLS';
import { TTransactionsToFrontend } from '../interfaces/ITransaction';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';
import useRequireLogin from './useRequireLogin';

export interface IGetUserTransactionsPayload {
  forward: boolean;
  startAfterDocTimestamp?: number;
}

export default function useGetUserTransactions() {
  const requireLoginFn = useRequireLogin();

  const handleGetUserTransactions = async ({ forward, startAfterDocTimestamp }: IGetUserTransactionsPayload) => {
    if (!requireLoginFn()) return;

    const res = await TrixelsAxiosServiceInstance.request<TTransactionsToFrontend>({
      requestConfig: {
        url: URLS.ENDPOINTS.USER.GET_USER_TRANSACTIONS,
        method: 'post',
        data: { forward, startAfterDocTimestamp },
      },
    });

    return res;
  };

  return handleGetUserTransactions;
}
