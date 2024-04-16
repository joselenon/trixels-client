import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { JWTCookie } from '../config/app/CookiesConfig';
import { useAuthModalContext } from '../contexts/AuthModalContext';
import { IReduxStore } from '../interfaces/IRedux';
import { IAuthResponse, setToken } from '../redux/features/authSlice';
import MyAxiosServiceInstance from '../services/MyAxiosService';

const useRegister = () => {
  const reduxDispatch = useDispatch();
  const { setShowModal } = useAuthModalContext();
  const auth = useSelector<IReduxStore, IReduxStore['auth']>((state) => state.auth);

  const finishEnteringProcess = (authResponse: IAuthResponse) => {
    const { token } = authResponse;

    Cookies.set(JWTCookie.key, token, JWTCookie.config);
    reduxDispatch(setToken(authResponse));
    setShowModal && setShowModal(false);

    /* ARRUMAR ISSO (COLOCADO PARA QUE O BALANCE ATUALIZE) */
    window.location.reload();
  };

  const handleEnterButtonClick = async (payload: {
    username: string;
    password: string;
  }) => {
    try {
      if (auth.userCredentials) {
        toast.error("You're already logged.");
        return;
      }

      const response = await MyAxiosServiceInstance.request<IAuthResponse>({
        endpoint: '/auth/register',
        method: 'post',
        data: { ...payload },
      });

      if (response?.success) {
        finishEnteringProcess(response.data);
      } else {
        toast.error('Something went wrong.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  return handleEnterButtonClick;
};

export default useRegister;
