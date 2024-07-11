import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxStore } from '../interfaces/IRedux';
import { IUserToFrontEnd } from '../interfaces/IUser';
import AuthService from '../services/AuthService';

export default function useLogout() {
  /*   const reduxDispatch = useDispatch(); */

  const userCredentials = useSelector<IReduxStore, IUserToFrontEnd | undefined>((state) => state.auth.userCredentials);

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

      if (!email?.googleSub) {
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
    AuthService.logout();
  };

  return { handleLogout, handleCarefulLogout, showLogoutWarnInfo };
}
