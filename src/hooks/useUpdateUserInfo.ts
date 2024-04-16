import React from 'react';

import { IUpdateUserCredentialsPayload } from '../pages/UserProfile';
import MyAxiosServiceInstance, {
  TMyAxiosServiceResponse,
} from '../services/MyAxiosService';

export default function useUpdateUserInfo() {
  const postUpdateUserInfo = async (
    payload: IUpdateUserCredentialsPayload,
  ): TMyAxiosServiceResponse<null> => {
    const response = await MyAxiosServiceInstance.request<null>({
      method: 'put',
      endpoint: '/user/credentials',
      data: payload,
    });

    return response;
  };

  return postUpdateUserInfo;
}
