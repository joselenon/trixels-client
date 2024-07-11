import React from 'react';
import { useDispatch } from 'react-redux';

import URLS from '../config/constants/URLS';
import { IUserToFrontEnd } from '../interfaces/IUser';
import { IUpdateUserCredentialsPayload } from '../pages/UserProfile';
import { setToken } from '../redux/features/authSlice';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

export default function useUpdateUserInfo() {
  const reduxDispatch = useDispatch();

  const postUpdateUserInfo = async (payload: IUpdateUserCredentialsPayload) => {
    const response = await TrixelsAxiosServiceInstance.request<IUserToFrontEnd>({
      requestConfig: { method: 'put', url: URLS.ENDPOINTS.USER.UPDATE_USER_CREDENTIALS, data: payload },
      showToastMessage: true,
    });

    if (response?.success && response.data) {
      reduxDispatch(setToken({ userCredentials: response.data }));
    }
  };

  return postUpdateUserInfo;
}
