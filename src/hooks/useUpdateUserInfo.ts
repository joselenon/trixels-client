import React from 'react';

import { IUpdateUserCredentialsPayload } from '../pages/UserProfile';
import { MyAxiosService, TMyAxiosServiceResponse } from '../services/MyAxiosService';

export default function useUpdateUserInfo() {
  const postUpdateUserInfo = async (
    payload: IUpdateUserCredentialsPayload,
  ): TMyAxiosServiceResponse<null> => {
    const response = await MyAxiosService<null>({
      method: 'put',
      endpoint: '/user/update',
      data: payload,
    });

    return response;
  };

  return postUpdateUserInfo;
}
