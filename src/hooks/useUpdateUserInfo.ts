import React from 'react';

import { IUpdateUserCredentialsPayload } from '../pages/UserProfile';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export default function useUpdateUserInfo() {
  const postUpdateUserInfo = async (payload: IUpdateUserCredentialsPayload) => {
    const response = await MyAxiosServiceInstance.request<null>({
      requestConfig: { method: 'put', url: '/user/credentials', data: payload },
    });

    return response;
  };

  return postUpdateUserInfo;
}
