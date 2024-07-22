import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import URLS from '../config/constants/URLS';
import { IReduxStore } from '../interfaces/IRedux';
import { IAuthResponse } from '../redux/features/authSlice';
import AuthService from '../services/AuthService';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

const useRegister = () => {
  const reduxDispatch = useDispatch();
  const auth = useSelector<IReduxStore, IReduxStore['auth']>((state) => state.auth);

  const handleEnterButtonClick = async (payload: { username: string; password: string }) => {
    if (auth.userCredentials) {
      toast.error("You're already logged.");
      return;
    }

    const response = await TrixelsAxiosServiceInstance.request<IAuthResponse>({
      requestConfig: { url: URLS.ENDPOINTS.AUTH.REGISTER, method: 'post', data: { ...payload } },
      showSuccessErrorToast: [true, true],
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
