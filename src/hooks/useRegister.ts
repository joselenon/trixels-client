import React from 'react';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { JWTCookie } from '../config/app/CookiesConfig';
import { IReduxStore } from '../interfaces/IRedux';
import { IAuthResponse, setToken } from '../redux/features/authSlice';
import MyAxiosServiceInstance from '../services/MyAxiosService';

const useRegister = () => {
  const CookiesInstance = new Cookies();
  const reduxDispatch = useDispatch();
  const auth = useSelector<IReduxStore, IReduxStore['auth']>((state) => state.auth);

  const finishEnteringProcess = (authResponse: IAuthResponse) => {
    const { token } = authResponse;

    CookiesInstance.set(JWTCookie.key, token, JWTCookie.config);
    reduxDispatch(setToken(authResponse));
    /*     setShowModal && setShowModal(false); */

    /* ARRUMAR ISSO (COLOCADO PARA QUE O BALANCE ATUALIZE) */
    window.location.reload();
  };

  const handleEnterButtonClick = async (payload: { username: string; password: string }) => {
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

      if (response && response.data) {
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
