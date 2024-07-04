import React, { useEffect } from 'react';
import { Body } from '../styles/GlobalStyles';
import { IUserToFrontEnd } from '../interfaces/IUser';
import CookiesService from '../services/CookiesService';
import { JWTCookie } from '../config/app/CookiesConfig';
import { IGoogleAuthResponse } from '../components/Modals/AuthModal/LoginForm';

const GoogleAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
      const dataFiltered: { state: string; userCredentials: IUserToFrontEnd } = JSON.parse(decodeURIComponent(data));
      const token = CookiesService.get(JWTCookie.key);
      const googleAuthResponse: IGoogleAuthResponse = { ...dataFiltered, token };

      window.opener.postMessage(googleAuthResponse, 'http://localhost:3000');
      window.close();
    }
  }, []);

  return (
    <Body>
      <div>Processing authentication...</div>
    </Body>
  );
};

export default GoogleAuth;
