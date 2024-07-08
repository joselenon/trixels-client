import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import URLS from '../config/constants/URLS';
import { IAuthResponse } from '../interfaces/IAuth';
import { IReduxStore } from '../interfaces/IRedux';
import AuthService from '../services/AuthService';
import MyAxiosServiceInstance from '../services/MyAxiosService';

const useRegister = () => {
  const reduxDispatch = useDispatch();
  const auth = useSelector<IReduxStore, IReduxStore['auth']>((state) => state.auth);

  const handleEnterButtonClick = async (payload: { username: string; password: string }) => {
    if (auth.userCredentials) {
      toast.error("You're already logged.");
      return;
    }

    const response = await MyAxiosServiceInstance.request<IAuthResponse>({
      requestConfig: { url: URLS.ENDPOINTS.AUTH.REGISTER, method: 'post', data: { ...payload } },
      showToastMessage: true,
    });

    if (response && response.data) {
      AuthService.applyUserCredentials(reduxDispatch, response.data);
    } else {
      toast.error('Something went wrong.');
    }
  };

  return handleEnterButtonClick;
};

export default useRegister;
