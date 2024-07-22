import React, { useEffect } from 'react';

import { IGoogleAuthResponse } from '../components/Modals/AuthModal/LoginForm';
import URLS from '../config/constants/URLS';
import { Body } from '../styles/GlobalStyles';

const GoogleAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
      const googleAuthResponse: IGoogleAuthResponse = JSON.parse(decodeURIComponent(data));

      window.opener.postMessage(googleAuthResponse, URLS.MAIN_URLS.CLIENT_FULL_URL);
      window.close();
    } else {
      window.opener.postMessage(null, URLS.MAIN_URLS.CLIENT_FULL_URL);
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
