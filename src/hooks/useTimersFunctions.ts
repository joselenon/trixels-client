import React from 'react';

import { IUserResourceFrontEnd, IUserResourceResponse } from '../interfaces/IResources';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export default function useTimersFunctions() {
  const queryUserResources = async () => {
    const response = await MyAxiosServiceInstance.request<IUserResourceResponse>({
      method: 'get',
      endpoint: `/user/resources`,
      data: null,
    });

    if (response) {
      console.log(response.data[111]);
      return response.data;
    }
  };

  const addUserResource = async (payload: IUserResourceFrontEnd) => {
    const response = await MyAxiosServiceInstance.request<IUserResourceResponse>({
      method: 'post',
      endpoint: `/user/resources`,
      data: payload,
    });

    if (response) {
      return response.data;
    }
  };

  return { queryUserResources, addUserResource };
}
