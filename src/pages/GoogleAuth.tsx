import React, { useEffect } from 'react';

import { IGoogleAuthResponse } from '../components/Modals/AuthModal/LoginForm';
import { Body } from '../styles/GlobalStyles';

const GoogleAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
      const googleAuthResponse: IGoogleAuthResponse = JSON.parse(decodeURIComponent(data));
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
