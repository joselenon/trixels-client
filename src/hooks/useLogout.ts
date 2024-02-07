import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JWTCookie } from '../config/app/CookiesConfig';
import { IReduxStore } from '../interfaces/IRedux';
import { IUserToFrontEnd } from '../interfaces/IUser';
import { setToken } from '../redux/features/authSlice';

export default function useLogout() {
  const reduxDispatch = useDispatch();

  const userCredentials = useSelector<IReduxStore, IUserToFrontEnd | undefined>(
    (state) => state.auth.userCredentials,
  );

  const [showLogoutWarnInfo, setShowLogoutWarnInfo] = useState<{
    showWarn: boolean;
    warnAlreadyShowed: boolean;
  }>({
    showWarn: false,
    warnAlreadyShowed: false,
  });

  const handleCarefulLogout = () => {
    if (userCredentials) {
      const { email } = userCredentials;

      if (!email || !email.verified) {
        if (!showLogoutWarnInfo.warnAlreadyShowed) {
          return setShowLogoutWarnInfo({ showWarn: true, warnAlreadyShowed: true });
        } else {
          return handleLogout();
        }
      }

      return handleLogout();
    }
  };

  const handleLogout = () => {
    Cookies.remove(JWTCookie.key);
    reduxDispatch(setToken(undefined));

    return window.location.reload();
  };

  return { handleLogout, handleCarefulLogout, showLogoutWarnInfo };
}
