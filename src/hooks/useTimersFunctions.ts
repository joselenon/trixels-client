import React from 'react';

import { IUserResourceResponse } from '../interfaces/IUserResources';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export default function useTimersFunctions() {
  const queryUserResources = async () => {
    const response = await MyAxiosServiceInstance.request<IUserResourceResponse>({
      method: 'get',
      endpoint: `/user/resources`,
      data: null,
    });

    if (response) {
      return response.data;
    }
  };

  const addUserResource = async (payload) => {
    const response = await MyAxiosServiceInstance.request<IUserResourceResponse>({
      method: 'post',
      endpoint: `/user/resources`,
      data: null,
    });

    if (response) {
      return response.data;
    }
  };

  return { queryUserResources, addUserResource };
}
