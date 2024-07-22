import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { IGoogleAuthResponse } from '../components/Modals/AuthModal/LoginForm';
import URLS from '../config/constants/URLS';
import { Body } from '../styles/GlobalStyles';

const GoogleAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    console.log('data', data);
    if (data) {
      const googleAuthResponse: IGoogleAuthResponse = JSON.parse(decodeURIComponent(data));
      console.log('googleAuthResponse', googleAuthResponse);

      window.opener.postMessage(googleAuthResponse, URLS.MAIN_URLS.CLIENT_FULL_URL);
      window.close();
    } else {
      toast.error('Something went wrong');
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
