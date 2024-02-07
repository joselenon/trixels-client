import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';

import { JWTCookie } from '../config/app/CookiesConfig';
import { IUserToFrontEnd } from '../interfaces/IUser';
import { setToken } from '../redux/features/authSlice';
import MyAxiosServiceInstance from '../services/MyAxiosService';
import useLogout from './useLogout';

export default function useGetLoggedUserCredentials() {
  const reduxDispatch = useDispatch();
  const { handleLogout } = useLogout();

  const fetchLoggedUserCredentials = async () => {
    try {
      const tokenInCookies = Cookies.get(JWTCookie.key);

      if (!tokenInCookies) return;

      const authResponse = await MyAxiosServiceInstance.request<IUserToFrontEnd>({
        endpoint: '/user',
        method: 'get',
        data: tokenInCookies,
      });

      /* THIS MIGHT CAUSE SOME BUGS OF NOT LOGGING IN */
      if (!authResponse) {
        return handleLogout();
      }

      MyAxiosServiceInstance.setHeaders({ Authorization: tokenInCookies });

      reduxDispatch(
        setToken({ userCredentials: authResponse.data, token: tokenInCookies }),
      );

      return authResponse.data;
    } catch (err) {
      return handleLogout();
    }
  };

  return fetchLoggedUserCredentials;
}
